import React, { useState, useEffect } from 'react';

const PeerEndorsementSystem = () => {
  const [activeTab, setActiveTab] = useState('endorsements');
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [endorsements, setEndorsements] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [myEndorsements, setMyEndorsements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  useEffect(() => {
    const sampleEndorsements = [
      {
        id: 1,
        endorser: 'Mike Johnson',
        endorserTitle: 'Master Electrician',
        endorserRating: 4.9,
        endorserBadges: ['NICEIC Approved', '20+ Years'],
        endorsee: 'Sarah Williams',
        endorseeTitle: 'Plumbing Specialist',
        skill: 'Emergency Response',
        message: 'Sarah saved my customer when their boiler failed during a kitchen renovation. Her quick response and professional work kept the project on track. Highly recommend for emergency plumbing work.',
        date: '2024-10-25',
        jobValue: 450,
        verified: true,
        likes: 12,
        community: 'London Trades Network'
      },
      {
        id: 2,
        endorser: 'David Chen',
        endorserTitle: 'Certified Gas Engineer',
        endorserRating: 4.8,
        endorserBadges: ['Gas Safe', 'Boiler Specialist'],
        endorsee: 'Tom Roberts',
        endorseeTitle: 'Heating Engineer',
        skill: 'System Design',
        message: 'Tom designed an innovative heating solution for a difficult Victorian conversion. His technical knowledge and attention to detail were exceptional. Great collaboration on this complex project.',
        date: '2024-10-20',
        jobValue: 2800,
        verified: true,
        likes: 8,
        community: 'UK Heating Professionals'
      },
      {
        id: 3,
        endorser: 'Lisa Thompson',
        endorserTitle: 'Kitchen Specialist',
        endorserRating: 4.9,
        endorserBadges: ['City & Guilds', 'Design Expert'],
        endorsee: 'James Wilson',
        endorseeTitle: 'Carpenter',
        skill: 'Precision Work',
        message: 'James created beautiful custom cabinets for my kitchen project. His craftsmanship is outstanding and he works well with other trades. Perfect collaboration and timing.',
        date: '2024-10-18',
        jobValue: 1200,
        verified: true,
        likes: 15,
        community: 'Cotswold Craftsmen'
      }
    ];
    setEndorsements(sampleEndorsements);

    const sampleCommunities = [
      {
        id: 'london-trades',
        name: 'London Trades Network',
        members: 1247,
        category: 'Regional',
        description: 'Professional tradespeople serving Greater London area',
        moderators: ['Mike Johnson', 'Sarah Williams'],
        recentActivity: '2 hours ago',
        badges: ['Verified Members', 'Active Community'],
        specialties: ['Emergency Response', 'Commercial Work', 'Residential']
      },
      {
        id: 'uk-heating',
        name: 'UK Heating Professionals',
        members: 892,
        category: 'Specialist',
        description: 'Gas engineers, heating specialists, and boiler experts',
        moderators: ['David Chen', 'Emma Davis'],
        recentActivity: '1 hour ago',
        badges: ['Gas Safe Verified', 'Technical Excellence'],
        specialties: ['Boiler Installation', 'System Design', 'Maintenance']
      },
      {
        id: 'cotswold-craftsmen',
        name: 'Cotswold Craftsmen',
        members: 156,
        category: 'Regional',
        description: 'Traditional craftsmen and modern tradespeople in the Cotswolds',
        moderators: ['James Wilson', 'Lisa Thompson'],
        recentActivity: '30 minutes ago',
        badges: ['Heritage Skills', 'Quality Focus'],
        specialties: ['Restoration', 'Custom Work', 'Traditional Methods']
      },
      {
        id: 'ev-installers',
        name: 'UK EV Installers',
        members: 423,
        category: 'Specialist',
        description: 'Electric vehicle charging point installation specialists',
        moderators: ['Alex Brown', 'Sophie Green'],
        recentActivity: '45 minutes ago',
        badges: ['Future Ready', 'Green Technology'],
        specialties: ['EV Charging', 'Smart Systems', 'Renewable Energy']
      },
      {
        id: 'bathroom-specialists',
        name: 'Bathroom Renovation Experts',
        members: 678,
        category: 'Specialist',
        description: 'Specialists in bathroom design, installation, and renovation',
        moderators: ['Rachel White', 'Mark Taylor'],
        recentActivity: '1 hour ago',
        badges: ['Design Excellence', 'Waterproofing Experts'],
        specialties: ['Wet Rooms', 'Luxury Bathrooms', 'Accessibility']
      }
    ];
    setCommunities(sampleCommunities);

    const sampleMyEndorsements = [
      {
        id: 1,
        skill: 'Emergency Response',
        count: 8,
        recentEndorser: 'Mike Johnson',
        averageRating: 4.9,
        totalJobValue: 3200
      },
      {
        id: 2,
        skill: 'Customer Service',
        count: 12,
        recentEndorser: 'Sarah Williams',
        averageRating: 4.8,
        totalJobValue: 5600
      },
      {
        id: 3,
        skill: 'Technical Expertise',
        count: 6,
        recentEndorser: 'David Chen',
        averageRating: 4.9,
        totalJobValue: 8900
      }
    ];
    setMyEndorsements(sampleMyEndorsements);
  }, []);

  const filteredEndorsements = endorsements.filter(endorsement => {
    const matchesSearch = endorsement.endorser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.endorsee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommunity = selectedCommunity === 'all' || endorsement.community.toLowerCase().includes(selectedCommunity.toLowerCase());
    return matchesSearch && matchesCommunity;
  });

  const filteredCommunities = communities.filter(community => {
    return community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           community.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const endorseColleague = (endorsementId) => {
    alert('Endorsement added! Your professional recommendation has been recorded and will boost their profile visibility.');
  };

  const joinCommunity = (communityId) => {
    alert('Welcome to the community! You can now participate in discussions, share knowledge, and connect with local professionals.');
  };

  const createEndorsement = () => {
    alert('Endorsement form opened! You can now endorse a colleague for their professional skills and collaboration.');
  };

  if (activeTab === 'communities') {
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
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>Micro-Communities</h1>
            <p style={{
              color: '#ccc',
              fontSize: '18px',
              margin: 0
            }}>Join specialized groups by area or trade • Connect with local professionals • Share knowledge</p>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setActiveTab('endorsements')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '1px solid #555',
                borderRadius: '8px',
                color: '#ccc',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ← Back to Endorsements
            </button>
          </div>

          {/* Search and Filter */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '30px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '12px',
                backgroundColor: '#222',
                border: '1px solid #555',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              style={{
                padding: '12px',
                backgroundColor: '#222',
                border: '1px solid #555',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            >
              <option value="all">All Categories</option>
              <option value="regional">Regional</option>
              <option value="specialist">Specialist</option>
            </select>
          </div>

          {/* Communities Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {filteredCommunities.map((community) => (
              <div
                key={community.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: '1px solid #333',
                  padding: '25px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '20px',
                      marginBottom: '8px',
                      fontWeight: 'bold'
                    }}>{community.name}</h3>
                    
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        backgroundColor: community.category === 'Regional' ? '#4CAF50' : '#2196F3',
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {community.category}
                      </span>
                      
                      <span style={{
                        color: '#888',
                        fontSize: '14px'
                      }}>
                        👥 {community.members} members
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      color: '#4CAF50',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>🟢 Active</div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px'
                    }}>{community.recentActivity}</div>
                  </div>
                </div>

                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  marginBottom: '15px',
                  lineHeight: '1.4'
                }}>{community.description}</p>

                <div style={{
                  marginBottom: '15px'
                }}>
                  <p style={{
                    color: '#B9975B',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>Specialties:</p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {community.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#333',
                          color: '#ccc',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  marginBottom: '20px'
                }}>
                  <p style={{
                    color: '#B9975B',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>Community Badges:</p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {community.badges.map((badge, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#B9975B',
                          color: '#000',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid #333'
                }}>
                  <div>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>Moderators:</p>
                    <p style={{
                      color: '#ccc',
                      fontSize: '14px',
                      margin: 0
                    }}>{community.moderators.join(', ')}</p>
                  </div>
                  
                  <button
                    onClick={() => joinCommunity(community.id)}
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
                    Join Community
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'my-endorsements') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1000px',
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
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>My Professional Endorsements</h1>
            <p style={{
              color: '#ccc',
              fontSize: '18px',
              margin: 0
            }}>Recognition from fellow professionals • Skills validation • Profile boosts</p>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setActiveTab('endorsements')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '1px solid #555',
                borderRadius: '8px',
                color: '#ccc',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ← Back to All Endorsements
            </button>
          </div>

          {/* My Endorsements Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {myEndorsements.map((endorsement) => (
              <div
                key={endorsement.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: '2px solid #B9975B',
                  padding: '25px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '22px',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>{endorsement.skill}</h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '10px'
                  }}>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>ENDORSEMENTS</p>
                    <p style={{
                      color: '#4CAF50',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{endorsement.count}</p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '10px'
                  }}>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>AVG RATING</p>
                    <p style={{
                      color: '#B9975B',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>⭐ {endorsement.averageRating}</p>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#333',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}>
                  <p style={{
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '5px'
                  }}>TOTAL JOB VALUE</p>
                  <p style={{
                    color: '#4CAF50',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>£{endorsement.totalJobValue.toLocaleString()}</p>
                </div>
                
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Latest from <span style={{ color: '#B9975B', fontWeight: 'bold' }}>{endorsement.recentEndorser}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Profile Boost Benefits */}
          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '1px solid #333',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '28px',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>🚀 Profile Boost Benefits</h2>
            
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
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
                <h4 style={{
                  color: '#4CAF50',
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Higher Rankings</h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>Endorsed profiles appear higher in search results</p>
              </div>
              
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
                <h4 style={{
                  color: '#4CAF50',
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Premium Leads</h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>Access to higher-value job opportunities</p>
              </div>
              
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🏆</div>
                <h4 style={{
                  color: '#4CAF50',
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Trust Badges</h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>Special badges showing peer recognition</p>
              </div>
              
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🤝</div>
                <h4 style={{
                  color: '#4CAF50',
                  fontSize: '18px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Network Growth</h4>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>Stronger professional connections</p>
              </div>
            </div>
            
            <button
              onClick={createEndorsement}
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
              ✍️ Endorse a Colleague
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Endorsements View
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
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>Peer Endorsements</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            margin: 0
          }}>Professional recognition from colleagues • LinkedIn-style endorsements for trades • Build your reputation</p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setActiveTab('endorsements')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'endorsements' ? '#B9975B' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: activeTab === 'endorsements' ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            All Endorsements
          </button>
          
          <button
            onClick={() => setActiveTab('my-endorsements')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'my-endorsements' ? '#B9975B' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: activeTab === 'my-endorsements' ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            My Endorsements
          </button>
          
          <button
            onClick={() => setActiveTab('communities')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'communities' ? '#B9975B' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: activeTab === 'communities' ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Communities
          </button>
        </div>

        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search endorsements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '12px',
              backgroundColor: '#222',
              border: '1px solid #555',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
          
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            style={{
              padding: '12px',
              backgroundColor: '#222',
              border: '1px solid #555',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            <option value="all">All Communities</option>
            <option value="london">London Trades</option>
            <option value="heating">UK Heating</option>
            <option value="cotswold">Cotswold Craftsmen</option>
          </select>
          
          <button
            onClick={createEndorsement}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ✍️ Create Endorsement
          </button>
        </div>

        {/* Endorsements List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px'
        }}>
          {filteredEndorsements.map((endorsement) => (
            <div
              key={endorsement.id}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                border: '1px solid #333',
                padding: '25px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#B9975B',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>
                    {endorsement.endorser.charAt(0)}
                  </div>
                  
                  <div>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '20px',
                      marginBottom: '5px',
                      fontWeight: 'bold'
                    }}>{endorsement.endorser}</h3>
                    
                    <p style={{
                      color: '#ccc',
                      fontSize: '16px',
                      marginBottom: '8px'
                    }}>{endorsement.endorserTitle}</p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>⭐ {endorsement.endorserRating}</span>
                      
                      {endorsement.verified && (
                        <span style={{
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>✓ Verified</span>
                      )}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {endorsement.endorserBadges.map((badge, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#333',
                            color: '#B9975B',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: '#888',
                    fontSize: '14px',
                    marginBottom: '5px'
                  }}>{endorsement.date}</div>
                  
                  <div style={{
                    color: '#4CAF50',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>£{endorsement.jobValue}</div>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>Endorsed:</span>
                  
                  <span style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>{endorsement.endorsee}</span>
                  
                  <span style={{
                    color: '#ccc',
                    fontSize: '14px'
                  }}>({endorsement.endorseeTitle})</span>
                  
                  <span style={{
                    backgroundColor: '#B9975B',
                    color: '#000',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {endorsement.skill}
                  </span>
                </div>
                
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  margin: 0,
                  fontStyle: 'italic'
                }}>"{endorsement.message}"</p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center'
                }}>
                  <span style={{
                    backgroundColor: '#333',
                    color: '#B9975B',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    📍 {endorsement.community}
                  </span>
                  
                  <span style={{
                    color: '#888',
                    fontSize: '14px'
                  }}>👍 {endorsement.likes} likes</span>
                </div>
                
                <button
                  onClick={() => endorseColleague(endorsement.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  👍 Like Endorsement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeerEndorsementSystem;
