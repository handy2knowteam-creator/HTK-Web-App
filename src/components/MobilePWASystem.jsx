import React, { useState, useEffect } from 'react';

const MobilePWASystem = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [offlineData, setOfflineData] = useState({
    jobs: [],
    messages: [],
    calendar: []
  });
  const [syncStatus, setSyncStatus] = useState('synced');

  // PWA Installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      // Simulate sync
      setTimeout(() => setSyncStatus('synced'), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Push Notifications Setup
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // Service worker registration would go here
      console.log('Push notifications supported');
    }

    // Sample notifications
    const sampleNotifications = [
      {
        id: 1,
        title: 'New Job Alert',
        message: 'Kitchen plumbing job in your area - £180',
        timestamp: new Date().toISOString(),
        type: 'job',
        read: false
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Customer payment of £250 has been processed',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'payment',
        read: false
      },
      {
        id: 3,
        title: 'Forum Reply',
        message: 'Someone replied to your plumbing question',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'forum',
        read: true
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt();
      if (result.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('HTK Notifications Enabled', {
          body: 'You\'ll now receive job alerts and updates',
          icon: '/htk-logo-premium.png'
        });
      }
    }
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job': return '💼';
      case 'payment': return '💰';
      case 'forum': return '💬';
      case 'calendar': return '📅';
      default: return '🔔';
    }
  };

  const getSyncStatusColor = (status) => {
    switch(status) {
      case 'synced': return '#4CAF50';
      case 'syncing': return '#FF9800';
      case 'offline': return '#f44336';
      default: return '#666';
    }
  };

  const getSyncStatusText = (status) => {
    switch(status) {
      case 'synced': return 'All data synced';
      case 'syncing': return 'Syncing data...';
      case 'offline': return 'Offline mode';
      default: return 'Unknown';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
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
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>HTK Mobile App</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            marginBottom: '30px'
          }}>Progressive Web App • Offline functionality • Push notifications</p>
          
          {/* Status Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: isOnline ? '#4CAF50' : '#f44336',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              <span>{isOnline ? '🟢' : '🔴'}</span>
              {isOnline ? 'Online' : 'Offline'}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: getSyncStatusColor(syncStatus),
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              <span>🔄</span>
              {getSyncStatusText(syncStatus)}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: isInstalled ? '#4CAF50' : '#FF9800',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              <span>{isInstalled ? '📱' : '⬇️'}</span>
              {isInstalled ? 'App Installed' : 'Web Version'}
            </div>
          </div>
        </div>

        {/* PWA Installation */}
        {!isInstalled && installPrompt && (
          <div style={{
            backgroundColor: '#111',
            padding: '25px',
            borderRadius: '15px',
            border: '2px solid #B9975B',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>📱</div>
            
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>Install HTK App</h3>
            
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              marginBottom: '20px',
              lineHeight: '1.5'
            }}>
              Get the full HTK experience with offline access, push notifications, 
              and faster loading times. Install our app for the best mobile experience.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '25px'
            }}>
              {[
                { icon: '⚡', title: 'Faster Loading', desc: 'Instant access to your jobs' },
                { icon: '📴', title: 'Offline Access', desc: 'Work without internet' },
                { icon: '🔔', title: 'Push Notifications', desc: 'Never miss a job alert' },
                { icon: '🏠', title: 'Home Screen', desc: 'Quick access from home' }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#222',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feature.icon}</div>
                  <h4 style={{
                    color: '#B9975B',
                    fontSize: '14px',
                    marginBottom: '5px',
                    fontWeight: 'bold'
                  }}>{feature.title}</h4>
                  <p style={{
                    color: '#ccc',
                    fontSize: '12px',
                    margin: 0
                  }}>{feature.desc}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleInstallApp}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '10px',
                color: '#000',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Install HTK App
            </button>
          </div>
        )}

        {/* Push Notifications */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          border: '1px solid #333',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '25px',
            borderBottom: '1px solid #333'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                color: '#B9975B',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: 0
              }}>Push Notifications</h3>
              
              <button
                onClick={requestNotificationPermission}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  border: 'none',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Enable Notifications
              </button>
            </div>
            
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Stay updated with job alerts, payments, and forum activity</p>
          </div>
          
          <div style={{ padding: '25px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markNotificationRead(notification.id)}
                  style={{
                    backgroundColor: notification.read ? '#222' : '#333',
                    padding: '20px',
                    borderRadius: '10px',
                    border: notification.read ? '1px solid #333' : '2px solid #B9975B',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '15px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      marginTop: '5px'
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>{notification.title}</h4>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <span style={{
                            color: '#888',
                            fontSize: '12px'
                          }}>
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </span>
                          
                          {!notification.read && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#B9975B',
                              borderRadius: '50%'
                            }}></div>
                          )}
                        </div>
                      </div>
                      
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offline Functionality */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          border: '1px solid #333',
          marginBottom: '30px'
        }}>
          <div style={{
            padding: '25px',
            borderBottom: '1px solid #333'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>Offline Functionality</h3>
            
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              marginBottom: '20px'
            }}>Access your essential data even without internet connection</p>
          </div>
          
          <div style={{ padding: '25px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {[
                {
                  title: 'Job Queue',
                  icon: '💼',
                  description: 'View and manage your accepted jobs',
                  items: '5 jobs cached',
                  status: 'synced'
                },
                {
                  title: 'Customer Contacts',
                  icon: '👥',
                  description: 'Access customer information and history',
                  items: '23 contacts cached',
                  status: 'synced'
                },
                {
                  title: 'Calendar Events',
                  icon: '📅',
                  description: 'View your scheduled appointments',
                  items: '12 events cached',
                  status: 'synced'
                },
                {
                  title: 'Forum Posts',
                  icon: '💬',
                  description: 'Read saved forum discussions',
                  items: '8 posts cached',
                  status: 'synced'
                },
                {
                  title: 'Payment History',
                  icon: '💰',
                  description: 'View recent transaction records',
                  items: '15 payments cached',
                  status: 'synced'
                },
                {
                  title: 'Work Photos',
                  icon: '📸',
                  description: 'Access your work portfolio images',
                  items: '42 photos cached',
                  status: 'synced'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#222',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #333'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#333',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.icon}
                    </div>
                    
                    <div>
                      <h4 style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        marginBottom: '5px',
                        fontWeight: 'bold'
                      }}>{item.title}</h4>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          color: '#4CAF50',
                          fontSize: '12px'
                        }}>✓</span>
                        <span style={{
                          color: '#ccc',
                          fontSize: '12px'
                        }}>{item.items}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#888',
                    fontSize: '14px',
                    margin: 0
                  }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Features */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <div style={{
            padding: '25px',
            borderBottom: '1px solid #333'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>Mobile-Optimized Features</h3>
            
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Designed specifically for mobile professionals</p>
          </div>
          
          <div style={{ padding: '25px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {[
                {
                  title: 'Quick Job Actions',
                  icon: '⚡',
                  features: ['One-tap job acceptance', 'Swipe to complete tasks', 'Voice notes for updates']
                },
                {
                  title: 'Camera Integration',
                  icon: '📸',
                  features: ['Before/after photo capture', 'Receipt scanning', 'QR code job lookup']
                },
                {
                  title: 'GPS & Navigation',
                  icon: '🗺️',
                  features: ['Auto job location detection', 'Route optimization', 'Mileage tracking']
                },
                {
                  title: 'Touch Optimized',
                  icon: '👆',
                  features: ['Large touch targets', 'Gesture navigation', 'Thumb-friendly layout']
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#222',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #333'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      fontSize: '32px'
                    }}>{feature.icon}</div>
                    
                    <h4 style={{
                      color: '#B9975B',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{feature.title}</h4>
                  </div>
                  
                  <ul style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0,
                    paddingLeft: '20px'
                  }}>
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} style={{ marginBottom: '8px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePWASystem;
