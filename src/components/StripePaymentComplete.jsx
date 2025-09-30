import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // Replace with actual key

const CREDIT_PACKAGES = [
  { id: 'starter', credits: 10, price: 10, popular: false, description: 'Perfect for trying HTK' },
  { id: 'professional', credits: 50, price: 45, popular: true, description: 'Most popular choice', savings: '£5 saved' },
  { id: 'business', credits: 100, price: 85, popular: false, description: 'For busy professionals', savings: '£15 saved' },
  { id: 'enterprise', credits: 250, price: 200, popular: false, description: 'Maximum value', savings: '£50 saved' }
];

const PaymentForm = ({ selectedPackage, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setPaymentError('');

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'HTK Customer',
        },
      });

      if (error) {
        setPaymentError(error.message);
        setProcessing(false);
        return;
      }

      // Simulate payment processing
      setTimeout(() => {
        onSuccess({
          paymentMethodId: paymentMethod.id,
          credits: selectedPackage.credits,
          amount: selectedPackage.price
        });
        setProcessing(false);
      }, 2000);

    } catch (err) {
      setPaymentError('Payment failed. Please try again.');
      setProcessing(false);
      onError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #B9975B',
        marginBottom: '20px'
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
            },
          }}
        />
      </div>

      {paymentError && (
        <div style={{
          color: '#ff4444',
          backgroundColor: '#330000',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {paymentError}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        style={{
          width: '100%',
          padding: '15px',
          background: processing 
            ? 'linear-gradient(45deg, #666, #888, #666)' 
            : 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
          border: 'none',
          borderRadius: '8px',
          color: '#000',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: processing ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        {processing ? 'Processing Payment...' : `Pay £${selectedPackage.price} for ${selectedPackage.credits} Credits`}
      </button>
    </form>
  );
};

const StripePaymentComplete = () => {
  const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]); // Default to professional
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    // Load user's current credits
    const savedCredits = localStorage.getItem('htkUserCredits');
    if (savedCredits) {
      setUserCredits(parseInt(savedCredits));
    }
  }, []);

  const handlePaymentSuccess = (paymentData) => {
    // Add credits to user account
    const newCredits = userCredits + paymentData.credits;
    setUserCredits(newCredits);
    localStorage.setItem('htkUserCredits', newCredits.toString());
    
    // Record transaction
    const transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      credits: paymentData.credits,
      amount: paymentData.amount,
      paymentMethodId: paymentData.paymentMethodId,
      status: 'completed'
    };
    
    const transactions = JSON.parse(localStorage.getItem('htkTransactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('htkTransactions', JSON.stringify(transactions));
    
    setPaymentSuccess(true);
    setShowPayment(false);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  if (paymentSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#111',
          padding: '40px',
          borderRadius: '15px',
          border: '2px solid #B9975B',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>🎉</div>
          
          <h1 style={{
            color: '#B9975B',
            fontSize: '32px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>Payment Successful!</h1>
          
          <p style={{
            color: '#fff',
            fontSize: '18px',
            marginBottom: '30px'
          }}>
            Your credits have been added to your account.
          </p>
          
          <div style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '10px'
            }}>Current Balance</h3>
            <p style={{
              color: '#fff',
              fontSize: '36px',
              fontWeight: 'bold',
              margin: 0
            }}>{userCredits} Credits</p>
          </div>
          
          <button
            onClick={() => setPaymentSuccess(false)}
            style={{
              padding: '12px 30px',
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Buy More Credits
          </button>
        </div>
      </div>
    );
  }

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
          <img 
            src="/htk-logo-premium.png" 
            alt="HTK Logo" 
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '20px'
            }}
          />
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>HTK Credits</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px'
          }}>£1 = 1 Credit • Jobs from £3-£100</p>
          
          <div style={{
            backgroundColor: '#111',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #B9975B',
            display: 'inline-block',
            marginTop: '20px'
          }}>
            <p style={{
              color: '#B9975B',
              fontSize: '16px',
              margin: 0,
              fontWeight: 'bold'
            }}>Current Balance: {userCredits} Credits</p>
          </div>
        </div>

        {!showPayment ? (
          /* Credit Packages */
          <div>
            <h2 style={{
              color: '#fff',
              fontSize: '28px',
              textAlign: 'center',
              marginBottom: '30px'
            }}>Choose Your Credit Package</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {CREDIT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  style={{
                    backgroundColor: selectedPackage.id === pkg.id ? '#222' : '#111',
                    border: selectedPackage.id === pkg.id ? '2px solid #B9975B' : '1px solid #333',
                    borderRadius: '15px',
                    padding: '30px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    transform: selectedPackage.id === pkg.id ? 'scale(1.05)' : 'scale(1)'
                  }}
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
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '24px',
                      marginBottom: '10px',
                      textTransform: 'capitalize',
                      fontWeight: 'bold'
                    }}>{pkg.id}</h3>
                    
                    <div style={{
                      fontSize: '48px',
                      color: '#fff',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>{pkg.credits}</div>
                    
                    <p style={{
                      color: '#ccc',
                      fontSize: '16px',
                      marginBottom: '15px'
                    }}>Credits</p>
                    
                    <div style={{
                      fontSize: '32px',
                      color: '#B9975B',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>£{pkg.price}</div>
                    
                    {pkg.savings && (
                      <p style={{
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginBottom: '15px'
                      }}>{pkg.savings}</p>
                    )}
                    
                    <p style={{
                      color: '#888',
                      fontSize: '14px',
                      marginBottom: '20px'
                    }}>{pkg.description}</p>
                    
                    <div style={{
                      backgroundColor: selectedPackage.id === pkg.id ? '#B9975B' : '#333',
                      color: selectedPackage.id === pkg.id ? '#000' : '#fff',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {selectedPackage.id === pkg.id ? 'SELECTED' : 'SELECT PACKAGE'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowPayment(true)}
                style={{
                  padding: '15px 40px',
                  background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Purchase {selectedPackage.credits} Credits for £{selectedPackage.price}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <div style={{
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: '#111',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #B9975B'
            }}>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>Complete Your Purchase</h2>
              
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '18px',
                  marginBottom: '10px'
                }}>{selectedPackage.credits} Credits</h3>
                <p style={{
                  color: '#B9975B',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: 0
                }}>£{selectedPackage.price}</p>
              </div>
              
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  selectedPackage={selectedPackage}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
              
              <button
                onClick={() => setShowPayment(false)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #666',
                  borderRadius: '5px',
                  color: '#ccc',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}
              >
                ← Back to Packages
              </button>
            </div>
          </div>
        )}
        
        {/* Features */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '30px'
          }}>Why Choose HTK Credits?</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: '🎯', title: 'Fair Pricing', desc: 'Jobs priced £3-£100 based on complexity' },
              { icon: '⚡', title: 'Instant Access', desc: 'Credits available immediately after purchase' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Protected by Stripe encryption' },
              { icon: '💰', title: 'No Commission', desc: 'Direct connections, no hidden fees' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#111',
                padding: '25px',
                borderRadius: '10px',
                border: '1px solid #333'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feature.icon}</div>
                <h4 style={{
                  color: '#B9975B',
                  fontSize: '18px',
                  marginBottom: '10px'
                }}>{feature.title}</h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentComplete;
