import { useState, useEffect } from 'react'
import { CheckCircle, X, AlertTriangle, Loader, ExternalLink } from 'lucide-react'

export default function PlatformHealthCheck() {
  const [healthStatus, setHealthStatus] = useState({})
  const [isRunning, setIsRunning] = useState(false)
  const [overallHealth, setOverallHealth] = useState('unknown')

  const healthChecks = [
    {
      id: 'environment',
      name: 'Environment Variables',
      description: 'Check if all required environment variables are loaded',
      critical: true,
      check: checkEnvironmentVariables
    },
    {
      id: 'stripe_keys',
      name: 'Stripe Configuration',
      description: 'Verify Stripe publishable key is valid',
      critical: true,
      check: checkStripeConfiguration
    },
    {
      id: 'netlify_functions',
      name: 'Netlify Functions',
      description: 'Test if payment functions are accessible',
      critical: true,
      check: checkNetlifyFunctions
    },
    {
      id: 'webhook_endpoint',
      name: 'Webhook Endpoint',
      description: 'Verify webhook endpoint is reachable',
      critical: false,
      check: checkWebhookEndpoint
    },
    {
      id: 'price_ids',
      name: 'Subscription Products',
      description: 'Check if Stripe Price IDs are configured',
      critical: false,
      check: checkPriceIds
    }
  ]

  async function checkEnvironmentVariables() {
    const requiredVars = [
      'VITE_STRIPE_PUBLISHABLE_KEY',
      'VITE_APP_URL',
      'VITE_WEBHOOK_URL'
    ]

    const missing = []
    const present = []

    requiredVars.forEach(varName => {
      const value = import.meta.env[varName]
      if (value) {
        present.push(varName)
      } else {
        missing.push(varName)
      }
    })

    return {
      success: missing.length === 0,
      message: missing.length === 0 
        ? `All ${present.length} environment variables loaded`
        : `Missing ${missing.length} environment variables`,
      details: {
        present: present.length,
        missing: missing,
        total: requiredVars.length
      }
    }
  }

  async function checkStripeConfiguration() {
    try {
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      
      if (!publishableKey) {
        return {
          success: false,
          message: 'Stripe publishable key not found',
          details: 'VITE_STRIPE_PUBLISHABLE_KEY environment variable is missing'
        }
      }

      if (!publishableKey.startsWith('pk_')) {
        return {
          success: false,
          message: 'Invalid Stripe key format',
          details: 'Publishable key should start with "pk_"'
        }
      }

      // Try to load Stripe
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(publishableKey)

      return {
        success: !!stripe,
        message: stripe ? 'Stripe loaded successfully' : 'Failed to load Stripe',
        details: {
          keyType: publishableKey.includes('test') ? 'Test Mode' : 'Live Mode',
          keyPrefix: publishableKey.substring(0, 15) + '...'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error loading Stripe',
        details: error.message
      }
    }
  }

  async function checkNetlifyFunctions() {
    const functions = [
      '/.netlify/functions/stripe-webhook',
      '/.netlify/functions/create-subscription-checkout',
      '/.netlify/functions/create-credit-checkout'
    ]

    const results = {}
    let successCount = 0

    for (const func of functions) {
      try {
        const response = await fetch(func, { method: 'GET' })
        const isAccessible = response.status !== 404
        results[func] = {
          accessible: isAccessible,
          status: response.status
        }
        if (isAccessible) successCount++
      } catch (error) {
        results[func] = {
          accessible: false,
          error: 'Network error'
        }
      }
    }

    return {
      success: successCount === functions.length,
      message: `${successCount}/${functions.length} functions accessible`,
      details: results
    }
  }

  async function checkWebhookEndpoint() {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || `${window.location.origin}/.netlify/functions/stripe-webhook`
      const response = await fetch(webhookUrl, { method: 'GET' })
      
      return {
        success: response.status !== 404,
        message: response.status !== 404 ? 'Webhook endpoint accessible' : 'Webhook endpoint not found',
        details: {
          url: webhookUrl,
          status: response.status,
          statusText: response.statusText
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Webhook endpoint unreachable',
        details: error.message
      }
    }
  }

  async function checkPriceIds() {
    const priceIds = {
      bronze: import.meta.env.VITE_STRIPE_BRONZE_PRICE_ID,
      silver: import.meta.env.VITE_STRIPE_SILVER_PRICE_ID,
      gold: import.meta.env.VITE_STRIPE_GOLD_PRICE_ID
    }

    const configured = Object.entries(priceIds).filter(([_, id]) => id && id.startsWith('price_'))
    const total = Object.keys(priceIds).length

    return {
      success: configured.length === total,
      message: `${configured.length}/${total} Price IDs configured`,
      details: Object.fromEntries(
        Object.entries(priceIds).map(([tier, id]) => [
          tier,
          {
            configured: !!id,
            valid: id && id.startsWith('price_'),
            value: id ? `${id.substring(0, 15)}...` : 'Not set'
          }
        ])
      )
    }
  }

  const runHealthCheck = async () => {
    setIsRunning(true)
    setHealthStatus({})

    const results = {}
    
    for (const check of healthChecks) {
      try {
        const result = await check.check()
        results[check.id] = {
          ...result,
          critical: check.critical,
          name: check.name
        }
      } catch (error) {
        results[check.id] = {
          success: false,
          message: 'Health check failed',
          details: error.message,
          critical: check.critical,
          name: check.name
        }
      }
    }

    setHealthStatus(results)
    
    // Calculate overall health
    const criticalChecks = Object.values(results).filter(r => r.critical)
    const criticalPassed = criticalChecks.filter(r => r.success).length
    const allPassed = Object.values(results).filter(r => r.success).length
    
    if (criticalPassed === criticalChecks.length) {
      setOverallHealth(allPassed === Object.keys(results).length ? 'excellent' : 'good')
    } else {
      setOverallHealth('critical')
    }
    
    setIsRunning(false)
  }

  useEffect(() => {
    runHealthCheck()
  }, [])

  const getHealthColor = (status) => {
    switch (status) {
      case 'excellent': return '#22c55e'
      case 'good': return '#f59e0b'
      case 'critical': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getHealthMessage = (status) => {
    switch (status) {
      case 'excellent': return 'All systems operational'
      case 'good': return 'Platform functional with minor issues'
      case 'critical': return 'Critical issues detected'
      default: return 'Checking system health...'
    }
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
            HTK Platform Health Check
          </h1>
          <p style={{ color: '#cccccc', fontSize: '1.125rem' }}>
            Real-time system status and diagnostics
          </p>
        </div>

        {/* Overall Health Status */}
        <div style={{
          backgroundColor: '#111111',
          border: `2px solid ${getHealthColor(overallHealth)}`,
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: getHealthColor(overallHealth),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            {isRunning ? (
              <Loader size={32} color="#ffffff" className="animate-spin" />
            ) : overallHealth === 'excellent' ? (
              <CheckCircle size={32} color="#ffffff" />
            ) : overallHealth === 'good' ? (
              <AlertTriangle size={32} color="#ffffff" />
            ) : (
              <X size={32} color="#ffffff" />
            )}
          </div>
          
          <h2 style={{
            color: getHealthColor(overallHealth),
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {getHealthMessage(overallHealth)}
          </h2>
          
          <p style={{ color: '#cccccc' }}>
            Last checked: {new Date().toLocaleTimeString()}
          </p>
          
          <button
            onClick={runHealthCheck}
            disabled={isRunning}
            style={{
              marginTop: '1rem',
              padding: '8px 16px',
              backgroundColor: '#B9975B',
              border: 'none',
              borderRadius: '6px',
              color: '#000000',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.6 : 1
            }}
          >
            {isRunning ? 'Checking...' : 'Refresh Status'}
          </button>
        </div>

        {/* Individual Health Checks */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {healthChecks.map((check) => {
            const result = healthStatus[check.id]
            
            return (
              <div
                key={check.id}
                style={{
                  backgroundColor: '#111111',
                  border: `2px solid ${result ? (result.success ? '#22c55e' : '#ef4444') : '#333333'}`,
                  borderRadius: '12px',
                  padding: '1.5rem'
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
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: result ? (result.success ? '#22c55e' : '#ef4444') : '#333333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {!result ? (
                        <Loader size={16} color="#ffffff" className="animate-spin" />
                      ) : result.success ? (
                        <CheckCircle size={16} color="#ffffff" />
                      ) : (
                        <X size={16} color="#ffffff" />
                      )}
                    </div>
                    
                    <div>
                      <h3 style={{
                        color: '#B9975B',
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {check.name}
                        {check.critical && (
                          <span style={{
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            CRITICAL
                          </span>
                        )}
                      </h3>
                      <p style={{
                        color: '#cccccc',
                        fontSize: '0.875rem',
                        margin: 0
                      }}>
                        {check.description}
                      </p>
                    </div>
                  </div>
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

        {/* Quick Actions */}
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
            Quick Actions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <a
              href="/subscription"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#B9975B',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#222222'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <ExternalLink size={16} />
              Test Subscriptions
            </a>
            
            <a
              href="/credits"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#B9975B',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#222222'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <ExternalLink size={16} />
              Test Credits
            </a>
            
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#B9975B',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#222222'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <ExternalLink size={16} />
              Stripe Dashboard
            </a>
            
            <a
              href="https://app.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#B9975B',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#222222'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <ExternalLink size={16} />
              Netlify Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
