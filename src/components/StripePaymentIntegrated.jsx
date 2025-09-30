import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe with publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function StripePaymentIntegrated() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Subscription packages with environment variable Price IDs
  const subscriptionPackages = [
    {
      id: 'bronze',
      name: 'Bronze',
      credits: 10,
      price: 9.99,
      priceId: import.meta.env.VITE_STRIPE_BRONZE_PRICE_ID,
      popular: false,
      features: [
        '10 credits per month',
        '£0.99 per credit',
        'Basic support',
        'Standard job access',
        'Credits never expire'
      ],
      icon: '🥉',
      color: 'border-amber-500 bg-amber-900/20'
    },
    {
      id: 'silver',
      name: 'Silver',
      credits: 70,
      price: 49.99,
      priceId: import.meta.env.VITE_STRIPE_SILVER_PRICE_ID,
      popular: true,
      features: [
        '70 credits per month',
        '£0.71 per credit',
        'Priority support',
        'All job categories',
        'Credits never expire',
        'Portfolio showcase'
      ],
      icon: '🥈',
      color: 'border-gray-400 bg-gray-700/20'
    },
    {
      id: 'gold',
      name: 'Gold',
      credits: 160,
      price: 99.99,
      priceId: import.meta.env.VITE_STRIPE_GOLD_PRICE_ID,
      popular: false,
      features: [
        '160 credits per month',
        '£0.62 per credit',
        '24/7 priority support',
        'Premium job access',
        'Credits never expire',
        'Featured profile',
        'Advanced analytics'
      ],
      icon: '🥇',
      color: 'border-yellow-500 bg-yellow-900/20'
    }
  ]

  const handleSubscriptionPurchase = async (pkg) => {
    if (!pkg.priceId) {
      alert('Price ID not configured for this package. Please check environment variables.')
      return
    }

    setIsLoading(true)
    setSelectedPackage(pkg)

    try {
      // Call Netlify function to create checkout session
      const response = await fetch('/.netlify/functions/create-subscription-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: pkg.priceId,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          successUrl: `${window.location.origin}/dashboard?success=true&package=${pkg.name}`,
          cancelUrl: `${window.location.origin}/subscription?cancelled=true`
        })
      })

      const session = await response.json()

      if (session.error) {
        throw new Error(session.error)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      })

      if (error) {
        throw new Error(error.message)
      }

    } catch (error) {
      console.error('Subscription purchase error:', error)
      alert(`Failed to start subscription: ${error.message}`)
    } finally {
      setIsLoading(false)
      setSelectedPackage(null)
    }
  }

  const handleCreditPurchase = async (creditAmount) => {
    if (!creditAmount || creditAmount < 1) {
      alert('Please enter a valid credit amount (minimum 1 credit)')
      return
    }

    setIsLoading(true)

    try {
      // Call Netlify function to create checkout session for credits
      const response = await fetch('/.netlify/functions/create-credit-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creditAmount: parseInt(creditAmount),
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          successUrl: `${window.location.origin}/dashboard?success=true&credits=${creditAmount}`,
          cancelUrl: `${window.location.origin}/credits?cancelled=true`
        })
      })

      const session = await response.json()

      if (session.error) {
        throw new Error(session.error)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      })

      if (error) {
        throw new Error(error.message)
      }

    } catch (error) {
      console.error('Credit purchase error:', error)
      alert(`Failed to purchase credits: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#B9975B',
            marginBottom: '1rem'
          }}>
            HTK Payment System
          </h1>
          <p style={{ color: '#cccccc', fontSize: '1.125rem' }}>
            Choose your subscription or purchase credits directly
          </p>
        </div>

        {/* Customer Information */}
        <div style={{
          backgroundColor: '#111111',
          border: '2px solid #B9975B',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Customer Information
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#B9975B',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222222',
                  border: '2px solid #B9975B',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                color: '#B9975B',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222222',
                  border: '2px solid #B9975B',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                color: '#B9975B',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222222',
                  border: '2px solid #B9975B',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Subscription Packages */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Monthly Subscriptions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {subscriptionPackages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  backgroundColor: '#111111',
                  border: `2px solid ${pkg.popular ? '#B9975B' : 'rgba(185, 151, 91, 0.3)'}`,
                  borderRadius: '15px',
                  padding: '2rem',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)'
                  e.target.style.boxShadow = '0 15px 30px rgba(185, 151, 91, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#B9975B',
                    color: '#000000',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    Most Popular
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    {pkg.icon}
                  </div>
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {pkg.name}
                  </h3>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '0.5rem'
                  }}>
                    £{pkg.price}
                    <span style={{ fontSize: '1rem', color: '#cccccc' }}>/month</span>
                  </div>
                  <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                    {pkg.credits} credits • £{(pkg.price / pkg.credits).toFixed(2)} per credit
                  </div>
                </div>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '2rem'
                }}>
                  {pkg.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      color: '#cccccc'
                    }}>
                      <span style={{ color: '#B9975B', marginRight: '0.5rem' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscriptionPurchase(pkg)}
                  disabled={isLoading || !customerInfo.email}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    backgroundColor: pkg.popular ? '#B9975B' : 'transparent',
                    border: `2px solid #B9975B`,
                    borderRadius: '8px',
                    color: pkg.popular ? '#000000' : '#B9975B',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isLoading || !customerInfo.email ? 'not-allowed' : 'pointer',
                    opacity: isLoading || !customerInfo.email ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && customerInfo.email) {
                      e.target.style.backgroundColor = '#B9975B'
                      e.target.style.color = '#000000'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.popular) {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#B9975B'
                    }
                  }}
                >
                  {isLoading && selectedPackage?.id === pkg.id ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Top-up */}
        <div style={{
          backgroundColor: '#111111',
          border: '2px solid #B9975B',
          borderRadius: '15px',
          padding: '2rem'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            Pay-as-you-go Credits
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: '#222222',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ color: '#B9975B', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Simple Pricing: £1 = 1 Credit
              </div>
              <div style={{ color: '#cccccc', fontSize: '0.875rem' }}>
                Job leads cost £3-£100 • Credits never expire
              </div>
            </div>
            
            <CreditPurchaseForm onPurchase={handleCreditPurchase} isLoading={isLoading} />
          </div>
        </div>

        {/* Environment Check */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#222222',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#cccccc'
        }}>
          <strong style={{ color: '#B9975B' }}>Environment Status:</strong>
          <div>Stripe Publishable Key: {import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? '✓ Configured' : '❌ Missing'}</div>
          <div>Bronze Price ID: {import.meta.env.VITE_STRIPE_BRONZE_PRICE_ID ? '✓ Configured' : '❌ Missing'}</div>
          <div>Silver Price ID: {import.meta.env.VITE_STRIPE_SILVER_PRICE_ID ? '✓ Configured' : '❌ Missing'}</div>
          <div>Gold Price ID: {import.meta.env.VITE_STRIPE_GOLD_PRICE_ID ? '✓ Configured' : '❌ Missing'}</div>
        </div>
      </div>
    </div>
  )
}

