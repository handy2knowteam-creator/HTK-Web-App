import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, X, RefreshCw } from 'lucide-react'

export default function PaymentErrorHandler({ error, onRetry, onClose }) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  if (!error) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#111111',
        border: '2px solid #B9975B',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#B9975B',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={20} />
        </button>

        {/* Error Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <AlertTriangle size={48} color="#ef4444" />
        </div>

        {/* Error Title */}
        <h2 style={{
          color: '#B9975B',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          Payment Error
        </h2>

        {/* Error Message */}
        <div style={{
          backgroundColor: '#222222',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{
            color: '#ffffff',
            fontSize: '1rem',
            lineHeight: '1.5',
            margin: 0
          }}>
            {error.message || 'An unexpected error occurred during payment processing.'}
          </p>
        </div>

        {/* Common Solutions */}
        <div style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            color: '#B9975B',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Common Solutions:
          </h3>
          <ul style={{
            color: '#cccccc',
            fontSize: '0.875rem',
            lineHeight: '1.4',
            paddingLeft: '1rem',
            margin: 0
          }}>
            <li>Check your internet connection</li>
            <li>Verify your payment card details</li>
            <li>Ensure your card has sufficient funds</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            style={{
              padding: '12px 24px',
              backgroundColor: '#B9975B',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isRetrying ? 'not-allowed' : 'pointer',
              opacity: isRetrying ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isRetrying ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Try Again
              </>
            )}
          </button>

          <button
            onClick={onClose}
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
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#B9975B'
              e.target.style.color = '#B9975B'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#666666'
              e.target.style.color = '#cccccc'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function PaymentSuccessModal({ isVisible, onClose, details }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto-close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#111111',
        border: '2px solid #22c55e',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#B9975B',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <CheckCircle size={64} color="#22c55e" />
        </div>

        {/* Success Title */}
        <h2 style={{
          color: '#22c55e',
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Payment Successful!
        </h2>

        {/* Success Details */}
        {details && (
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {details.credits && (
              <div style={{
                color: '#B9975B',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {details.credits} Credits Added
              </div>
            )}
            {details.amount && (
              <div style={{
                color: '#cccccc',
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                Amount: £{details.amount}
              </div>
            )}
            {details.package && (
              <div style={{
                color: '#cccccc',
                fontSize: '1rem'
              }}>
                Package: {details.package}
              </div>
            )}
          </div>
        )}

        <p style={{
          color: '#cccccc',
          fontSize: '1rem',
          lineHeight: '1.5',
          marginBottom: '1.5rem'
        }}>
          Your payment has been processed successfully. You can now use your credits to access job leads on the HTK platform.
        </p>

        <button
          onClick={onClose}
          style={{
            padding: '12px 24px',
            backgroundColor: '#B9975B',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  )
}

export function PaymentLoadingSpinner({ message = 'Processing payment...' }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#111111',
        border: '2px solid #B9975B',
        borderRadius: '15px',
        padding: '3rem',
        textAlign: 'center'
      }}>
        {/* HTK Logo */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <img 
            src="/htk-logo-premium.png" 
            alt="HTK Logo" 
            style={{ 
              height: '64px', 
              width: '64px',
              filter: 'drop-shadow(0 0 10px rgba(185, 151, 91, 0.3))'
            }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

        {/* Spinning Loader */}
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #333333',
          borderTop: '4px solid #B9975B',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1.5rem auto'
        }} />

        {/* Loading Message */}
        <h3 style={{
          color: '#B9975B',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          {message}
        </h3>

        <p style={{
          color: '#cccccc',
          fontSize: '0.875rem'
        }}>
          Please do not close this window or refresh the page.
        </p>
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
