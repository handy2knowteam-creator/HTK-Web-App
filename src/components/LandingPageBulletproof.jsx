import React from 'react'

export default function LandingPageBulletproof() {
  const handleCustomerClick = () => {
    window.location.href = '/register/customer'
  }

  const handleTradeClick = () => {
    window.location.href = '/register/tradesperson'
  }

  const handleAdminClick = () => {
    window.location.href = '/admin/login'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#111111',
        borderBottom: '1px solid rgba(185, 151, 91, 0.2)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              style={{ height: '48px', width: '48px' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div>
              <h1 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#B9975B',
                margin: 0
              }}>
                HTK
              </h1>
              <p style={{ 
                color: '#999999', 
                fontSize: '0.875rem',
                margin: 0
              }}>
                Handy To Know
              </p>
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <button 
              onClick={() => window.location.href = '/how-it-works'}
              style={{
                background: 'none',
                border: 'none',
                color: '#cccccc',
                cursor: 'pointer',
                fontSize: '1rem'
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
                fontSize: '1rem'
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
                fontSize: '1rem'
              }}
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(185, 151, 91, 0.2)',
            border: '1px solid rgba(185, 151, 91, 0.3)',
            borderRadius: '25px',
            marginBottom: '2rem'
          }}>
            <span style={{ color: '#B9975B', fontWeight: '600' }}>
              ⭐ Premium Trade Platform
            </span>
          </div>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            <span style={{ color: '#ffffff' }}>Built by Trades,</span>
            <br />
            <span style={{ color: '#B9975B' }}>for Trades</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#cccccc',
            marginBottom: '3rem',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto 3rem auto'
          }}>
            The premium community-first platform connecting skilled professionals with customers. 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Zero commission fees.</span> 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Fair pricing.</span> 
            <span style={{ color: '#B9975B', fontWeight: '600' }}> Community profit sharing.</span>
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
            <button
              onClick={handleCustomerClick}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#B9975B',
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                minWidth: '300px',
                justifyContent: 'center'
              }}
            >
              👥 Find Premium Tradespeople →
            </button>
            
            <button
              onClick={handleTradeClick}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '2px solid #B9975B',
                color: '#B9975B',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                minWidth: '300px',
                justifyContent: 'center'
              }}
            >
              🔨 Join as Professional Trade →
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
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
                  padding: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#B9975B',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: '#cccccc',
                  fontSize: '0.875rem',
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
        padding: '5rem 1rem',
        backgroundColor: 'rgba(17, 17, 17, 0.5)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#B9975B'
            }}>
              Premium Platform Features
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#cccccc',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Experience the difference of a platform built by industry professionals who understand your needs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
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
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#B9975B',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cccccc',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#B9975B'
            }}>
              Why Choose HTK Premium?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
                  padding: '1rem',
                  backgroundColor: 'rgba(17, 17, 17, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(185, 151, 91, 0.1)'
                }}
              >
                <span style={{ color: '#B9975B', fontSize: '1.5rem' }}>✅</span>
                <span style={{ color: '#e5e5e5', fontWeight: '500' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1rem',
        borderTop: '1px solid rgba(185, 151, 91, 0.2)',
        backgroundColor: '#111111',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              style={{ height: '48px', width: '48px' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#B9975B'
            }}>
              HTK - Handy To Know
            </span>
          </div>
          <p style={{
            color: '#999999',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            Premium trade platform - Built by trades, for trades
          </p>
          <p style={{
            color: '#666666',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            © 2024 HTK Platform. Live on handy2know.com
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: '#B9975B' }}>📧</span>
            <a 
              href="mailto:handy2knowteam@gmail.com" 
              style={{ 
                color: '#B9975B', 
                textDecoration: 'none',
                fontWeight: '500'
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