function CreditPurchaseForm({ onPurchase, isLoading }) {
  const [creditAmount, setCreditAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(null)

  const quickAmounts = [5, 10, 25, 50, 100]

  const handleQuickSelect = (amount) => {
    setCreditAmount(amount.toString())
    setSelectedAmount(amount)
  }

  const handlePurchase = () => {
    onPurchase(creditAmount)
  }

  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      {/* Quick Select Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleQuickSelect(amount)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedAmount === amount ? '#B9975B' : 'transparent',
              border: '2px solid #B9975B',
              borderRadius: '20px',
              color: selectedAmount === amount ? '#000000' : '#B9975B',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {amount} credits (£{amount})
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <input
          type="number"
          min="1"
          max="1000"
          value={creditAmount}
          onChange={(e) => {
            setCreditAmount(e.target.value)
            setSelectedAmount(null)
          }}
          placeholder="Enter credit amount"
          style={{
            padding: '12px',
            backgroundColor: '#222222',
            border: '2px solid #B9975B',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem',
            width: '200px',
            textAlign: 'center'
          }}
        />
        
        <button
          onClick={handlePurchase}
          disabled={isLoading || !creditAmount || creditAmount < 1}
          style={{
            padding: '12px 24px',
            backgroundColor: '#B9975B',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isLoading || !creditAmount || creditAmount < 1 ? 'not-allowed' : 'pointer',
            opacity: isLoading || !creditAmount || creditAmount < 1 ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {isLoading ? 'Processing...' : `Buy £${creditAmount || 0}`}
        </button>
      </div>
      
      {creditAmount && (
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: '#cccccc',
          fontSize: '0.875rem'
        }}>
          You'll receive {creditAmount} credits for £{creditAmount}
        </div>
      )}
    </div>
  )
}
