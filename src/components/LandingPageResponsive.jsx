import React, { useState, useEffect } from 'react'
import { getDeviceInfo, getResponsiveStyles, getTouchStyles, getIPhoneOptimizations, getMobileOptimizations } from '../utils/deviceDetection'

export default function LandingPageResponsive() {
  const [device, setDevice] = useState(null)
  const [styles, setStyles] = useState(null)

  useEffect(() => {
    const deviceInfo = getDeviceInfo()
    const responsiveStyles = getResponsiveStyles(deviceInfo)
    const touchStyles = getTouchStyles(deviceInfo)
    const iPhoneStyles = getIPhoneOptimizations(deviceInfo)
    const mobileStyles = getMobileOptimizations(deviceInfo)
    
    setDevice(deviceInfo)
    setStyles({
      ...responsiveStyles,
      touch: touchStyles,
      iPhone: iPhoneStyles,
      mobile: mobileStyles
    })
    
    // Log device info for debugging
    console.log('HTK Device Detection:', deviceInfo)
  }, [])

  const handleCustomerClick = () => {
    window.location.href = '/register/customer'
  }

  const handleTradeClick = () => {
    window.location.href = '/register/tradesperson'
  }

  const handleAdminClick = () => {
    window.location.href = '/admin/login'
  }

  // Show loading until device detection is complete
  if (!device || !styles) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#B9975B'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔨</div>
          <div>Loading HTK Platform...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      ...styles.iPhone.safeArea,
      ...styles.iPhone.scrollBehavior
    }}>
      {/* Device Info Debug (remove in production) */}
      {device.isIPhone && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(185, 151, 91, 0.9)',
          color: '#000',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          zIndex: 1000
        }}>
          iPhone {device.screenWidth}x{device.screenHeight}
        </div>
      )}

      {/* Header */}
      <header style={{
        backgroundColor: '#111111',
        borderBottom: '1px solid rgba(185, 151, 91, 0.2)',
        padding: device.isSmallScreen ? '0.75rem 0' : '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          ...styles.container,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: device.isSmallScreen ? 'wrap' : 'nowrap'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: device.isSmallScreen ? '0.5rem' : '1rem' 
          }}>
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              style={{ 
                height: device.isSmallScreen ? '36px' : '48px', 
                width: device.isSmallScreen ? '36px' : '48px' 
              }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div>
              <h1 style={{ 
                fontSize: device.isSmallScreen ? '1.25rem' : '1.5rem', 
                fontWeight: 'bold', 
                color: '#B9975B',
                margin: 0
              }}>
                HTK
              </h1>
              <p style={{ 
                color: '#999999', 
                fontSize: device.isSmallScreen ? '0.75rem' : '0.875rem',
                margin: 0
              }}>
                Handy To Know
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav style={styles.nav}>
            <button 
              onClick={() => window.location.href = '/how-it-works'}
              style={{
                background: 'none',
                border: 'none',
                color: '#cccccc',
                cursor: 'pointer',
                fontSize: '1rem',
                ...styles.touch
              }}
            >
              How It Works
            </button>
            <button 
              onClick={() => window.location.href = '/community-hub'}
              style={{
                background: 'none',
                border: 'none',
                color: '#cccccc',
                cursor: 'pointer',
                fontSize: '1rem',
                ...styles.touch
              }}
            >
              Community
            </button>
            <button 
              onClick={handleAdminClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#cccccc',
                cursor: 'pointer',
                fontSize: '1rem',
                ...styles.touch
              }}
            >
              Admin
            </button>
          </nav>

          {/* Mobile Menu Button */}
          {device.isSmallScreen && (
            <button style={{
              background: 'none',
              border: '1px solid #B9975B',
              color: '#B9975B',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '0.875rem',
              ...styles.touch
            }}>
              Menu
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.sectionPadding}>
        <div style={{ ...styles.container, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(185, 151, 91, 0.2)',
            border: '1px solid rgba(185, 151, 91, 0.3)',
            borderRadius: '25px',
            marginBottom: device.isSmallScreen ? '1.5rem' : '2rem'
          }}>
            <span style={{ color: '#B9975B', fontWeight: '600', fontSize: device.isSmallScreen ? '0.875rem' : '1rem' }}>
              ⭐ Premium Trade Platform
            </span>
          </div>

          <h1 style={{
            ...styles.heroTitle,
            marginBottom: device.isSmallScreen ? '1rem' : '1.5rem',
            color: '#ffffff'
          }}>
            <span style={{ color: '#ffffff' }}>Built by Trades,</span>
            <br />
            <span style={{ color: '#B9975B' }}>for Trades</span>
          </h1>
          
          <p style={{
            ...styles.subtitle,
            color: '#cccccc',
            marginBottom: device.isSmallScreen ? '2rem' : '3rem',
            maxWidth: device.isSmallScreen ? '100%' : '800px',
            margin: `0 auto ${device.isSmallScreen ? '2rem' : '3rem'} auto`
          }}>
            The premium community-first platform connecting skilled professionals with customers. 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Zero commission fees.</span> 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Fair pricing.</span> 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Community profit sharing.</span>
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: device.isSmallScreen ? 'column' : 'row',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: device.isSmallScreen ? '3rem' : '4rem'
          }}>
            <button
              onClick={handleCustomerClick}
              style={{
                ...styles.primaryButton,
                backgroundColor: '#B9975B',
                color: '#000000',
                ...styles.touch,
                touchAction: styles.mobile.touchAction
              }}
            >
              👥 Find Premium Tradespeople →
            </button>
            
            <button
              onClick={handleTradeClick}
              style={{
                ...styles.primaryButton,
                backgroundColor: 'transparent',
                border: '2px solid #B9975B',
                color: '#B9975B',
                ...styles.touch,
                touchAction: styles.mobile.touchAction
              }}
            >
              🔨 Join as Professional Trade →
            </button>
          </div>

          {/* Stats */}
          <div style={{
            ...styles.statsGrid,
            marginBottom: device.isSmallScreen ? '3rem' : '4rem'
          }}>
            {[
              { number: '2024', label: 'Platform Launch' },
              { number: 'BETA', label: 'Early Access' },
              { number: '£3-£100', label: 'Fair Job Pricing' },
              { number: '24/7', label: 'Community Support' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid rgba(185, 151, 91, 0.2)',
                  borderRadius: '12px',
                  padding: device.isSmallScreen ? '1rem' : '1.5rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: device.isSmallScreen ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: '#B9975B',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: '#cccccc',
                  fontSize: device.isSmallScreen ? '0.75rem' : '0.875rem',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        ...styles.sectionPadding,
        backgroundColor: 'rgba(17, 17, 17, 0.5)'
      }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: device.isSmallScreen ? '3rem' : '4rem' }}>
            <h2 style={{
              fontSize: device.isSmallScreen ? '1.75rem' : '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#B9975B'
            }}>
              Premium Platform Features
            </h2>
            <p style={{
              fontSize: device.isSmallScreen ? '1rem' : '1.25rem',
              color: '#cccccc',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Experience the difference of a platform built by industry professionals who understand your needs.
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {[
              {
                icon: '🛡️',
                title: 'Built by Trades',
                description: 'Created by tradespeople who understand the industry challenges'
              },
              {
                icon: '⭐',
                title: 'Community First',
                description: 'No commission fees - direct connections that strengthen communities'
              },
              {
                icon: '⏰',
                title: 'Modern Platform',
                description: 'Advanced technology with live portfolios and instant communication'
              },
              {
                icon: '👥',
                title: 'Profit Sharing',
                description: '50% of profits returned to communities once we reach £100k milestone'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid rgba(185, 151, 91, 0.2)',
                  borderRadius: '12px',
                  padding: device.isSmallScreen ? '1.5rem' : '2rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: device.isSmallScreen ? '2rem' : '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{
                  fontSize: device.isSmallScreen ? '1.125rem' : '1.25rem',
                  fontWeight: 'bold',
                  color: '#B9975B',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cccccc',
                  lineHeight: '1.6',
                  fontSize: device.isSmallScreen ? '0.875rem' : '1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.sectionPadding}>
        <div style={{ ...styles.container, maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: device.isSmallScreen ? '3rem' : '4rem' }}>
            <h2 style={{
              fontSize: device.isSmallScreen ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#B9975B'
            }}>
              Why Choose HTK Premium?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: device.isSmallScreen ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              "Direct connections without middleman fees",
              "Transparent £1 = 1 credit pricing system", 
              "Community profit sharing program",
              "Professional verification process",
              "Mobile-optimized platform",
              "24/7 community support"
            ].map((benefit, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: device.isSmallScreen ? '0.75rem' : '1rem',
                  backgroundColor: 'rgba(17, 17, 17, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(185, 151, 91, 0.1)'
                }}
              >
                <span style={{ color: '#B9975B', fontSize: '1.25rem' }}>✅</span>
                <span style={{ 
                  color: '#e5e5e5', 
                  fontWeight: '500',
                  fontSize: device.isSmallScreen ? '0.875rem' : '1rem'
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: device.isSmallScreen ? '2rem 1rem' : '3rem 1rem',
        borderTop: '1px solid rgba(185, 151, 91, 0.2)',
        backgroundColor: '#111111',
        textAlign: 'center'
      }}>
        <div style={styles.container}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: device.isSmallScreen ? '0.75rem' : '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              style={{ 
                height: device.isSmallScreen ? '36px' : '48px', 
                width: device.isSmallScreen ? '36px' : '48px' 
              }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span style={{
              fontSize: device.isSmallScreen ? '1.25rem' : '1.5rem',
              fontWeight: 'bold',
              color: '#B9975B'
            }}>
              HTK - Handy To Know
            </span>
          </div>
          <p style={{
            color: '#999999',
            marginBottom: '1rem',
            fontWeight: '500',
            fontSize: device.isSmallScreen ? '0.875rem' : '1rem'
          }}>
            Premium trade platform - Built by trades, for trades
          </p>
          <p style={{
            color: '#666666',
            fontSize: device.isSmallScreen ? '0.75rem' : '0.875rem',
            marginBottom: '1rem'
          }}>
            © 2024 HTK Platform. Live on handy2know.com
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#B9975B' }}>📧</span>
            <a 
              href="mailto:handy2knowteam@gmail.com" 
              style={{ 
                color: '#B9975B', 
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: device.isSmallScreen ? '0.875rem' : '1rem'
              }}
            >
              handy2knowteam@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
