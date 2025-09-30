import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Your Stripe Account Configuration
const STRIPE_CONFIG = {
  accountId: 'acct_1S7CKwGFrHVFmHVw', // Your Stripe Account ID
  publishableKey: 'pk_live_51S7CKwGFrHVFmHVwXXXXXXXXXX', // Replace with your live publishable key
  webhookEndpoint: 'https://handy2know.com/api/stripe/webhook'
};

// Initialize Stripe with your account
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey, {
  stripeAccount: STRIPE_CONFIG.accountId
});

const StripePaymentToYourAccount = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Credit packages with pricing
  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 10,
      price: 10.00,
      description: 'Perfect for trying out the platform',
      popular: false,
      features: [
        '10 job lead credits',
        'Basic customer contact',
        'Standard support',
        'Valid for 30 days'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 50,
      price: 45.00,
      description: 'Best value for active tradespeople',
      popular: true,
      savings: 5.00,
      features: [
        '50 job lead credits',
        'Priority customer contact',
        'Advanced messaging',
        'Quote management tools',
        'Valid for 60 days'
      ]
    },
    {
      id: 'business',
      name: 'Business Pack',
      credits: 100,
      price: 85.00,
      description: 'For busy trade businesses',
      popular: false,
      savings: 15.00,
      features: [
        '100 job lead credits',
        'Premium customer access',
        'Advanced analytics',
        'Team management',
        'Priority support',
        'Valid for 90 days'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      credits: 250,
      price: 200.00,
      description: 'For large trade operations',
      popular: false,
      savings: 50.00,
      features: [
        '250 job lead credits',
        'Unlimited customer access',
        'Advanced reporting',
        'Multi-user accounts',
        'Dedicated support',
        'Custom integrations',
        'Valid for 120 days'
      ]
    }
  ];

  useEffect(() => {
    loadUserCredits();
    loadPaymentHistory();
  }, []);

  const loadUserCredits = () => {
    // Load user credits from localStorage or API
    const credits = localStorage.getItem('htkUserCredits');
    setUserCredits(credits ? parseInt(credits) : 0);
  };

  const loadPaymentHistory = () => {
    // Load payment history from localStorage or API
    const history = localStorage.getItem('htkPaymentHistory');
    setPaymentHistory(history ? JSON.parse(history) : []);
  };

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentForm(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            💳 Purchase Credits
          </h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            marginBottom: '20px'
          }}>
            Buy credits to access job leads and contact customers
          </p>
          
          {/* Current Credits Display */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#111',
            padding: '15px 25px',
            borderRadius: '15px',
            border: '2px solid #B9975B'
          }}>
            <div style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>
              Your Current Credits
            </div>
            <div style={{
              color: '#fff',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {userCredits} Credits
            </div>
          </div>
        </div>

        {/* Credit Packages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {creditPackages.map(pkg => (
            <div
              key={pkg.id}
              style={{
                backgroundColor: pkg.popular ? '#1a1a1a' : '#111',
                border: pkg.popular ? '2px solid #B9975B' : '1px solid #333',
                borderRadius: '15px',
                padding: '25px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selectedPackage?.id === pkg.id ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => selectPackage(pkg)}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#B9975B',
                  color: '#000',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>
                  {pkg.name}
                </h3>
                <p style={{
                  color: '#888',
                  fontSize: '14px',
                  marginBottom: '15px'
                }}>
                  {pkg.description}
                </p>
                
                <div style={{
                  marginBottom: '10px'
                }}>
                  <span style={{
                    color: '#fff',
                    fontSize: '32px',
                    fontWeight: 'bold'
                  }}>
                    £{pkg.price.toFixed(2)}
                  </span>
                  {pkg.savings && (
                    <div style={{
                      color: '#4CAF50',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Save £{pkg.savings.toFixed(2)}
                    </div>
                  )}
                </div>
                
                <div style={{
                  color: '#B9975B',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  {pkg.credits} Credits
                </div>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: '20px'
              }}>
                {pkg.features.map((feature, index) => (
                  <li key={index} style={{
                    color: '#ccc',
                    fontSize: '14px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#4CAF50',
                      marginRight: '8px'
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => selectPackage(pkg)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: pkg.popular 
                    ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)'
                    : 'transparent',
                  border: pkg.popular ? 'none' : '2px solid #B9975B',
                  borderRadius: '8px',
                  color: pkg.popular ? '#000' : '#B9975B',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {selectedPackage?.id === pkg.id ? 'Selected ✓' : 'Select Package'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {showPaymentForm && selectedPackage && (
          <Elements stripe={stripePromise}>
            <PaymentForm 
              package={selectedPackage}
              onSuccess={(paymentData) => {
                // Update user credits
                const newCredits = userCredits + selectedPackage.credits;
                setUserCredits(newCredits);
                localStorage.setItem('htkUserCredits', newCredits.toString());
                
                // Add to payment history
                const newPayment = {
                  id: paymentData.paymentIntent.id,
                  package: selectedPackage.name,
                  credits: selectedPackage.credits,
                  amount: selectedPackage.price,
                  date: new Date().toISOString(),
                  status: 'completed'
                };
                const updatedHistory = [newPayment, ...paymentHistory];
                setPaymentHistory(updatedHistory);
                localStorage.setItem('htkPaymentHistory', JSON.stringify(updatedHistory));
                
                setShowPaymentForm(false);
                setSelectedPackage(null);
              }}
              onCancel={() => {
                setShowPaymentForm(false);
                setSelectedPackage(null);
              }}
            />
          </Elements>
        )}

        {/* Payment History */}
        {paymentHistory.length > 0 && (
          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            padding: '25px',
            marginTop: '40px'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              📊 Payment History
            </h3>
            
            <div style={{
              display: 'grid',
              gap: '10px'
            }}>
              {paymentHistory.slice(0, 5).map(payment => (
                <div
                  key={payment.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: '#222',
                    borderRadius: '8px'
                  }}
                >
                  <div>
                    <div style={{
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: '2px'
                    }}>
                      {payment.package}
                    </div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      color: '#B9975B',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      +{payment.credits} Credits
                    </div>
                    <div style={{
                      color: '#ccc',
                      fontSize: '12px'
                    }}>
                      £{payment.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How Credits Work */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          padding: '25px',
          marginTop: '40px'
        }}>
          <h3 style={{
            color: '#B9975B',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            💡 How Credits Work
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '15px',
              backgroundColor: '#222',
              borderRadius: '8px'
            }}>
              <div style={{
                color: '#B9975B',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                💰 Fair Pricing
              </div>
              <div style={{
                color: '#ccc',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                £1 = 1 Credit. Job leads cost 3-100 credits based on value. No hidden fees or commissions.
              </div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: '#222',
              borderRadius: '8px'
            }}>
              <div style={{
                color: '#B9975B',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                🎯 Quality Leads
              </div>
              <div style={{
                color: '#ccc',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                Only pay for genuine customer contacts. No wasted credits on fake or duplicate leads.
              </div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: '#222',
              borderRadius: '8px'
            }}>
              <div style={{
                color: '#B9975B',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
              🤝 Community First
              </div>
              <div style={{
                color: '#ccc',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                50% of profits returned to trade communities once we reach £100k milestone.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ package: selectedPackage, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        setProcessing(false);
        return;
      }

      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(selectedPackage.price * 100), // Convert to pence
          currency: 'gbp',
          payment_method: paymentMethod.id,
          customer_details: customerDetails,
          package_details: selectedPackage,
          stripe_account: STRIPE_CONFIG.accountId // Route to your account
        }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        setError(paymentIntent.error);
        setProcessing(false);
        return;
      }

      // Confirm payment
      const { error: confirmError, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.client_secret
      );

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      // Payment successful
      onSuccess({
        paymentIntent: confirmedPayment,
        package: selectedPackage,
        customer: customerDetails
      });

    } catch (err) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#111',
        borderRadius: '15px',
        padding: '30px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0
          }}>
            💳 Complete Payment
          </h2>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#666',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        {/* Package Summary */}
        <div style={{
          backgroundColor: '#222',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{
              color: '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              {selectedPackage.name}
            </span>
            <span style={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              £{selectedPackage.price.toFixed(2)}
            </span>
          </div>
          <div style={{
            color: '#ccc',
            fontSize: '14px'
          }}>
            {selectedPackage.credits} Credits • {selectedPackage.description}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Customer Details */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '10px'
              }}
            />
            
            <label style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '10px'
              }}
            />
            
            <label style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Card Details */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '10px'
            }}>
              Card Details
            </label>
            <div style={{
              padding: '15px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px'
            }}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#fff',
                      '::placeholder': {
                        color: '#888',
                      },
                    },
                    invalid: {
                      color: '#ff4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{
              backgroundColor: '#ff4444',
              color: '#fff',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Payment Security Notice */}
          <div style={{
            backgroundColor: '#1a4d1a',
            border: '1px solid #4CAF50',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{
              color: '#4CAF50',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              🔒 <strong>Secure Payment</strong>
            </div>
            <div style={{
              color: '#ccc',
              fontSize: '11px',
              marginTop: '2px'
            }}>
              Your payment is processed securely by Stripe. All payments go directly to HTK account: {STRIPE_CONFIG.accountId}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              style={{
                padding: '12px 20px',
                backgroundColor: 'transparent',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#ccc',
                fontSize: '14px',
                cursor: processing ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || processing}
              style={{
                padding: '12px 20px',
                background: processing 
                  ? '#666' 
                  : 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '8px',
                color: processing ? '#ccc' : '#000',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: processing ? 'not-allowed' : 'pointer'
              }}
            >
              {processing ? 'Processing...' : `Pay £${selectedPackage.price.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentToYourAccount;
