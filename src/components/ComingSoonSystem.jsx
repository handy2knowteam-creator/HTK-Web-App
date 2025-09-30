import React, { useState } from 'react';

const ComingSoonSystem = ({ 
  featureName = "Feature", 
  description = "This exciting feature is currently in development", 
  expectedDate = "Coming Soon",
  category = "general",
  priority = "medium",
  showNotifyMe = true,
  customIcon = null,
  customColor = "#B9975B"
}) => {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const categoryIcons = {
    search: '🔍',
    messaging: '💬',
    payment: '💳',
    analytics: '📊',
    mobile: '📱',
    community: '👥',
    verification: '✅',
    calendar: '📅',
    quotes: '📋',
    reviews: '⭐',
    general: '🚀',
    admin: '🔐',
    api: '🔌',
    integration: '🔗',
    ai: '🤖',
    video: '🎥',
    chat: '💭',
    notifications: '🔔'
  };

  const priorityColors = {
    high: '#ff4444',
    medium: '#B9975B',
    low: '#4CAF50'
  };

  const priorityLabels = {
    high: 'High Priority',
    medium: 'In Development',
    low: 'Planned Feature'
  };

  const handleNotifyMe = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // Save notification request
    const notificationRequests = JSON.parse(localStorage.getItem('htkFeatureNotifications') || '[]');
    const newRequest = {
      id: Date.now(),
      email: email,
      feature: featureName,
      category: category,
      requestDate: new Date().toISOString(),
      status: 'pending'
    };
    
    notificationRequests.push(newRequest);
    localStorage.setItem('htkFeatureNotifications', JSON.stringify(notificationRequests));
    
    setNotified(true);
    setEmail('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Main Icon */}
        <div style={{
          fontSize: '120px',
          marginBottom: '30px',
          filter: 'drop-shadow(0 0 20px rgba(185, 151, 91, 0.3))'
        }}>
          {customIcon || categoryIcons[category] || categoryIcons.general}
        </div>

        {/* Feature Name */}
        <h1 style={{
          color: customColor,
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '0 0 20px rgba(185, 151, 91, 0.5)'
        }}>
          {featureName}
        </h1>

        {/* Priority Badge */}
        <div style={{
          display: 'inline-block',
          backgroundColor: priorityColors[priority],
          color: '#fff',
          padding: '8px 20px',
          borderRadius: '25px',
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '30px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {priorityLabels[priority]}
        </div>

        {/* Description */}
        <p style={{
          color: '#ccc',
          fontSize: '20px',
          lineHeight: '1.6',
          marginBottom: '40px',
          maxWidth: '500px',
          margin: '0 auto 40px auto'
        }}>
          {description}
        </p>

        {/* Expected Date */}
        <div style={{
          backgroundColor: '#111',
          border: '2px solid #333',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '40px'
        }}>
          <div style={{
            color: customColor,
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            Expected Launch
          </div>
          <div style={{
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {expectedDate}
          </div>
        </div>

        {/* Notify Me Section */}
        {showNotifyMe && !notified && (
          <div style={{
            backgroundColor: '#111',
            border: '2px solid #333',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              color: customColor,
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Get Notified When It's Ready
            </h3>
            <p style={{
              color: '#888',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Be the first to know when this feature launches
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={handleNotifyMe}
                style={{
                  padding: '12px 24px',
                  background: `linear-gradient(45deg, ${customColor}dd, ${customColor}, ${customColor}dd)`,
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Notify Me
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {notified && (
          <div style={{
            backgroundColor: '#1a4d1a',
            border: '2px solid #4CAF50',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              You're All Set!
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>
              We'll email you as soon as {featureName} is ready to use.
            </p>
          </div>
        )}

        {/* Back to Platform */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '2px solid #333',
              borderRadius: '8px',
              color: '#ccc',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ← Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '12px 24px',
              background: `linear-gradient(45deg, ${customColor}dd, ${customColor}, ${customColor}dd)`,
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🏠 Home
          </button>
        </div>

        {/* Development Status */}
        <div style={{
          marginTop: '50px',
          padding: '20px',
          backgroundColor: '#0a0a0a',
          borderRadius: '10px',
          border: '1px solid #222'
        }}>
          <div style={{
            color: '#666',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px'
          }}>
            Development Status
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#888', fontSize: '14px' }}>Progress</span>
            <span style={{ color: customColor, fontSize: '14px', fontWeight: 'bold' }}>
              {priority === 'high' ? '75%' : priority === 'medium' ? '45%' : '15%'}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#222',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: priority === 'high' ? '75%' : priority === 'medium' ? '45%' : '15%',
              height: '100%',
              background: `linear-gradient(90deg, ${customColor}dd, ${customColor})`,
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-configured coming soon components for common features
export const SearchComingSoon = () => (
  <ComingSoonSystem
    featureName="Advanced Search"
    description="Powerful search with filters, location-based results, and smart matching algorithms"
    category="search"
    priority="high"
    expectedDate="Next Week"
  />
);

export const MessagingComingSoon = () => (
  <ComingSoonSystem
    featureName="Direct Messaging"
    description="Secure messaging between customers and tradespeople with file sharing and quote management"
    category="messaging"
    priority="high"
    expectedDate="Coming Soon"
  />
);

export const PaymentComingSoon = () => (
  <ComingSoonSystem
    featureName="Payment System"
    description="Secure payments, escrow services, and automated invoicing for seamless transactions"
    category="payment"
    priority="high"
    expectedDate="In Development"
  />
);

export const MobileAppComingSoon = () => (
  <ComingSoonSystem
    featureName="Mobile App"
    description="Native mobile app with push notifications, offline mode, and camera integration"
    category="mobile"
    priority="medium"
    expectedDate="Q2 2024"
  />
);

export const AnalyticsComingSoon = () => (
  <ComingSoonSystem
    featureName="Analytics Dashboard"
    description="Comprehensive analytics with insights, reports, and performance tracking"
    category="analytics"
    priority="medium"
    expectedDate="Coming Soon"
  />
);

export const VerificationComingSoon = () => (
  <ComingSoonSystem
    featureName="Professional Verification"
    description="Advanced verification system with document upload, skills assessment, and badges"
    category="verification"
    priority="high"
    expectedDate="Next Month"
  />
);

export const CalendarComingSoon = () => (
  <ComingSoonSystem
    featureName="Smart Calendar"
    description="Integrated calendar with booking, scheduling, and availability management"
    category="calendar"
    priority="medium"
    expectedDate="Coming Soon"
  />
);

export const ReviewsComingSoon = () => (
  <ComingSoonSystem
    featureName="Review System"
    description="Comprehensive review and rating system with verified feedback and reputation management"
    category="reviews"
    priority="high"
    expectedDate="In Development"
  />
);

export const CommunityComingSoon = () => (
  <ComingSoonSystem
    featureName="Community Hub"
    description="Trade forums, knowledge sharing, peer support, and professional networking"
    category="community"
    priority="medium"
    expectedDate="Coming Soon"
  />
);

export const AIComingSoon = () => (
  <ComingSoonSystem
    featureName="AI Assistant"
    description="Smart AI assistant for job matching, quote generation, and customer support"
    category="ai"
    priority="low"
    expectedDate="Future Release"
  />
);

export default ComingSoonSystem;
