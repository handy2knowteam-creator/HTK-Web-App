import React, { useState, useEffect } from 'react';

const SecureAdminSystem = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [tradespeople, setTradespeople] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [systemStats, setSystemStats] = useState({});

  // Security check on component mount
  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = () => {
    // Check if user is authenticated admin
    const adminAuth = localStorage.getItem('htkAdminAuth');
    const sessionStart = localStorage.getItem('htkAdminSession');
    const currentTime = new Date().getTime();
    
    // Session timeout after 2 hours
    if (adminAuth === 'true' && sessionStart && (currentTime - parseInt(sessionStart)) < 7200000) {
      setAuthenticated(true);
      loadAllData();
    } else {
      // Clear any existing auth
      localStorage.removeItem('htkAdminAuth');
      localStorage.removeItem('htkAdminSession');
      setAuthenticated(false);
    }
    setLoading(false);
  };

  const loadAllData = () => {
    // Load real data from localStorage or API
    const storedCustomers = JSON.parse(localStorage.getItem('htkCustomers') || '[]');
    const storedTradespeople = JSON.parse(localStorage.getItem('htkTradespeople') || '[]');
    const storedJobs = JSON.parse(localStorage.getItem('htkJobs') || '[]');

    // Add mock data if empty (for demonstration)
    if (storedCustomers.length === 0) {
      const mockCustomers = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '07123456789',
          location: 'Manchester, M1 1AA',
          registrationDate: '2024-01-15',
          jobsPosted: 3,
          totalSpent: '£450',
          status: 'Active',
          lastLogin: '2024-01-20'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '07987654321',
          location: 'Birmingham, B1 2BB',
          registrationDate: '2024-01-18',
          jobsPosted: 1,
          totalSpent: '£150',
          status: 'Active',
          lastLogin: '2024-01-19'
        },
        {
          id: 3,
          name: 'Mike Wilson',
          email: 'mike.wilson@email.com',
          phone: '07555123456',
          location: 'Leeds, LS1 3CC',
          registrationDate: '2024-01-20',
          jobsPosted: 2,
          totalSpent: '£320',
          status: 'Active',
          lastLogin: '2024-01-21'
        }
      ];
      setCustomers(mockCustomers);
      localStorage.setItem('htkCustomers', JSON.stringify(mockCustomers));
    } else {
      setCustomers(storedCustomers);
    }

    if (storedTradespeople.length === 0) {
      const mockTradespeople = [
        {
          id: 1,
          name: 'David Thompson',
          email: 'david.thompson@email.com',
          phone: '07111222333',
          trade: 'Plumber',
          location: 'Manchester, M2 4DD',
          registrationDate: '2024-01-10',
          verified: true,
          rating: 4.8,
          jobsCompleted: 15,
          totalEarned: '£2,400',
          status: 'Active',
          lastLogin: '2024-01-21',
          certifications: ['Gas Safe', 'City & Guilds'],
          businessName: 'Thompson Plumbing',
          insurance: 'Valid until 2025-01-10'
        },
        {
          id: 2,
          name: 'Emma Davies',
          email: 'emma.davies@email.com',
          phone: '07444555666',
          trade: 'Electrician',
          location: 'Birmingham, B3 5EE',
          registrationDate: '2024-01-12',
          verified: true,
          rating: 4.9,
          jobsCompleted: 22,
          totalEarned: '£3,200',
          status: 'Active',
          lastLogin: '2024-01-20',
          certifications: ['NICEIC', '18th Edition'],
          businessName: 'Davies Electrical',
          insurance: 'Valid until 2025-03-15'
        },
        {
          id: 3,
          name: 'James Wilson',
          email: 'james.wilson@email.com',
          phone: '07777888999',
          trade: 'Builder',
          location: 'Leeds, LS2 6FF',
          registrationDate: '2024-01-14',
          verified: false,
          rating: 4.6,
          jobsCompleted: 8,
          totalEarned: '£1,800',
          status: 'Pending Verification',
          lastLogin: '2024-01-19',
          certifications: ['CSCS Card'],
          businessName: 'Wilson Construction',
          insurance: 'Pending'
        }
      ];
      setTradespeople(mockTradespeople);
      localStorage.setItem('htkTradespeople', JSON.stringify(mockTradespeople));
    } else {
      setTradespeople(storedTradespeople);
    }

    // System statistics
    setSystemStats({
      totalCustomers: storedCustomers.length || 3,
      totalTradespeople: storedTradespeople.length || 3,
      totalJobs: storedJobs.length || 12,
      totalRevenue: '£4,250',
      activeUsers: 8,
      pendingVerifications: 1,
      todayRegistrations: 2,
      monthlyGrowth: '+15%'
    });
  };

  const exportData = (type) => {
    let data, filename;
    
    switch(type) {
      case 'customers':
        data = customers;
        filename = 'htk_customers.csv';
        break;
      case 'tradespeople':
        data = tradespeople;
        filename = 'htk_tradespeople.csv';
        break;
      case 'all':
        data = { customers, tradespeople, jobs, systemStats };
        filename = 'htk_complete_data.json';
        break;
      default:
        return;
    }

    const dataStr = type === 'all' ? JSON.stringify(data, null, 2) : convertToCSV(data);
    const dataBlob = new Blob([dataStr], { type: type === 'all' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTradespeople = tradespeople.filter(tradesperson =>
    tradesperson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tradesperson.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tradesperson.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tradesperson.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#B9975B'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
          <div style={{ fontSize: '18px' }}>Verifying Admin Access...</div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff4444'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</div>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Access Denied</div>
          <div style={{ fontSize: '14px', color: '#888' }}>Please log in through the admin portal</div>
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
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#111',
          borderRadius: '10px',
          border: '1px solid #333'
        }}>
          <div>
            <h1 style={{
              color: '#B9975B',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: 0
            }}>🔒 HTK Admin Dashboard</h1>
            <p style={{
              color: '#888',
              fontSize: '14px',
              margin: '5px 0 0 0'
            }}>Secure access - Administrator only</p>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button
              onClick={() => exportData('all')}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              📥 Export All Data
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('htkAdminAuth');
                localStorage.removeItem('htkAdminSession');
                setAuthenticated(false);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff4444',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚪 Secure Logout
            </button>
          </div>
        </div>

        {/* System Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { label: 'Total Customers', value: systemStats.totalCustomers, icon: '👥', color: '#4CAF50' },
            { label: 'Total Tradespeople', value: systemStats.totalTradespeople, icon: '🔧', color: '#2196F3' },
            { label: 'Total Jobs', value: systemStats.totalJobs, icon: '📋', color: '#FF9800' },
            { label: 'Total Revenue', value: systemStats.totalRevenue, icon: '💰', color: '#B9975B' },
            { label: 'Active Users', value: systemStats.activeUsers, icon: '🟢', color: '#4CAF50' },
            { label: 'Pending Verifications', value: systemStats.pendingVerifications, icon: '⏳', color: '#FF5722' },
            { label: 'Today Registrations', value: systemStats.todayRegistrations, icon: '📈', color: '#9C27B0' },
            { label: 'Monthly Growth', value: systemStats.monthlyGrowth, icon: '📊', color: '#00BCD4' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#111',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #333',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{
                color: stat.color,
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>{stat.value}</div>
              <div style={{
                color: '#888',
                fontSize: '14px'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {[
            { id: 'customers', label: '👥 Customers', count: customers.length },
            { id: 'tradespeople', label: '🔧 Tradespeople', count: tradespeople.length },
            { id: 'jobs', label: '📋 Jobs', count: jobs.length },
            { id: 'analytics', label: '📊 Analytics', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                backgroundColor: activeTab === tab.id ? '#B9975B' : '#222',
                color: activeTab === tab.id ? '#000' : '#fff',
                border: `1px solid ${activeTab === tab.id ? '#B9975B' : '#444'}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
              {tab.count !== null && (
                <span style={{
                  backgroundColor: activeTab === tab.id ? '#000' : '#B9975B',
                  color: activeTab === tab.id ? '#B9975B' : '#000',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        {(activeTab === 'customers' || activeTab === 'tradespeople') && (
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => exportData(activeTab)}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              📥 Export {activeTab}
            </button>
          </div>
        )}

        {/* Content Area */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          border: '1px solid #333',
          overflow: 'hidden'
        }}>
          {activeTab === 'customers' && (
            <div>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #333',
                backgroundColor: '#1a1a1a'
              }}>
                <h2 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: 0
                }}>Customer Database ({filteredCustomers.length})</h2>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#222' }}>
                      {['Name', 'Email', 'Phone', 'Location', 'Registered', 'Jobs Posted', 'Total Spent', 'Status', 'Last Login'].map(header => (
                        <th key={header} style={{
                          padding: '15px',
                          textAlign: 'left',
                          color: '#B9975B',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #333'
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map(customer => (
                      <tr key={customer.id} style={{
                        borderBottom: '1px solid #333'
                      }}>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>
                          {customer.name}
                        </td>
                        <td style={{ padding: '15px', color: '#4CAF50' }}>
                          <a href={`mailto:${customer.email}`} style={{ color: '#4CAF50', textDecoration: 'none' }}>
                            {customer.email}
                          </a>
                        </td>
                        <td style={{ padding: '15px', color: '#2196F3' }}>
                          <a href={`tel:${customer.phone}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                            {customer.phone}
                          </a>
                        </td>
                        <td style={{ padding: '15px', color: '#ccc' }}>{customer.location}</td>
                        <td style={{ padding: '15px', color: '#ccc' }}>{customer.registrationDate}</td>
                        <td style={{ padding: '15px', color: '#FF9800', fontWeight: 'bold' }}>{customer.jobsPosted}</td>
                        <td style={{ padding: '15px', color: '#4CAF50', fontWeight: 'bold' }}>{customer.totalSpent}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            backgroundColor: customer.status === 'Active' ? '#4CAF50' : '#FF5722',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {customer.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', color: '#888' }}>{customer.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tradespeople' && (
            <div>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #333',
                backgroundColor: '#1a1a1a'
              }}>
                <h2 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: 0
                }}>Tradesperson Database ({filteredTradespeople.length})</h2>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#222' }}>
                      {['Name', 'Email', 'Phone', 'Trade', 'Location', 'Business', 'Verified', 'Rating', 'Jobs Done', 'Earned', 'Status'].map(header => (
                        <th key={header} style={{
                          padding: '15px',
                          textAlign: 'left',
                          color: '#B9975B',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #333'
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTradespeople.map(tradesperson => (
                      <tr key={tradesperson.id} style={{
                        borderBottom: '1px solid #333'
                      }}>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>
                          {tradesperson.name}
                        </td>
                        <td style={{ padding: '15px', color: '#4CAF50' }}>
                          <a href={`mailto:${tradesperson.email}`} style={{ color: '#4CAF50', textDecoration: 'none' }}>
                            {tradesperson.email}
                          </a>
                        </td>
                        <td style={{ padding: '15px', color: '#2196F3' }}>
                          <a href={`tel:${tradesperson.phone}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                            {tradesperson.phone}
                          </a>
                        </td>
                        <td style={{ padding: '15px', color: '#FF9800', fontWeight: 'bold' }}>{tradesperson.trade}</td>
                        <td style={{ padding: '15px', color: '#ccc' }}>{tradesperson.location}</td>
                        <td style={{ padding: '15px', color: '#ccc' }}>{tradesperson.businessName}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            backgroundColor: tradesperson.verified ? '#4CAF50' : '#FF5722',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {tradesperson.verified ? '✓ VERIFIED' : '⏳ PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '15px', color: '#FFD700', fontWeight: 'bold' }}>
                          ⭐ {tradesperson.rating}
                        </td>
                        <td style={{ padding: '15px', color: '#2196F3', fontWeight: 'bold' }}>{tradesperson.jobsCompleted}</td>
                        <td style={{ padding: '15px', color: '#4CAF50', fontWeight: 'bold' }}>{tradesperson.totalEarned}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            backgroundColor: tradesperson.status === 'Active' ? '#4CAF50' : '#FF9800',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {tradesperson.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>Advanced Analytics</h2>
              <p style={{
                color: '#888',
                fontSize: '16px',
                marginBottom: '30px'
              }}>Detailed analytics and reporting tools coming soon</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {[
                  'User Growth Trends',
                  'Revenue Analytics',
                  'Job Completion Rates',
                  'Geographic Distribution',
                  'Popular Trade Categories',
                  'Customer Satisfaction'
                ].map(feature => (
                  <div
                    key={feature}
                    style={{
                      backgroundColor: '#222',
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid #333'
                    }}
                  >
                    <div style={{
                      color: '#B9975B',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureAdminSystem;
