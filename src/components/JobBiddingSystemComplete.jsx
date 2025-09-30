import React, { useState, useEffect } from 'react';

const JobBiddingSystemComplete = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userType, setUserType] = useState('customer'); // customer or tradesperson
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  // Sample job data
  useEffect(() => {
    const sampleJobs = [
      {
        id: 1,
        title: 'Kitchen Plumbing Installation',
        description: 'Need a qualified plumber to install new kitchen sink and connect dishwasher. All materials provided.',
        location: 'London, SW1',
        budget: '£150-£250',
        credits: 25,
        category: 'Plumbing',
        urgency: 'Within 1 week',
        postedBy: 'Sarah M.',
        postedDate: '2024-09-30',
        status: 'active',
        bids: [
          {
            id: 1,
            tradesperson: 'Mike Johnson',
            rating: 4.8,
            reviews: 127,
            amount: 180,
            message: 'I have 15 years experience in kitchen plumbing. Can complete this job within 2 days.',
            credentials: ['Gas Safe Registered', 'City & Guilds Level 3'],
            portfolio: ['kitchen1.jpg', 'kitchen2.jpg'],
            availability: 'Available this week'
          },
          {
            id: 2,
            tradesperson: 'David Smith',
            rating: 4.9,
            reviews: 89,
            amount: 220,
            message: 'Specialist in kitchen installations. All work guaranteed for 2 years.',
            credentials: ['CIPHE Member', '20+ Years Experience'],
            portfolio: ['plumb1.jpg', 'plumb2.jpg'],
            availability: 'Available tomorrow'
          }
        ]
      },
      {
        id: 2,
        title: 'Electrical Rewiring - 3 Bedroom House',
        description: 'Complete rewiring of 3-bedroom Victorian house. Need certified electrician with Part P qualification.',
        location: 'Manchester, M1',
        budget: '£2,500-£3,500',
        credits: 85,
        category: 'Electrical',
        urgency: 'Within 2 weeks',
        postedBy: 'John D.',
        postedDate: '2024-09-29',
        status: 'active',
        bids: [
          {
            id: 3,
            tradesperson: 'Electric Pro Ltd',
            rating: 4.9,
            reviews: 234,
            amount: 2800,
            message: 'NICEIC approved contractor. Full rewiring with certification included.',
            credentials: ['NICEIC Approved', 'Part P Qualified', 'ECS Gold Card'],
            portfolio: ['rewire1.jpg', 'rewire2.jpg'],
            availability: 'Can start next week'
          }
        ]
      },
      {
        id: 3,
        title: 'Garden Decking Installation',
        description: 'Install composite decking in back garden, approximately 4m x 3m area.',
        location: 'Birmingham, B1',
        budget: '£800-£1,200',
        credits: 45,
        category: 'Landscaping',
        urgency: 'Flexible timing',
        postedBy: 'Emma T.',
        postedDate: '2024-09-28',
        status: 'active',
        bids: []
      }
    ];
    setJobs(sampleJobs);
  }, []);

  const handleBidSubmit = (jobId) => {
    const newBid = {
      id: Date.now(),
      tradesperson: 'Your Business Name',
      rating: 4.7,
      reviews: 45,
      amount: parseInt(bidAmount),
      message: bidMessage,
      credentials: ['Verified Professional', 'HTK Member'],
      portfolio: ['work1.jpg', 'work2.jpg'],
      availability: 'Available immediately'
    };

    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, bids: [...job.bids, newBid] }
        : job
    ));

    setBidAmount('');
    setBidMessage('');
    setShowBidForm(false);
    alert('Bid submitted successfully!');
  };

  const acceptBid = (jobId, bidId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'accepted', acceptedBid: bidId }
        : job
    ));
    alert('Bid accepted! The tradesperson has been notified.');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#4CAF50';
      case 'accepted': return '#FF9800';
      case 'in_progress': return '#2196F3';
      case 'completed': return '#9C27B0';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Open for Bids';
      case 'accepted': return 'Bid Accepted';
      case 'in_progress': return 'Work in Progress';
      case 'completed': return 'Completed';
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
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              color: '#B9975B',
              fontSize: '32px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Job Bidding System</h1>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Connect with skilled professionals • Fair pricing • No commission fees</p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button
              onClick={() => setUserType('customer')}
              style={{
                padding: '10px 20px',
                backgroundColor: userType === 'customer' ? '#B9975B' : 'transparent',
                color: userType === 'customer' ? '#000' : '#B9975B',
                border: '1px solid #B9975B',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Customer View
            </button>
            <button
              onClick={() => setUserType('tradesperson')}
              style={{
                padding: '10px 20px',
                backgroundColor: userType === 'tradesperson' ? '#B9975B' : 'transparent',
                color: userType === 'tradesperson' ? '#000' : '#B9975B',
                border: '1px solid #B9975B',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Tradesperson View
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedJob ? '1fr 1fr' : '1fr',
          gap: '30px'
        }}>
          {/* Jobs Column */}
          <div>
            <h2 style={{
              color: '#fff',
              fontSize: '24px',
              marginBottom: '20px'
            }}>Available Jobs</h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  style={{
                    backgroundColor: selectedJob?.id === job.id ? '#222' : '#111',
                    border: selectedJob?.id === job.id ? '2px solid #B9975B' : '1px solid #333',
                    borderRadius: '15px',
                    padding: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div>
                      <h3 style={{
                        color: '#B9975B',
                        fontSize: '20px',
                        marginBottom: '5px',
                        fontWeight: 'bold'
                      }}>{job.title}</h3>
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        margin: 0
                      }}>Posted by {job.postedBy} • {job.location}</p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{
                        backgroundColor: getStatusColor(job.status),
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {getStatusText(job.status)}
                      </span>
                      
                      <div style={{
                        backgroundColor: '#B9975B',
                        color: '#000',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {job.bids.length} Bid{job.bids.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#fff',
                    fontSize: '16px',
                    marginBottom: '15px',
                    lineHeight: '1.5'
                  }}>{job.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>Budget: {job.budget}</span>
                      
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>Credits: {job.credits}</span>
                      
                      <span style={{
                        color: '#ccc',
                        fontSize: '14px'
                      }}>Category: {job.category}</span>
                    </div>
                    
                    <span style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>{job.urgency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details Column */}
          {selectedJob && (
            <div>
              <h2 style={{
                color: '#fff',
                fontSize: '24px',
                marginBottom: '20px'
              }}>Job Details & Bids</h2>
              
              <div style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                border: '1px solid #333',
                overflow: 'hidden'
              }}>
                {/* Job Header */}
                <div style={{
                  padding: '25px',
                  borderBottom: '1px solid #333'
                }}>
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '24px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>{selectedJob.title}</h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>LOCATION</p>
                      <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>{selectedJob.location}</p>
                    </div>
                    <div>
                      <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>BUDGET</p>
                      <p style={{ color: '#B9975B', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>{selectedJob.budget}</p>
                    </div>
                    <div>
                      <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>CREDITS</p>
                      <p style={{ color: '#4CAF50', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>{selectedJob.credits}</p>
                    </div>
                    <div>
                      <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>URGENCY</p>
                      <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>{selectedJob.urgency}</p>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    margin: 0
                  }}>{selectedJob.description}</p>
                </div>

                {/* Bids Section */}
                <div style={{ padding: '25px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{
                      color: '#fff',
                      fontSize: '20px',
                      margin: 0,
                      fontWeight: 'bold'
                    }}>Bids ({selectedJob.bids.length})</h4>
                    
                    {userType === 'tradesperson' && selectedJob.status === 'active' && (
                      <button
                        onClick={() => setShowBidForm(!showBidForm)}
                        style={{
                          padding: '8px 16px',
                          background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                          border: 'none',
                          borderRadius: '5px',
                          color: '#000',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {showBidForm ? 'Cancel' : 'Place Bid'}
                      </button>
                    )}
                  </div>

                  {/* Bid Form */}
                  {showBidForm && userType === 'tradesperson' && (
                    <div style={{
                      backgroundColor: '#222',
                      padding: '20px',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      border: '1px solid #B9975B'
                    }}>
                      <h5 style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        marginBottom: '15px',
                        fontWeight: 'bold'
                      }}>Place Your Bid</h5>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{
                          display: 'block',
                          color: '#ccc',
                          fontSize: '14px',
                          marginBottom: '5px'
                        }}>Bid Amount (£)</label>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#333',
                            border: '1px solid #555',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                          placeholder="Enter your bid amount"
                        />
                      </div>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{
                          display: 'block',
                          color: '#ccc',
                          fontSize: '14px',
                          marginBottom: '5px'
                        }}>Message to Customer</label>
                        <textarea
                          value={bidMessage}
                          onChange={(e) => setBidMessage(e.target.value)}
                          style={{
                            width: '100%',
                            height: '80px',
                            padding: '10px',
                            backgroundColor: '#333',
                            border: '1px solid #555',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '14px',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                          placeholder="Explain why you're the best choice for this job..."
                        />
                      </div>
                      
                      <button
                        onClick={() => handleBidSubmit(selectedJob.id)}
                        disabled={!bidAmount || !bidMessage}
                        style={{
                          padding: '10px 20px',
                          background: bidAmount && bidMessage 
                            ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)' 
                            : '#666',
                          border: 'none',
                          borderRadius: '5px',
                          color: bidAmount && bidMessage ? '#000' : '#ccc',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: bidAmount && bidMessage ? 'pointer' : 'not-allowed'
                        }}
                      >
                        Submit Bid
                      </button>
                    </div>
                  )}

                  {/* Bids List */}
                  {selectedJob.bids.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '40px',
                      color: '#888'
                    }}>
                      <p style={{ fontSize: '18px', marginBottom: '10px' }}>No bids yet</p>
                      <p style={{ fontSize: '14px', margin: 0 }}>Be the first to bid on this job!</p>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px'
                    }}>
                      {selectedJob.bids.map((bid) => (
                        <div
                          key={bid.id}
                          style={{
                            backgroundColor: '#222',
                            padding: '20px',
                            borderRadius: '10px',
                            border: selectedJob.acceptedBid === bid.id ? '2px solid #4CAF50' : '1px solid #333'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '15px',
                            flexWrap: 'wrap',
                            gap: '10px'
                          }}>
                            <div>
                              <h5 style={{
                                color: '#B9975B',
                                fontSize: '18px',
                                marginBottom: '5px',
                                fontWeight: 'bold'
                              }}>{bid.tradesperson}</h5>
                              
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginBottom: '10px'
                              }}>
                                <span style={{
                                  color: '#FFD700',
                                  fontSize: '14px'
                                }}>⭐ {bid.rating} ({bid.reviews} reviews)</span>
                                
                                <span style={{
                                  color: '#4CAF50',
                                  fontSize: '14px',
                                  fontWeight: 'bold'
                                }}>£{bid.amount}</span>
                              </div>
                              
                              <div style={{
                                display: 'flex',
                                gap: '10px',
                                flexWrap: 'wrap',
                                marginBottom: '10px'
                              }}>
                                {bid.credentials.map((cred, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      backgroundColor: '#B9975B',
                                      color: '#000',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      fontSize: '11px',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    {cred}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {userType === 'customer' && selectedJob.status === 'active' && (
                              <button
                                onClick={() => acceptBid(selectedJob.id, bid.id)}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#4CAF50',
                                  border: 'none',
                                  borderRadius: '5px',
                                  color: '#fff',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer'
                                }}
                              >
                                Accept Bid
                              </button>
                            )}
                          </div>
                          
                          <p style={{
                            color: '#ccc',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            marginBottom: '10px'
                          }}>{bid.message}</p>
                          
                          <p style={{
                            color: '#888',
                            fontSize: '12px',
                            margin: 0
                          }}>Availability: {bid.availability}</p>
                          
                          {selectedJob.acceptedBid === bid.id && (
                            <div style={{
                              marginTop: '15px',
                              padding: '10px',
                              backgroundColor: '#4CAF50',
                              borderRadius: '5px',
                              textAlign: 'center'
                            }}>
                              <p style={{
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                margin: 0
                              }}>✅ BID ACCEPTED</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBiddingSystemComplete;
