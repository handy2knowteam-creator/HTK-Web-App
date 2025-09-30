import React, { useState, useEffect } from 'react';

const QuoteManagementSystem = () => {
  const [userType, setUserType] = useState('customer'); // customer or tradesperson
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample quotes data
  const sampleQuotes = [
    {
      id: 1,
      jobTitle: 'Bathroom Renovation',
      jobDescription: 'Complete bathroom renovation including new tiles, fixtures, and plumbing',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '07123 456789',
        address: '123 Oak Street, London SW1 2AB'
      },
      tradesperson: {
        name: 'Mike Thompson',
        company: 'Thompson Plumbing',
        email: 'mike@thompsonplumbing.co.uk',
        phone: '07987 654321',
        rating: 4.9,
        verified: true
      },
      quoteDetails: {
        totalPrice: 3500,
        laborCost: 2000,
        materialsCost: 1500,
        timeline: '5-7 days',
        startDate: '2024-02-15',
        warranty: '2 years',
        breakdown: [
          { item: 'Remove existing bathroom suite', cost: 300, type: 'labor' },
          { item: 'Install new plumbing', cost: 800, type: 'labor' },
          { item: 'Tile installation', cost: 600, type: 'labor' },
          { item: 'Fixture installation', cost: 300, type: 'labor' },
          { item: 'Bathroom suite (toilet, sink, bath)', cost: 1200, type: 'materials' },
          { item: 'Tiles and adhesive', cost: 300, type: 'materials' }
        ]
      },
      status: 'pending',
      submittedDate: '2024-01-15T10:30:00Z',
      responseDate: null,
      notes: 'Includes all materials and labor. Can start within 2 weeks of acceptance.',
      attachments: [
        { name: 'bathroom_design.pdf', size: '2.3 MB', type: 'pdf' },
        { name: 'material_samples.jpg', size: '1.8 MB', type: 'image' }
      ],
      messages: [
        {
          id: 1,
          sender: 'tradesperson',
          message: 'Hi Sarah, I\'ve prepared a detailed quote for your bathroom renovation. Please review and let me know if you have any questions.',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]
    },
    {
      id: 2,
      jobTitle: 'Kitchen Electrical Work',
      jobDescription: 'Install new electrical outlets and under-cabinet lighting in kitchen',
      customer: {
        name: 'David Wilson',
        email: 'david@example.com',
        phone: '07456 789123',
        address: '456 Pine Road, London N1 3CD'
      },
      tradesperson: {
        name: 'Sarah Williams',
        company: 'Williams Electrical',
        email: 'sarah@williamselectrical.co.uk',
        phone: '07789 123456',
        rating: 4.8,
        verified: true
      },
      quoteDetails: {
        totalPrice: 850,
        laborCost: 500,
        materialsCost: 350,
        timeline: '2 days',
        startDate: '2024-02-10',
        warranty: '1 year',
        breakdown: [
          { item: 'Install 4 new outlets', cost: 200, type: 'labor' },
          { item: 'Under-cabinet lighting installation', cost: 300, type: 'labor' },
          { item: 'Outlets and switches', cost: 150, type: 'materials' },
          { item: 'LED strip lights', cost: 200, type: 'materials' }
        ]
      },
      status: 'accepted',
      submittedDate: '2024-01-12T14:20:00Z',
      responseDate: '2024-01-13T09:15:00Z',
      notes: 'All work will be certified and compliant with current regulations.',
      attachments: [
        { name: 'electrical_plan.pdf', size: '1.5 MB', type: 'pdf' }
      ],
      messages: [
        {
          id: 1,
          sender: 'tradesperson',
          message: 'Quote ready for your kitchen electrical work. All materials included.',
          timestamp: '2024-01-12T14:20:00Z'
        },
        {
          id: 2,
          sender: 'customer',
          message: 'Looks good! When can you start?',
          timestamp: '2024-01-13T09:15:00Z'
        },
        {
          id: 3,
          sender: 'tradesperson',
          message: 'Great! I can start on February 10th as mentioned in the quote.',
          timestamp: '2024-01-13T09:30:00Z'
        }
      ]
    },
    {
      id: 3,
      jobTitle: 'Garden Decking',
      jobDescription: 'Build new wooden decking in back garden, approximately 4m x 3m',
      customer: {
        name: 'Emma Davis',
        email: 'emma@example.com',
        phone: '07321 654987',
        address: '789 Maple Avenue, London SE1 4EF'
      },
      tradesperson: {
        name: 'James Carter',
        company: 'Carter Carpentry',
        email: 'james@cartercarpentry.co.uk',
        phone: '07654 321987',
        rating: 4.7,
        verified: true
      },
      quoteDetails: {
        totalPrice: 2200,
        laborCost: 1200,
        materialsCost: 1000,
        timeline: '3-4 days',
        startDate: '2024-02-20',
        warranty: '5 years',
        breakdown: [
          { item: 'Ground preparation', cost: 300, type: 'labor' },
          { item: 'Frame construction', cost: 400, type: 'labor' },
          { item: 'Decking installation', cost: 500, type: 'labor' },
          { item: 'Pressure-treated timber', cost: 800, type: 'materials' },
          { item: 'Fixings and hardware', cost: 200, type: 'materials' }
        ]
      },
      status: 'rejected',
      submittedDate: '2024-01-10T16:45:00Z',
      responseDate: '2024-01-14T11:20:00Z',
      notes: 'Premium quality pressure-treated timber with 5-year warranty.',
      rejectionReason: 'Budget constraints - looking for more affordable option',
      attachments: [
        { name: 'decking_design.jpg', size: '3.2 MB', type: 'image' },
        { name: 'timber_specifications.pdf', size: '1.1 MB', type: 'pdf' }
      ],
      messages: [
        {
          id: 1,
          sender: 'tradesperson',
          message: 'Here\'s your quote for the garden decking project. Using premium materials for longevity.',
          timestamp: '2024-01-10T16:45:00Z'
        },
        {
          id: 2,
          sender: 'customer',
          message: 'Thank you for the detailed quote. Unfortunately, it\'s above our budget. Do you have any more affordable options?',
          timestamp: '2024-01-14T11:20:00Z'
        }
      ]
    }
  ];

  useEffect(() => {
    setQuotes(sampleQuotes);
  }, []);

  const getFilteredQuotes = () => {
    let filtered = [...quotes];

    if (filter !== 'all') {
      filtered = filtered.filter(quote => quote.status === filter);
    }

    // Sort quotes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        case 'price':
          return b.quoteDetails.totalPrice - a.quoteDetails.totalPrice;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'accepted':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'expired':
        return '#666';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'accepted':
        return '✅';
      case 'rejected':
        return '❌';
      case 'expired':
        return '⏰';
      default:
        return '📄';
    }
  };

  const handleQuoteAction = (quoteId, action, reason = '') => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote => {
        if (quote.id === quoteId) {
          const updatedQuote = {
            ...quote,
            status: action,
            responseDate: new Date().toISOString()
          };

          if (action === 'rejected' && reason) {
            updatedQuote.rejectionReason = reason;
          }

          return updatedQuote;
        }
        return quote;
      })
    );

    // Close modal after action
    setSelectedQuote(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredQuotes = getFilteredQuotes();

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
            📋 Quote Management
          </h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px'
          }}>
            Manage all your quotes in one place
          </p>
        </div>

        {/* User Type Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#111',
            borderRadius: '10px',
            padding: '4px',
            display: 'flex'
          }}>
            <button
              onClick={() => setUserType('customer')}
              style={{
                padding: '10px 20px',
                backgroundColor: userType === 'customer' ? '#B9975B' : 'transparent',
                color: userType === 'customer' ? '#000' : '#ccc',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              👤 Customer View
            </button>
            <button
              onClick={() => setUserType('tradesperson')}
              style={{
                padding: '10px 20px',
                backgroundColor: userType === 'tradesperson' ? '#B9975B' : 'transparent',
                color: userType === 'tradesperson' ? '#000' : '#ccc',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔧 Tradesperson View
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div style={{
          backgroundColor: '#111',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {/* Status Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '14px'
              }}>
                Filter:
              </span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Quotes</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Sort By */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '14px'
              }}>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Results Count */}
            <div style={{
              color: '#888',
              fontSize: '14px'
            }}>
              {filteredQuotes.length} quotes found
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {filteredQuotes.map(quote => (
            <div
              key={quote.id}
              onClick={() => setSelectedQuote(quote)}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                padding: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #333'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#B9975B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    {quote.jobTitle}
                  </h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>
                    {quote.jobDescription}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>
                      {userType === 'customer' ? 'From:' : 'To:'} {userType === 'customer' ? quote.tradesperson.name : quote.customer.name}
                    </div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>
                      📅 {formatDate(quote.submittedDate)}
                    </div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>
                      ⏱️ {quote.quoteDetails.timeline}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '10px'
                }}>
                  <div style={{
                    backgroundColor: getStatusColor(quote.status),
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {getStatusIcon(quote.status)}
                    {quote.status.toUpperCase()}
                  </div>
                  <div style={{
                    color: '#4CAF50',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(quote.quoteDetails.totalPrice)}
                  </div>
                </div>
              </div>

              {/* Quote Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                backgroundColor: '#222',
                padding: '15px',
                borderRadius: '10px'
              }}>
                <div>
                  <div style={{
                    color: '#888',
                    fontSize: '10px',
                    marginBottom: '4px'
                  }}>
                    LABOR
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(quote.quoteDetails.laborCost)}
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#888',
                    fontSize: '10px',
                    marginBottom: '4px'
                  }}>
                    MATERIALS
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(quote.quoteDetails.materialsCost)}
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#888',
                    fontSize: '10px',
                    marginBottom: '4px'
                  }}>
                    START DATE
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {new Date(quote.quoteDetails.startDate).toLocaleDateString('en-GB')}
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#888',
                    fontSize: '10px',
                    marginBottom: '4px'
                  }}>
                    WARRANTY
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {quote.quoteDetails.warranty}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {quote.status === 'pending' && userType === 'customer' && (
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuoteAction(quote.id, 'accepted');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Accept Quote
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuote(quote);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#F44336',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Decline Quote
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuotes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              📋
            </div>
            <h3 style={{
              fontSize: '24px',
              marginBottom: '10px'
            }}>
              No quotes found
            </h3>
            <p style={{
              fontSize: '16px'
            }}>
              {filter === 'all' ? 'No quotes available yet' : `No ${filter} quotes found`}
            </p>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          userType={userType}
          onClose={() => setSelectedQuote(null)}
          onAction={handleQuoteAction}
        />
      )}
    </div>
  );
};

// Quote Detail Modal Component
const QuoteDetailModal = ({ quote, userType, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'accepted':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'expired':
        return '#666';
      default:
        return '#666';
    }
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onAction(quote.id, 'rejected', rejectionReason);
      setShowRejectForm(false);
      setRejectionReason('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#111',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#666',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1001
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{
          padding: '30px 30px 20px 30px',
          borderBottom: '1px solid #333'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '15px'
          }}>
            <div>
              <h2 style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {quote.jobTitle}
              </h2>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                marginBottom: '10px'
              }}>
                {quote.jobDescription}
              </p>
              <div style={{
                color: '#888',
                fontSize: '14px'
              }}>
                Quote submitted: {formatDate(quote.submittedDate)}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '10px'
            }}>
              <div style={{
                backgroundColor: getStatusColor(quote.status),
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {quote.status.toUpperCase()}
              </div>
              <div style={{
                color: '#4CAF50',
                fontSize: '28px',
                fontWeight: 'bold'
              }}>
                {formatCurrency(quote.quoteDetails.totalPrice)}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{
            backgroundColor: '#222',
            padding: '15px',
            borderRadius: '10px'
          }}>
            <div style={{
              color: '#B9975B',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {userType === 'customer' ? 'Tradesperson Details:' : 'Customer Details:'}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px'
            }}>
              <div>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                  {userType === 'customer' ? quote.tradesperson.name : quote.customer.name}
                </div>
                {userType === 'customer' && quote.tradesperson.company && (
                  <div style={{ color: '#ccc', fontSize: '14px' }}>
                    {quote.tradesperson.company}
                  </div>
                )}
              </div>
              <div>
                <div style={{ color: '#ccc', fontSize: '14px' }}>
                  📧 {userType === 'customer' ? quote.tradesperson.email : quote.customer.email}
                </div>
                <div style={{ color: '#ccc', fontSize: '14px' }}>
                  📞 {userType === 'customer' ? quote.tradesperson.phone : quote.customer.phone}
                </div>
              </div>
              {userType === 'tradesperson' && (
                <div>
                  <div style={{ color: '#ccc', fontSize: '14px' }}>
                    📍 {quote.customer.address}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #333',
          padding: '0 30px'
        }}>
          {['details', 'breakdown', 'messages', 'attachments'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '15px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #B9975B' : '2px solid transparent',
                color: activeTab === tab ? '#B9975B' : '#ccc',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '30px' }}>
          {activeTab === 'details' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    💰 Total Cost
                  </div>
                  <div style={{
                    color: '#4CAF50',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(quote.quoteDetails.totalPrice)}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    ⏱️ Timeline
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {quote.quoteDetails.timeline}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    📅 Start Date
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {new Date(quote.quoteDetails.startDate).toLocaleDateString('en-GB')}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    🛡️ Warranty
                  </div>
                  <div style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {quote.quoteDetails.warranty}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {quote.notes && (
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    📝 Additional Notes
                  </h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    lineHeight: '1.5'
                  }}>
                    {quote.notes}
                  </p>
                </div>
              )}

              {/* Rejection Reason */}
              {quote.status === 'rejected' && quote.rejectionReason && (
                <div style={{
                  backgroundColor: '#2D1B1B',
                  border: '1px solid #F44336',
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <h3 style={{
                    color: '#F44336',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    ❌ Rejection Reason
                  </h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    lineHeight: '1.5'
                  }}>
                    {quote.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div>
              <h3 style={{
                color: '#B9975B',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                💰 Cost Breakdown
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {quote.quoteDetails.breakdown.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#222',
                      padding: '15px 20px',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{
                        backgroundColor: item.type === 'labor' ? '#4CAF50' : '#FF9800',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        {item.type.toUpperCase()}
                      </span>
                      <span style={{
                        color: '#fff',
                        fontSize: '16px'
                      }}>
                        {item.item}
                      </span>
                    </div>
                    <span style={{
                      color: '#4CAF50',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(item.cost)}
                    </span>
                  </div>
                ))}
                
                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#B9975B',
                  color: '#000',
                  padding: '20px',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    TOTAL
                  </span>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(quote.quoteDetails.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h3 style={{
                color: '#B9975B',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                💬 Messages
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {quote.messages.map(message => (
                  <div
                    key={message.id}
                    style={{
                      backgroundColor: message.sender === userType ? '#B9975B' : '#222',
                      color: message.sender === userType ? '#000' : '#fff',
                      padding: '15px 20px',
                      borderRadius: '15px',
                      alignSelf: message.sender === userType ? 'flex-end' : 'flex-start',
                      maxWidth: '70%'
                    }}
                  >
                    <div style={{
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      {message.message}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      opacity: 0.7
                    }}>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div>
              <h3 style={{
                color: '#B9975B',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                📎 Attachments
              </h3>
              
              {quote.attachments.length > 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {quote.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#222',
                        padding: '15px 20px',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{
                          fontSize: '20px'
                        }}>
                          {attachment.type === 'pdf' ? '📄' : '🖼️'}
                        </span>
                        <div>
                          <div style={{
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}>
                            {attachment.name}
                          </div>
                          <div style={{
                            color: '#888',
                            fontSize: '12px'
                          }}>
                            {attachment.size}
                          </div>
                        </div>
                      </div>
                      <button style={{
                        padding: '8px 15px',
                        backgroundColor: '#B9975B',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#000',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📎</div>
                  <p>No attachments</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {quote.status === 'pending' && userType === 'customer' && (
          <div style={{
            padding: '20px 30px 30px 30px',
            borderTop: '1px solid #333'
          }}>
            {!showRejectForm ? (
              <div style={{
                display: 'flex',
                gap: '15px'
              }}>
                <button
                  onClick={() => onAction(quote.id, 'accepted')}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ✅ Accept Quote
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#F44336',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ❌ Decline Quote
                </button>
              </div>
            ) : (
              <div>
                <h4 style={{
                  color: '#F44336',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Please provide a reason for declining:
                </h4>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter your reason for declining this quote..."
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '15px',
                    backgroundColor: '#222',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'vertical',
                    marginBottom: '15px'
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: rejectionReason.trim() ? '#F44336' : '#666',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: rejectionReason.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Confirm Decline
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectForm(false);
                      setRejectionReason('');
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#666',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteManagementSystem;
