import React, { useState, useEffect } from 'react';

const ProfessionalVerificationSystem = () => {
  const [verificationStep, setVerificationStep] = useState('overview');
  const [userProfile, setUserProfile] = useState({
    name: 'John Smith',
    trade: 'Plumbing',
    experience: '15 years',
    location: 'London, UK',
    verifiedBadges: ['Gas Safe Registered', 'CIPHE Member'],
    pendingVerifications: ['City & Guilds Level 3'],
    completedJobs: 127,
    rating: 4.8,
    profileComplete: 85
  });
  const [uploadedFiles, setUploadedFiles] = useState({});

  const verificationCategories = [
    {
      id: 'gas_safe',
      name: 'Gas Safe Registered',
      icon: '🔥',
      color: '#FF5722',
      description: 'Official Gas Safe registration for gas work',
      requirements: ['Gas Safe ID Card', 'Current Certificate'],
      creditBoost: '+15 credits monthly',
      jobPriority: 'High priority for gas jobs',
      status: 'verified'
    },
    {
      id: 'niceic',
      name: 'NICEIC Approved',
      icon: '⚡',
      color: '#2196F3',
      description: 'NICEIC approved electrical contractor',
      requirements: ['NICEIC Certificate', 'Part P Qualification'],
      creditBoost: '+20 credits monthly',
      jobPriority: 'Priority for electrical work',
      status: 'pending'
    },
    {
      id: 'city_guilds',
      name: 'City & Guilds Qualified',
      icon: '🎓',
      color: '#4CAF50',
      description: 'Recognized trade qualification',
      requirements: ['Certificate Copy', 'Qualification Level'],
      creditBoost: '+10 credits monthly',
      jobPriority: 'Skill verification boost',
      status: 'available'
    },
    {
      id: 'dbs_check',
      name: 'DBS Checked',
      icon: '🛡️',
      color: '#9C27B0',
      description: 'Enhanced DBS background check',
      requirements: ['DBS Certificate', 'ID Verification'],
      creditBoost: '+5 credits monthly',
      jobPriority: 'Trusted professional status',
      status: 'available'
    },
    {
      id: 'insurance',
      name: 'Public Liability Insurance',
      icon: '🏛️',
      color: '#FF9800',
      description: 'Valid public liability insurance',
      requirements: ['Insurance Certificate', 'Policy Details'],
      creditBoost: '+8 credits monthly',
      jobPriority: 'Customer confidence boost',
      status: 'verified'
    },
    {
      id: 'apprentice_mentor',
      name: 'Apprentice Mentor',
      icon: '👨‍🏫',
      color: '#795548',
      description: 'Qualified to train apprentices',
      requirements: ['Mentor Qualification', 'Training Record'],
      creditBoost: '+12 credits monthly',
      jobPriority: 'Mentorship opportunities',
      status: 'available'
    }
  ];

  const skillBadges = [
    { id: 'emergency_response', name: 'Emergency Response', icon: '🚨', earned: true },
    { id: 'eco_specialist', name: 'Eco Specialist', icon: '🌱', earned: true },
    { id: 'customer_champion', name: 'Customer Champion', icon: '⭐', earned: false },
    { id: 'innovation_leader', name: 'Innovation Leader', icon: '💡', earned: false },
    { id: 'safety_expert', name: 'Safety Expert', icon: '🦺', earned: true },
    { id: 'quality_craftsman', name: 'Quality Craftsman', icon: '🏆', earned: false }
  ];

  const workProofStack = [
    {
      id: 1,
      jobTitle: 'Kitchen Renovation - Full Plumbing',
      beforeImage: '/work-before-1.jpg',
      afterImage: '/work-after-1.jpg',
      videoProof: '/work-video-1.mp4',
      gpsLocation: 'London SW1 2AB',
      timestamp: '2024-09-25T14:30:00Z',
      customerRating: 5,
      customerComment: 'Exceptional work, very professional',
      verified: true
    },
    {
      id: 2,
      jobTitle: 'Bathroom Installation',
      beforeImage: '/work-before-2.jpg',
      afterImage: '/work-after-2.jpg',
      videoProof: '/work-video-2.mp4',
      gpsLocation: 'London W1 1AA',
      timestamp: '2024-09-20T10:15:00Z',
      customerRating: 5,
      customerComment: 'Perfect installation, highly recommend',
      verified: true
    }
  ];

  const handleFileUpload = (categoryId, fileType, file) => {
    setUploadedFiles({
      ...uploadedFiles,
      [`${categoryId}_${fileType}`]: file
    });
  };

  const submitVerification = (categoryId) => {
    // Simulate verification submission
    alert(`Verification submitted for ${categoryId}. You'll receive confirmation within 24-48 hours.`);
    setVerificationStep('overview');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'available': return '#2196F3';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'verified': return 'VERIFIED ✓';
      case 'pending': return 'PENDING REVIEW';
      case 'available': return 'START VERIFICATION';
      default: return 'UNKNOWN';
    }
  };

  if (verificationStep !== 'overview') {
    const selectedCategory = verificationCategories.find(cat => cat.id === verificationStep);
    
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
          <button
            onClick={() => setVerificationStep('overview')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '5px',
              color: '#B9975B',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
          >
            ← Back to Overview
          </button>

          <div style={{
            backgroundColor: '#111',
            padding: '40px',
            borderRadius: '15px',
            border: '2px solid #B9975B'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '60px',
                marginBottom: '20px'
              }}>{selectedCategory.icon}</div>
              
              <h1 style={{
                color: '#B9975B',
                fontSize: '32px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>{selectedCategory.name}</h1>
              
              <p style={{
                color: '#ccc',
                fontSize: '18px',
                marginBottom: '30px'
              }}>{selectedCategory.description}</p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#4CAF50',
                    fontSize: '18px',
                    marginBottom: '10px'
                  }}>Credit Boost</h3>
                  <p style={{
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>{selectedCategory.creditBoost}</p>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '18px',
                    marginBottom: '10px'
                  }}>Job Priority</h3>
                  <p style={{
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>{selectedCategory.jobPriority}</p>
                </div>
              </div>
            </div>

            <h3 style={{
              color: '#fff',
              fontSize: '24px',
              marginBottom: '20px'
            }}>Required Documents</h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {selectedCategory.requirements.map((requirement, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#222',
                    padding: '25px',
                    borderRadius: '10px',
                    border: '1px solid #333'
                  }}
                >
                  <h4 style={{
                    color: '#B9975B',
                    fontSize: '18px',
                    marginBottom: '15px'
                  }}>{requirement}</h4>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(selectedCategory.id, requirement.toLowerCase().replace(/\s+/g, '_'), e.target.files[0])}
                      style={{
                        padding: '10px',
                        backgroundColor: '#333',
                        border: '1px solid #555',
                        borderRadius: '5px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                    
                    {uploadedFiles[`${selectedCategory.id}_${requirement.toLowerCase().replace(/\s+/g, '_')}`] && (
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>✓ Uploaded</span>
                    )}
                  </div>
                  
                  <p style={{
                    color: '#888',
                    fontSize: '12px',
                    marginTop: '10px',
                    margin: 0
                  }}>Accepted formats: JPG, PNG, PDF (max 5MB)</p>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#222',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '30px'
            }}>
              <h4 style={{
                color: '#B9975B',
                fontSize: '18px',
                marginBottom: '15px'
              }}>Verification Process</h4>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                {[
                  { step: 1, title: 'Upload Documents', status: 'current' },
                  { step: 2, title: 'Expert Review', status: 'pending' },
                  { step: 3, title: 'Verification Complete', status: 'pending' }
                ].map((step, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: step.status === 'current' ? '#B9975B' : '#333',
                      color: step.status === 'current' ? '#000' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {step.step}
                    </div>
                    <span style={{
                      color: step.status === 'current' ? '#B9975B' : '#888',
                      fontSize: '14px',
                      fontWeight: step.status === 'current' ? 'bold' : 'normal'
                    }}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => submitVerification(selectedCategory.id)}
              disabled={selectedCategory.requirements.length > Object.keys(uploadedFiles).filter(key => key.startsWith(selectedCategory.id)).length}
              style={{
                width: '100%',
                padding: '15px',
                background: selectedCategory.requirements.length <= Object.keys(uploadedFiles).filter(key => key.startsWith(selectedCategory.id)).length
                  ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)'
                  : '#666',
                border: 'none',
                borderRadius: '10px',
                color: selectedCategory.requirements.length <= Object.keys(uploadedFiles).filter(key => key.startsWith(selectedCategory.id)).length ? '#000' : '#ccc',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: selectedCategory.requirements.length <= Object.keys(uploadedFiles).filter(key => key.startsWith(selectedCategory.id)).length ? 'pointer' : 'not-allowed'
              }}
            >
              Submit for Verification
            </button>
          </div>
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
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>Professional Verification</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            marginBottom: '30px'
          }}>Build trust, earn more, get priority access to premium jobs</p>
          
          {/* Profile Completion */}
          <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #B9975B',
            display: 'inline-block',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>👨‍🔧</div>
              
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '24px',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                }}>{userProfile.name}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '10px'
                }}>{userProfile.trade} • {userProfile.experience} • {userProfile.location}</p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span style={{
                    color: '#FFD700',
                    fontSize: '16px'
                  }}>⭐ {userProfile.rating} ({userProfile.completedJobs} jobs)</span>
                  
                  <div style={{
                    backgroundColor: '#222',
                    padding: '5px 15px',
                    borderRadius: '20px'
                  }}>
                    <span style={{
                      color: '#4CAF50',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>Profile {userProfile.profileComplete}% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Badges */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Your Professional Badges</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {userProfile.verifiedBadges.map((badge, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>✓</span>
                {badge}
              </div>
            ))}
            
            {userProfile.pendingVerifications.map((badge, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FF9800',
                  color: '#fff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>⏳</span>
                {badge} (Pending)
              </div>
            ))}
          </div>
        </div>

        {/* Available Verifications */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Available Verifications</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {verificationCategories.map((category) => (
              <div
                key={category.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: `2px solid ${category.color}`,
                  padding: '25px',
                  cursor: category.status === 'available' ? 'pointer' : 'default',
                  opacity: category.status === 'verified' ? 0.8 : 1,
                  transition: 'all 0.3s ease'
                }}
                onClick={() => category.status === 'available' && setVerificationStep(category.id)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '40px',
                    marginBottom: '15px'
                  }}>{category.icon}</div>
                  
                  <span
                    style={{
                      backgroundColor: getStatusColor(category.status),
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {getStatusText(category.status)}
                  </span>
                </div>
                
                <h3 style={{
                  color: category.color,
                  fontSize: '22px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>{category.name}</h3>
                
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>{category.description}</p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: '#4CAF50',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>Monthly Boost</p>
                    <p style={{
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{category.creditBoost}</p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: '#B9975B',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>Priority</p>
                    <p style={{
                      color: '#fff',
                      fontSize: '12px',
                      margin: 0
                    }}>{category.jobPriority}</p>
                  </div>
                </div>
                
                <div style={{
                  borderTop: '1px solid #333',
                  paddingTop: '15px'
                }}>
                  <p style={{
                    color: '#888',
                    fontSize: '14px',
                    marginBottom: '10px'
                  }}>Required:</p>
                  <ul style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0,
                    paddingLeft: '20px'
                  }}>
                    {category.requirements.map((req, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Badges */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Skill Achievement Badges</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {skillBadges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  backgroundColor: badge.earned ? '#4CAF50' : '#333',
                  color: badge.earned ? '#fff' : '#888',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  opacity: badge.earned ? 1 : 0.6
                }}
              >
                <div style={{
                  fontSize: '32px',
                  marginBottom: '10px'
                }}>{badge.icon}</div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  margin: 0
                }}>{badge.name}</h4>
                {badge.earned && (
                  <p style={{
                    fontSize: '12px',
                    marginTop: '5px',
                    margin: 0
                  }}>✓ EARNED</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Work Proof Stack */}
        <div>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Work Proof Stack</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px'
          }}>
            {workProofStack.map((work) => (
              <div
                key={work.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: work.verified ? '2px solid #4CAF50' : '1px solid #333',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #333'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px'
                  }}>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{work.jobTitle}</h3>
                    
                    {work.verified && (
                      <span style={{
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <div>
                      <p style={{
                        color: '#888',
                        fontSize: '12px',
                        marginBottom: '5px'
                      }}>BEFORE</p>
                      <div style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#222',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '14px'
                      }}>
                        📷 Before Photo
                      </div>
                    </div>
                    
                    <div>
                      <p style={{
                        color: '#888',
                        fontSize: '12px',
                        marginBottom: '5px'
                      }}>AFTER</p>
                      <div style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#222',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '14px'
                      }}>
                        📷 After Photo
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      color: '#888',
                      fontSize: '14px'
                    }}>📍 {work.gpsLocation}</span>
                    
                    <span style={{
                      color: '#888',
                      fontSize: '14px'
                    }}>📅 {new Date(work.timestamp).toLocaleDateString()}</span>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        color: '#FFD700',
                        fontSize: '16px'
                      }}>⭐ {work.customerRating}/5</span>
                      
                      <span style={{
                        color: '#ccc',
                        fontSize: '14px'
                      }}>Customer Review</span>
                    </div>
                    
                    <p style={{
                      color: '#ccc',
                      fontSize: '14px',
                      fontStyle: 'italic',
                      margin: 0
                    }}>"{work.customerComment}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalVerificationSystem;
