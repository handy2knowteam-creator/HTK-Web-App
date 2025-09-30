import { useState, useEffect } from 'react'
import { CheckCircle, X, AlertTriangle, CreditCard, Zap } from 'lucide-react'

export default function PaymentTestSuite() {
  const [testResults, setTestResults] = useState({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState('')

  const tests = [
    {
      id: 'env_vars',
      name: 'Environment Variables',
      description: 'Check if all required Stripe environment variables are configured',
      test: testEnvironmentVariables
    },
    {
      id: 'stripe_key',
      name: 'Stripe Publishable Key',
      description: 'Verify Stripe publishable key is valid and accessible',
      test: testStripeKey
    },
    {
      id: 'netlify_functions',
      name: 'Netlify Functions',
      description: 'Test if Netlify functions are accessible',
      test: testNetlifyFunctions
    },
    {
      id: 'webhook_endpoint',
      name: 'Webhook Endpoint',
      description: 'Verify webhook endpoint is reachable',
      test: testWebhookEndpoint
    },
    {
      id: 'price_ids',
      name: 'Stripe Price IDs',
      description: 'Check if subscription Price IDs are configured',
      test: testPriceIds
    }
  ]

  async function testEnvironmentVariables() {
    const requiredVars = [
      'VITE_STRIPE_PUBLISHABLE_KEY',
      'VITE_STRIPE_BRONZE_PRICE_ID',
      'VITE_STRIPE_SILVER_PRICE_ID',
      'VITE_STRIPE_GOLD_PRICE_ID'
    ]

    const results = {}
    let allPresent = true

    requiredVars.forEach(varName => {
      const value = import.meta.env[varName]
      results[varName] = {
        present: !!value,
        value: value ? `${value.substring(0, 10)}...` : 'Not set'
      }
      if (!value) allPresent = false
    })

    return {
      success: allPresent,
      message: allPresent ? 'All environment variables configured' : 'Some environment variables missing',
      details: results
    }
  }

  async function testStripeKey() {
    try {
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      
      if (!publishableKey) {
        return {
          success: false,
          message: 'Stripe publishable key not found',
          details: 'VITE_STRIPE_PUBLISHABLE_KEY environment variable is not set'
        }
      }

      if (!publishableKey.startsWith('pk_')) {
        return {
          success: false,
          message: 'Invalid Stripe publishable key format',
          details: 'Publishable key should start with "pk_"'
        }
      }

      // Try to load Stripe
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(publishableKey)

      if (!stripe) {
        return {
          success: false,
          message: 'Failed to initialize Stripe',
          details: 'Stripe could not be loaded with the provided key'
        }
      }

      return {
        success: true,
        message: 'Stripe key is valid and loaded successfully',
        details: `Key: ${publishableKey.substring(0, 15)}...`
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error testing Stripe key',
        details: error.message
      }
    }
  }

  async function testNetlifyFunctions() {
    const functions = [
      '/.netlify/functions/stripe-webhook',
      '/.netlify/functions/create-subscription-checkout',
      '/.netlify/functions/create-credit-checkout'
    ]

    const results = {}
    let allAccessible = true

    for (const func of functions) {
      try {
        const response = await fetch(func, { method: 'GET' })
        results[func] = {
          accessible: response.status !== 404,
          status: response.status,
          statusText: response.statusText
        }
        if (response.status === 404) allAccessible = false
      } catch (error) {
        results[func] = {
          accessible: false,
          error: error.message
        }
        allAccessible = false
      }
    }

    return {
      success: allAccessible,
      message: allAccessible ? 'All Netlify functions accessible' : 'Some functions not accessible',
      details: results
    }
  }

  async function testWebhookEndpoint() {
    try {
      const webhookUrl = `${window.location.origin}/.netlify/functions/stripe-webhook`
      const response = await fetch(webhookUrl, { method: 'GET' })
      
      return {
        success: response.status !== 404,
        message: response.status !== 404 ? 'Webhook endpoint is accessible' : 'Webhook endpoint not found',
        details: {
          url: webhookUrl,
          status: response.status,
          statusText: response.statusText
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error testing webhook endpoint',
        details: error.message
      }
    }
  }

  async function testPriceIds() {
    const priceIds = {
      bronze: import.meta.env.VITE_STRIPE_BRONZE_PRICE_ID,
      silver: import.meta.env.VITE_STRIPE_SILVER_PRICE_ID,
      gold: import.meta.env.VITE_STRIPE_GOLD_PRICE_ID
    }

    const results = {}
    let allConfigured = true

    Object.entries(priceIds).forEach(([tier, priceId]) => {
      const isValid = priceId && priceId.startsWith('price_')
      results[tier] = {
        configured: !!priceId,
        valid: isValid,
        value: priceId ? `${priceId.substring(0, 15)}...` : 'Not set'
      }
      if (!isValid) allConfigured = false
    })

    return {
      success: allConfigured,
      message: allConfigured ? 'All Price IDs configured correctly' : 'Some Price IDs missing or invalid',
      details: results
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults({})

    for (const test of tests) {
      setCurrentTest(test.name)
      
      try {
        const result = await test.test()
        setTestResults(prev => ({
          ...prev,
          [test.id]: result
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          [test.id]: {
            success: false,
            message: 'Test failed with error',
            details: error.message
          }
        }))
      }

      // Small delay between tests for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setCurrentTest('')
    setIsRunning(false)
  }

  const runSingleTest = async (test) => {
    setCurrentTest(test.name)
    
    try {
      const result = await test.test()
      setTestResults(prev => ({
        ...prev,
        [test.id]: result
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [test.id]: {
          success: false,
          message: 'Test failed with error',
          details: error.message
        }
      }))
    }

    setCurrentTest('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#B9975B',
            marginBottom: '1rem'
          }}>
            HTK Payment System Test Suite
          </h1>
          <p style={{ color: '#cccccc', fontSize: '1.125rem' }}>
            Verify your Stripe integration is properly configured
          </p>
        </div>

        {/* Test Controls */}
        <div style={{
          backgroundColor: '#111111',
          border: '2px solid #B9975B',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <button
            onClick={runAllTests}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              backgroundColor: '#B9975B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.6 : 1,
              marginRight: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isRunning ? `Running: ${currentTest}...` : 'Run All Tests'}
          </button>

          {Object.keys(testResults).length > 0 && (
            <button
              onClick={() => setTestResults({})}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '2px solid #666666',
                borderRadius: '8px',
                color: '#cccccc',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Clear Results
            </button>
          )}
        </div>

        {/* Test Results Summary */}
        {Object.keys(testResults).length > 0 && (
          <div style={{
            backgroundColor: '#111111',
            border: '2px solid #B9975B',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Test Results Summary
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  {Object.values(testResults).filter(r => r.success).length}
                </div>
                <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                  Tests Passed
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#ef4444',
                  marginBottom: '0.5rem'
                }}>
                  {Object.values(testResults).filter(r => !r.success).length}
                </div>
                <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                  Tests Failed
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#B9975B',
                  marginBottom: '0.5rem'
                }}>
                  {Object.keys(testResults).length}
                </div>
                <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                  Total Tests
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Individual Tests */}
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {tests.map((test) => {
            const result = testResults[test.id]
            const isRunning = currentTest === test.name

            return (
              <div
                key={test.id}
                style={{
                  backgroundColor: '#111111',
                  border: `2px solid ${result ? (result.success ? '#22c55e' : '#ef4444') : '#333333'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: result ? (result.success ? '#22c55e' : '#ef4444') : '#333333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isRunning ? (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #ffffff',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                      ) : result ? (
                        result.success ? <CheckCircle size={20} color="#ffffff" /> : <X size={20} color="#ffffff" />
                      ) : (
                        <AlertTriangle size={20} color="#ffffff" />
                      )}
                    </div>
                    
                    <div>
                      <h3 style={{
                        color: '#B9975B',
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        margin: 0
                      }}>
                        {test.name}
                      </h3>
                      <p style={{
                        color: '#cccccc',
                        fontSize: '0.875rem',
                        margin: 0
                      }}>
                        {test.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => runSingleTest(test)}
                    disabled={isRunning}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '2px solid #B9975B',
                      borderRadius: '6px',
                      color: '#B9975B',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      cursor: isRunning ? 'not-allowed' : 'pointer',
                      opacity: isRunning ? 0.6 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isRunning ? 'Running...' : 'Test'}
                  </button>
                </div>

                {result && (
                  <div style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{
                      color: result.success ? '#22c55e' : '#ef4444',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}>
                      {result.message}
                    </div>
                    
                    {result.details && (
                      <div style={{
                        color: '#cccccc',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {typeof result.details === 'string' 
                          ? result.details 
                          : JSON.stringify(result.details, null, 2)
                        }
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Test Card Examples */}
        <div style={{
          backgroundColor: '#111111',
          border: '2px solid #B9975B',
          borderRadius: '15px',
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Stripe Test Cards
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <CreditCard size={16} color="#22c55e" />
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Success</span>
              </div>
              <div style={{ color: '#ffffff', fontFamily: 'monospace' }}>
                4242 4242 4242 4242
              </div>
              <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                Any future date, any CVC
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <X size={16} color="#ef4444" />
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Declined</span>
              </div>
              <div style={{ color: '#ffffff', fontFamily: 'monospace' }}>
                4000 0000 0000 0002
              </div>
              <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                Any future date, any CVC
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Zap size={16} color="#f59e0b" />
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>3D Secure</span>
              </div>
              <div style={{ color: '#ffffff', fontFamily: 'monospace' }}>
                4000 0025 0000 3155
              </div>
              <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                Requires authentication
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
