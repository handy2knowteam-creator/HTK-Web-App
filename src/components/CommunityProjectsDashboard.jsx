import React, { useState, useEffect } from 'react';

const CommunityProjectsDashboard = () => {
  const [activeTab, setActiveTab] = useState('active-projects');
  const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [communityStats, setCommunityStats] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Real community projects data
    const activeProjects = [
      {
        id: 1,
        title: 'Community Centre Renovation',
        location: 'Cotswold Village Hall, Chipping Norton',
        description: 'Complete renovation of the village community centre including new heating system, electrical rewiring, and kitchen upgrade.',
        category: 'Community Building',
        status: 'In Progress',
        progress: 65,
        budget: 25000,
        raised: 16250,
        startDate: '2024-09-15',
        expectedCompletion: '2024-12-20',
        coordinator: 'Sarah Williams',
        coordinatorRating: 4.9,
        volunteers: [
          { name: 'Mike Johnson', trade: 'Electrician', hours: 24, rating: 4.8 },
          { name: 'Tom Roberts', trade: 'Heating Engineer', hours: 18, rating: 4.9 },
          { name: 'James Wilson', trade: 'Carpenter', hours: 32, rating: 4.7 },
          { name: 'Lisa Thompson', trade: 'Kitchen Specialist', hours: 16, rating: 4.8 }
        ],
        tasks: [
          { id: 1, task: 'Electrical rewiring', assignee: 'Mike Johnson', status: 'Completed', hours: 24 },
          { id: 2, task: 'Heating system installation', assignee: 'Tom Roberts', status: 'In Progress', hours: 18 },
          { id: 3, task: 'Kitchen cabinet installation', assignee: 'James Wilson', status: 'Pending', hours: 0 },
          { id: 4, task: 'Flooring installation', assignee: 'Lisa Thompson', status: 'Pending', hours: 0 }
        ],
        materials: [
          { item: 'Electrical cables and fittings', cost: 1200, donated: true, donor: 'Local Electrical Supplies' },
          { item: 'Boiler and heating components', cost: 3500, donated: false, paid: true },
          { item: 'Kitchen units and worktops', cost: 2800, donated: true, donor: 'Kitchen World' },
          { item: 'Flooring materials', cost: 1500, donated: false, paid: false }
        ],
        impact: 'Will serve 500+ community members with improved facilities for events, meetings, and social gatherings.',
        photos: ['before1.jpg', 'progress1.jpg', 'progress2.jpg'],
        nextMeeting: '2024-11-05 19:00',
        communityBenefit: 'Enhanced community cohesion and modern facilities for all ages'
      },
      {
        id: 2,
        title: 'Local School Playground Upgrade',
        location: 'St. Mary\'s Primary School, Oxford',
        description: 'Safety improvements and new equipment installation for the school playground, including new fencing, soft play surfaces, and climbing equipment.',
        category: 'Education',
        status: 'Planning',
        progress: 25,
        budget: 15000,
        raised: 3750,
        startDate: '2024-11-01',
        expectedCompletion: '2024-12-15',
        coordinator: 'David Chen',
        coordinatorRating: 4.8,
        volunteers: [
          { name: 'Emma Davis', trade: 'Landscaper', hours: 0, rating: 4.9 },
          { name: 'Mark Taylor', trade: 'Fencing Specialist', hours: 0, rating: 4.7 },
          { name: 'Rachel White', trade: 'Safety Inspector', hours: 4, rating: 4.8 }
        ],
        tasks: [
          { id: 1, task: 'Site survey and planning', assignee: 'Rachel White', status: 'Completed', hours: 4 },
          { id: 2, task: 'Safety fencing installation', assignee: 'Mark Taylor', status: 'Scheduled', hours: 0 },
          { id: 3, task: 'Ground preparation', assignee: 'Emma Davis', status: 'Scheduled', hours: 0 },
          { id: 4, task: 'Equipment installation', assignee: 'Multiple', status: 'Scheduled', hours: 0 }
        ],
        materials: [
          { item: 'Safety fencing and gates', cost: 2500, donated: false, paid: false },
          { item: 'Playground equipment', cost: 8000, donated: true, donor: 'PlaySafe Equipment Ltd' },
          { item: 'Soft play surface materials', cost: 3500, donated: false, paid: false },
          { item: 'Landscaping materials', cost: 1000, donated: true, donor: 'Green Gardens Nursery' }
        ],
        impact: 'Will provide safe, modern play facilities for 200+ children aged 4-11.',
        photos: ['school_before.jpg'],
        nextMeeting: '2024-10-30 18:30',
        communityBenefit: 'Improved child safety and development through better play facilities'
      },
      {
        id: 3,
        title: 'Elderly Care Home Garden Project',
        location: 'Sunset Manor Care Home, Witney',
        description: 'Creating accessible raised garden beds and outdoor seating areas for elderly residents to enjoy gardening and outdoor activities.',
        category: 'Healthcare',
        status: 'Completed',
        progress: 100,
        budget: 8000,
        raised: 8000,
        startDate: '2024-08-01',
        expectedCompletion: '2024-09-30',
        coordinator: 'Alex Brown',
        coordinatorRating: 4.9,
        volunteers: [
          { name: 'Sophie Green', trade: 'Landscaper', hours: 28, rating: 4.9 },
          { name: 'Peter Wilson', trade: 'Carpenter', hours: 20, rating: 4.8 },
          { name: 'Mary Johnson', trade: 'Garden Designer', hours: 16, rating: 4.9 }
        ],
        tasks: [
          { id: 1, task: 'Garden design and planning', assignee: 'Mary Johnson', status: 'Completed', hours: 16 },
          { id: 2, task: 'Raised bed construction', assignee: 'Peter Wilson', status: 'Completed', hours: 20 },
          { id: 3, task: 'Planting and landscaping', assignee: 'Sophie Green', status: 'Completed', hours: 28 },
          { id: 4, task: 'Seating area installation', assignee: 'Multiple', status: 'Completed', hours: 12 }
        ],
        materials: [
          { item: 'Raised bed materials (wood, soil)', cost: 2000, donated: true, donor: 'Timber Merchants Ltd' },
          { item: 'Plants and seeds', cost: 800, donated: true, donor: 'Community Garden Centre' },
          { item: 'Garden tools and equipment', cost: 500, donated: true, donor: 'Tool Library' },
          { item: 'Seating and pathways', cost: 1500, donated: false, paid: true }
        ],
        impact: 'Improved mental health and wellbeing for 45 elderly residents through therapeutic gardening.',
        photos: ['garden_before.jpg', 'garden_progress.jpg', 'garden_complete.jpg'],
        nextMeeting: 'Project Complete',
        communityBenefit: 'Enhanced quality of life for elderly residents and therapeutic outdoor activities'
      }
    ];
    setProjects(activeProjects);

    // User's personal projects
    const userProjects = [
      {
        id: 1,
        title: 'Community Centre Renovation',
        role: 'Volunteer Electrician',
        hoursContributed: 24,
        status: 'Active',
        nextTask: 'Support heating system installation',
        creditsEarned: 48
      },
      {
        id: 2,
        title: 'Local School Playground Upgrade',
        role: 'Project Supporter',
        hoursContributed: 0,
        status: 'Planning',
        nextTask: 'Attend planning meeting',
        creditsEarned: 0
      }
    ];
    setMyProjects(userProjects);

    // Community statistics
    const stats = {
      totalProjects: 12,
      activeProjects: 3,
      completedProjects: 9,
      totalVolunteers: 156,
      totalHours: 2847,
      totalValueCreated: 125000,
      communitiesServed: 8,
      livesImpacted: 1250
    };
    setCommunityStats(stats);
  }, []);

  const joinProject = (projectId) => {
    alert('Welcome to the project! You\'ve been added as a volunteer. Check your email for next steps and meeting details.');
  };

  const donateToProject = (projectId) => {
    alert('Thank you for your donation! Your contribution will directly support this community project. Payment processing...');
  };

  const createProject = () => {
    alert('Project creation form opened! You can now propose a new community project for HTK members to support.');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#2196F3';
      case 'Planning': return '#FF9800';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Community Building': return '🏢';
      case 'Education': return '🎓';
      case 'Healthcare': return '🏥';
      case 'Environment': return '🌱';
      case 'Housing': return '🏠';
      default: return '🤝';
    }
  };

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    
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
          <button
            onClick={() => setSelectedProject(null)}
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
            ← Back to Projects
          </button>

          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '1px solid #333',
            overflow: 'hidden'
          }}>
            {/* Project Header */}
            <div style={{
              padding: '30px',
              borderBottom: '1px solid #333',
              background: 'linear-gradient(135deg, #1a1a1a, #111)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontSize: '32px' }}>{getCategoryIcon(project.category)}</span>
                    <h1 style={{
                      color: '#B9975B',
                      fontSize: '32px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{project.title}</h1>
                  </div>
                  
                  <p style={{
                    color: '#ccc',
                    fontSize: '18px',
                    marginBottom: '10px'
                  }}>📍 {project.location}</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      backgroundColor: getStatusColor(project.status),
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {project.status}
                    </span>
                    
                    <span style={{
                      backgroundColor: '#333',
                      color: '#B9975B',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '15px'
                  }}>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>PROGRESS</p>
                    <p style={{
                      color: '#4CAF50',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{project.progress}%</p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <button
                      onClick={() => joinProject(project.id)}
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
                      🤝 Join Project
                    </button>
                    
                    <button
                      onClick={() => donateToProject(project.id)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      💰 Donate
                    </button>
                  </div>
                </div>
              </div>
              
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                lineHeight: '1.5',
                margin: 0
              }}>{project.description}</p>
            </div>

            {/* Project Stats */}
            <div style={{
              padding: '30px',
              borderBottom: '1px solid #333'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#4CAF50',
                    fontSize: '28px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>£{project.raised.toLocaleString()}</h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0
                  }}>Raised of £{project.budget.toLocaleString()}</p>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#333',
                    borderRadius: '4px',
                    marginTop: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(project.raised / project.budget) * 100}%`,
                      height: '100%',
                      backgroundColor: '#4CAF50',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#2196F3',
                    fontSize: '28px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>{project.volunteers.length}</h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0
                  }}>Active Volunteers</p>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#FF9800',
                    fontSize: '28px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>{project.volunteers.reduce((sum, v) => sum + v.hours, 0)}</h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0
                  }}>Hours Contributed</p>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '28px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>{project.tasks.filter(t => t.status === 'Completed').length}/{project.tasks.length}</h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0
                  }}>Tasks Complete</p>
                </div>
              </div>
            </div>

            {/* Volunteers */}
            <div style={{
              padding: '30px',
              borderBottom: '1px solid #333'
            }}>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>Project Volunteers</h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {project.volunteers.map((volunteer, index) => (
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
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#B9975B',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000'
                      }}>
                        {volunteer.name.charAt(0)}
                      </div>
                      
                      <div>
                        <h4 style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          marginBottom: '5px',
                          fontWeight: 'bold'
                        }}>{volunteer.name}</h4>
                        <p style={{
                          color: '#ccc',
                          fontSize: '14px',
                          margin: 0
                        }}>{volunteer.trade}</p>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <p style={{
                          color: '#4CAF50',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>{volunteer.hours} hours</p>
                      </div>
                      
                      <div>
                        <p style={{
                          color: '#B9975B',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>⭐ {volunteer.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div style={{
              padding: '30px',
              borderBottom: '1px solid #333'
            }}>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>Project Tasks</h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      backgroundColor: '#222',
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid #333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        marginBottom: '8px',
                        fontWeight: 'bold'
                      }}>{task.task}</h4>
                      
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        margin: 0
                      }}>Assigned to: {task.assignee}</p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>{task.hours} hours</span>
                      
                      <span style={{
                        backgroundColor: getStatusColor(task.status),
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div style={{
              padding: '30px'
            }}>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>Materials & Donations</h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {project.materials.map((material, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#222',
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid #333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        marginBottom: '8px',
                        fontWeight: 'bold'
                      }}>{material.item}</h4>
                      
                      {material.donated && (
                        <p style={{
                          color: '#4CAF50',
                          fontSize: '14px',
                          margin: 0
                        }}>Donated by: {material.donor}</p>
                      )}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>£{material.cost}</span>
                      
                      <span style={{
                        backgroundColor: material.donated ? '#4CAF50' : material.paid ? '#2196F3' : '#FF9800',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {material.donated ? '🎁 Donated' : material.paid ? '✅ Paid' : '⏳ Needed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'my-projects') {
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
            }}>My Community Projects</h1>
            <p style={{
              color: '#ccc',
              fontSize: '18px',
              margin: 0
            }}>Your contributions to community projects • Track your impact • Earn community credits</p>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setActiveTab('active-projects')}
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
              ← All Projects
            </button>
          </div>

          {/* My Projects */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
          }}>
            {myProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: '2px solid #B9975B',
                  padding: '25px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '22px',
                      marginBottom: '10px',
                      fontWeight: 'bold'
                    }}>{project.title}</h3>
                    
                    <p style={{
                      color: '#ccc',
                      fontSize: '16px',
                      marginBottom: '10px'
                    }}>Your Role: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{project.role}</span></p>
                    
                    <p style={{
                      color: '#888',
                      fontSize: '14px',
                      margin: 0
                    }}>Next Task: {project.nextTask}</p>
                  </div>
                  
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <span style={{
                      backgroundColor: getStatusColor(project.status),
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px'
                }}>
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>HOURS CONTRIBUTED</p>
                    <p style={{
                      color: '#4CAF50',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{project.hoursContributed}</p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#222',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>CREDITS EARNED</p>
                    <p style={{
                      color: '#B9975B',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{project.creditsEarned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Summary */}
          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '1px solid #333',
            padding: '30px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '28px',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>Your Community Impact</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <h3 style={{
                  color: '#4CAF50',
                  fontSize: '32px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>{myProjects.reduce((sum, p) => sum + p.hoursContributed, 0)}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  margin: 0
                }}>Total Hours</p>
              </div>
              
              <div>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '32px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>{myProjects.reduce((sum, p) => sum + p.creditsEarned, 0)}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  margin: 0
                }}>Credits Earned</p>
              </div>
              
              <div>
                <h3 style={{
                  color: '#2196F3',
                  fontSize: '32px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>{myProjects.length}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  margin: 0
                }}>Projects Joined</p>
              </div>
              
              <div>
                <h3 style={{
                  color: '#FF9800',
                  fontSize: '32px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>£{myProjects.reduce((sum, p) => sum + p.creditsEarned, 0) * 10}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  margin: 0
                }}>Value Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Projects View
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
          }}>Community Projects Dashboard</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            margin: 0
          }}>Real community projects • Volunteer your skills • Make a difference locally</p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setActiveTab('active-projects')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'active-projects' ? '#B9975B' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: activeTab === 'active-projects' ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Active Projects
          </button>
          
          <button
            onClick={() => setActiveTab('my-projects')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'my-projects' ? '#B9975B' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: activeTab === 'my-projects' ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            My Projects
          </button>
          
          <button
            onClick={createProject}
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
            ➕ Create Project
          </button>
        </div>

        {/* Community Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '32px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>{communityStats.totalProjects}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Total Projects</p>
          </div>
          
          <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#2196F3',
              fontSize: '32px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>{communityStats.totalVolunteers}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Active Volunteers</p>
          </div>
          
          <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#FF9800',
              fontSize: '32px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>{communityStats.totalHours}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Hours Contributed</p>
          </div>
          
          <div style={{
            backgroundColor: '#111',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '32px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>£{communityStats.totalValueCreated.toLocaleString()}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Value Created</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px'
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                border: '1px solid #333',
                padding: '25px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span style={{ fontSize: '32px' }}>{getCategoryIcon(project.category)}</span>
                  <div>
                    <h3 style={{
                      color: '#B9975B',
                      fontSize: '20px',
                      marginBottom: '5px',
                      fontWeight: 'bold'
                    }}>{project.title}</h3>
                    <p style={{
                      color: '#888',
                      fontSize: '14px',
                      margin: 0
                    }}>📍 {project.location}</p>
                  </div>
                </div>
                
                <span style={{
                  backgroundColor: getStatusColor(project.status),
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {project.status}
                </span>
              </div>
              
              <p style={{
                color: '#ccc',
                fontSize: '14px',
                marginBottom: '20px',
                lineHeight: '1.4'
              }}>{project.description}</p>
              
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
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '5px'
                  }}>PROGRESS</p>
                  <p style={{
                    color: '#4CAF50',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>{project.progress}%</p>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '5px'
                  }}>VOLUNTEERS</p>
                  <p style={{
                    color: '#2196F3',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>{project.volunteers.length}</p>
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
                    color: '#4CAF50',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>£{project.raised.toLocaleString()} raised</p>
                  <p style={{
                    color: '#888',
                    fontSize: '12px',
                    margin: 0
                  }}>of £{project.budget.toLocaleString()} goal</p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    joinProject(project.id);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Join Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityProjectsDashboard;
