import React, { useState, useEffect } from 'react';

const PublicTradespersonDirectory = () => {
  const [tradespeople, setTradespeople] = useState([]);
  const [filteredTradespeople, setFilteredTradespeople] = useState([]);
  const [selectedTradesperson, setSelectedTradesperson] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    location: '',
    rating: 0,
    verified: false,
    availability: 'all'
  });
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Sample tradespeople data
  const sampleTradespeople = [
    {
      id: 1,
      name: 'Mike Thompson',
      category: 'Plumber',
      specialties: ['Bathroom Installation', 'Boiler Repair', 'Emergency Plumbing'],
      location: 'London, SW1',
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      profileImage: '/api/placeholder/150/150',
      coverImage: '/api/placeholder/400/200',
      yearsExperience: 12,
      completedJobs: 340,
      responseTime: '2 hours',
      availability: 'available',
      priceRange: '£45-85/hour',
      badges: ['Gas Safe', 'City & Guilds', 'Emergency Response'],
      description: 'Experienced plumber specializing in bathroom renovations and emergency repairs. Available 24/7 for urgent issues.',
      portfolio: [
        { id: 1, title: 'Modern Bathroom Renovation', image: '/api/placeholder/300/200', description: 'Complete bathroom transformation in Victorian house' },
        { id: 2, title: 'Boiler Installation', image: '/api/placeholder/300/200', description: 'New combi boiler installation with smart controls' },
        { id: 3, title: 'Kitchen Plumbing', image: '/api/placeholder/300/200', description: 'Complete kitchen plumbing for new build' }
      ],
      reviews: [
        { id: 1, customer: 'Sarah J.', rating: 5, comment: 'Excellent work on our bathroom renovation. Very professional and tidy.', date: '2024-01-10' },
        { id: 2, customer: 'David W.', rating: 5, comment: 'Fixed our emergency leak quickly and efficiently. Highly recommended!', date: '2024-01-08' },
        { id: 3, customer: 'Emma D.', rating: 4, comment: 'Good quality work, arrived on time and explained everything clearly.', date: '2024-01-05' }
      ],
      contactInfo: {
        phone: '07123 456789',
        email: 'mike@example.com',
        website: 'www.mikethompsonplumbing.co.uk'
      }
    },
    {
      id: 2,
      name: 'Sarah Williams',
      category: 'Electrician',
      specialties: ['Rewiring', 'Smart Home Installation', 'EV Charging Points'],
      location: 'London, N1',
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      profileImage: '/api/placeholder/150/150',
      coverImage: '/api/placeholder/400/200',
      yearsExperience: 8,
      completedJobs: 210,
      responseTime: '1 hour',
      availability: 'available',
      priceRange: '£50-90/hour',
      badges: ['NICEIC', 'Part P', 'EV Installer'],
      description: 'Qualified electrician specializing in smart home technology and EV charging installations.',
      portfolio: [
        { id: 1, title: 'Smart Home Setup', image: '/api/placeholder/300/200', description: 'Complete smart home automation system' },
        { id: 2, title: 'EV Charging Point', image: '/api/placeholder/300/200', description: 'Tesla home charging station installation' },
        { id: 3, title: 'House Rewiring', image: '/api/placeholder/300/200', description: 'Full house rewiring with modern consumer unit' }
      ],
      reviews: [
        { id: 1, customer: 'John M.', rating: 5, comment: 'Amazing work on our smart home setup. Very knowledgeable about latest tech.', date: '2024-01-12' },
        { id: 2, customer: 'Lisa K.', rating: 5, comment: 'Professional EV charging installation. Clean work and great communication.', date: '2024-01-09' }
      ],
      contactInfo: {
        phone: '07987 654321',
        email: 'sarah@example.com',
        website: 'www.sarahwilliamselectrical.co.uk'
      }
    },
    {
      id: 3,
      name: 'James Carter',
      category: 'Carpenter',
      specialties: ['Kitchen Fitting', 'Built-in Wardrobes', 'Flooring'],
      location: 'London, SE1',
      rating: 4.7,
      reviewCount: 156,
      verified: true,
      profileImage: '/api/placeholder/150/150',
      coverImage: '/api/placeholder/400/200',
      yearsExperience: 15,
      completedJobs: 420,
      responseTime: '4 hours',
      availability: 'busy',
      priceRange: '£40-70/hour',
      badges: ['City & Guilds', 'CSCS', 'Bespoke Specialist'],
      description: 'Master carpenter with 15 years experience in bespoke kitchen and bedroom furniture.',
      portfolio: [
        { id: 1, title: 'Bespoke Kitchen', image: '/api/placeholder/300/200', description: 'Hand-crafted oak kitchen with integrated appliances' },
        { id: 2, title: 'Built-in Wardrobes', image: '/api/placeholder/300/200', description: 'Floor-to-ceiling wardrobes with sliding doors' },
        { id: 3, title: 'Hardwood Flooring', image: '/api/placeholder/300/200', description: 'Engineered oak flooring installation' }
      ],
      reviews: [
        { id: 1, customer: 'Michael R.', rating: 5, comment: 'Incredible craftsmanship on our kitchen. Attention to detail is outstanding.', date: '2024-01-11' },
        { id: 2, customer: 'Anna P.', rating: 4, comment: 'Great work on our wardrobes. Very professional and clean.', date: '2024-01-07' }
      ],
      contactInfo: {
        phone: '07456 789123',
        email: 'james@example.com',
        website: 'www.jamescartercarpentry.co.uk'
      }
    }
  ];

  const categories = ['all', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Roofer', 'Builder', 'Heating Engineer'];

  useEffect(() => {
    setTradespeople(sampleTradespeople);
    setFilteredTradespeople(sampleTradespeople);
  }, []);

  useEffect(() => {
    let filtered = [...tradespeople];

    // Apply filters
    if (filters.category !== 'all') {
      filtered = filtered.filter(tp => tp.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(tp => 
        tp.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(tp => tp.rating >= filters.rating);
    }

    if (filters.verified) {
      filtered = filtered.filter(tp => tp.verified);
    }

    if (filters.availability !== 'all') {
      filtered = filtered.filter(tp => tp.availability === filters.availability);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredTradespeople(filtered);
  }, [filters, sortBy, tradespeople]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < Math.floor(rating) ? '#B9975B' : '#444',
          fontSize: '14px'
        }}
      >
        ★
      </span>
    ));
  };

  const renderBadge = (badge) => {
    const badgeColors = {
      'Gas Safe': '#FF6B6B',
      'NICEIC': '#4ECDC4',
      'City & Guilds': '#45B7D1',
      'CSCS': '#96CEB4',
      'Part P': '#FFEAA7',
      'EV Installer': '#74B9FF',
      'Emergency Response': '#FD79A8',
      'Bespoke Specialist': '#FDCB6E'
    };

    return (
      <span
        key={badge}
        style={{
          backgroundColor: badgeColors[badge] || '#666',
          color: '#000',
          padding: '2px 6px',
          borderRadius: '10px',
          fontSize: '10px',
          fontWeight: 'bold',
          marginRight: '4px',
          marginBottom: '4px',
          display: 'inline-block'
        }}
      >
        {badge}
      </span>
    );
  };

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
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🔍 Find Verified Tradespeople
          </h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px'
          }}>
            Browse profiles, view portfolios, and connect with skilled professionals
          </p>
        </div>

        {/* Filters and Controls */}
        <div style={{
          backgroundColor: '#111',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {/* Category Filter */}
            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '5px'
              }}>
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '5px'
              }}>
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '5px'
              }}>
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.0}>4.0+ Stars</option>
                <option value={3.5}>3.5+ Stars</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '5px'
              }}>
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => updateFilter('availability', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="all">All</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>

          {/* Controls Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {/* Verified Only Toggle */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ccc',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => updateFilter('verified', e.target.checked)}
                style={{
                  accentColor: '#B9975B'
                }}
              />
              Verified Only
            </label>

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
                  padding: '6px 10px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              >
                <option value="rating">Rating</option>
                <option value="reviews">Review Count</option>
                <option value="experience">Experience</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: '#222',
              borderRadius: '6px',
              padding: '2px'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: viewMode === 'grid' ? '#B9975B' : 'transparent',
                  color: viewMode === 'grid' ? '#000' : '#ccc',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: viewMode === 'list' ? '#B9975B' : 'transparent',
                  color: viewMode === 'list' ? '#000' : '#ccc',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                List
              </button>
            </div>

            {/* Results Count */}
            <div style={{
              color: '#888',
              fontSize: '14px'
            }}>
              {filteredTradespeople.length} results found
            </div>
          </div>
        </div>

        {/* Tradespeople Grid/List */}
        <div style={{
          display: viewMode === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : 'none',
          flexDirection: viewMode === 'list' ? 'column' : 'none',
          gap: '20px'
        }}>
          {filteredTradespeople.map(tradesperson => (
            <div
              key={tradesperson.id}
              onClick={() => setSelectedTradesperson(tradesperson)}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #333'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#B9975B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Cover Image */}
                  <div style={{
                    height: '120px',
                    backgroundImage: `url(${tradesperson.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      display: 'flex',
                      gap: '5px'
                    }}>
                      {tradesperson.verified && (
                        <div style={{
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          ✓ VERIFIED
                        </div>
                      )}
                      <div style={{
                        backgroundColor: tradesperson.availability === 'available' ? '#4CAF50' : '#FF9800',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        {tradesperson.availability.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div style={{ padding: '20px' }}>
                    {/* Profile Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <img
                        src={tradesperson.profileImage}
                        alt={tradesperson.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #B9975B'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          color: '#fff',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        }}>
                          {tradesperson.name}
                        </h3>
                        <div style={{
                          color: '#B9975B',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        }}>
                          {tradesperson.category}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '12px'
                        }}>
                          📍 {tradesperson.location}
                        </div>
                      </div>
                    </div>

                    {/* Rating and Stats */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {renderStars(tradesperson.rating)}
                        <span style={{
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          marginLeft: '5px'
                        }}>
                          {tradesperson.rating}
                        </span>
                        <span style={{
                          color: '#888',
                          fontSize: '12px'
                        }}>
                          ({tradesperson.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Key Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        backgroundColor: '#222',
                        padding: '8px',
                        borderRadius: '6px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}>
                          {tradesperson.yearsExperience}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '10px'
                        }}>
                          Years Exp.
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: '#222',
                        padding: '8px',
                        borderRadius: '6px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}>
                          {tradesperson.completedJobs}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '10px'
                        }}>
                          Jobs Done
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{
                        color: '#ccc',
                        fontSize: '12px',
                        marginBottom: '5px'
                      }}>
                        Specialties:
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        {tradesperson.specialties.slice(0, 2).map(specialty => (
                          <span
                            key={specialty}
                            style={{
                              backgroundColor: '#333',
                              color: '#ccc',
                              padding: '2px 6px',
                              borderRadius: '8px',
                              fontSize: '10px'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                        {tradesperson.specialties.length > 2 && (
                          <span style={{
                            color: '#888',
                            fontSize: '10px'
                          }}>
                            +{tradesperson.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div style={{ marginBottom: '15px' }}>
                      {tradesperson.badges.slice(0, 3).map(badge => renderBadge(badge))}
                    </div>

                    {/* Price and Response Time */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <div style={{
                          color: '#4CAF50',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {tradesperson.priceRange}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '10px'
                        }}>
                          Typical Rate
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          color: '#B9975B',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {tradesperson.responseTime}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '10px'
                        }}>
                          Response Time
                        </div>
                      </div>
                    </div>

                    {/* Contact Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTradesperson(tradesperson);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      View Full Profile
                    </button>
                  </div>
                </>
              ) : (
                // List View
                <div style={{
                  display: 'flex',
                  padding: '20px',
                  gap: '20px'
                }}>
                  <img
                    src={tradesperson.profileImage}
                    alt={tradesperson.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #B9975B'
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <h3 style={{
                          color: '#fff',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        }}>
                          {tradesperson.name}
                        </h3>
                        <div style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        }}>
                          {tradesperson.category}
                        </div>
                        <div style={{
                          color: '#888',
                          fontSize: '14px'
                        }}>
                          📍 {tradesperson.location}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        gap: '5px'
                      }}>
                        {tradesperson.verified && (
                          <div style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            ✓ VERIFIED
                          </div>
                        )}
                        <div style={{
                          backgroundColor: tradesperson.availability === 'available' ? '#4CAF50' : '#FF9800',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          {tradesperson.availability.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {renderStars(tradesperson.rating)}
                        <span style={{
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          marginLeft: '5px'
                        }}>
                          {tradesperson.rating}
                        </span>
                        <span style={{
                          color: '#888',
                          fontSize: '12px'
                        }}>
                          ({tradesperson.reviewCount} reviews)
                        </span>
                      </div>
                      
                      <div style={{
                        color: '#4CAF50',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {tradesperson.priceRange}
                      </div>
                      
                      <div style={{
                        color: '#B9975B',
                        fontSize: '12px'
                      }}>
                        Responds in {tradesperson.responseTime}
                      </div>
                    </div>

                    <div style={{
                      color: '#ccc',
                      fontSize: '14px',
                      marginBottom: '10px',
                      lineHeight: '1.4'
                    }}>
                      {tradesperson.description}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      marginBottom: '10px'
                    }}>
                      {tradesperson.badges.map(badge => renderBadge(badge))}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTradesperson(tradesperson);
                      }}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTradespeople.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '24px',
              marginBottom: '10px'
            }}>
              No tradespeople found
            </h3>
            <p style={{
              fontSize: '16px'
            }}>
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>

      {/* Tradesperson Profile Modal */}
      {selectedTradesperson && (
        <TradespersonProfileModal
          tradesperson={selectedTradesperson}
          onClose={() => setSelectedTradesperson(null)}
        />
      )}
    </div>
  );
};

// Tradesperson Profile Modal Component
const TradespersonProfileModal = ({ tradesperson, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < Math.floor(rating) ? '#B9975B' : '#444',
          fontSize: '16px'
        }}
      >
        ★
      </span>
    ));
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

        {/* Cover Image */}
        <div style={{
          height: '200px',
          backgroundImage: `url(${tradesperson.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px 15px 0 0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '30px',
            display: 'flex',
            alignItems: 'end',
            gap: '20px'
          }}>
            <img
              src={tradesperson.profileImage}
              alt={tradesperson.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #B9975B'
              }}
            />
            <div>
              <h2 style={{
                color: '#fff',
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '5px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                {tradesperson.name}
              </h2>
              <div style={{
                color: '#B9975B',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                {tradesperson.category}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #333',
            marginBottom: '30px'
          }}>
            {['overview', 'portfolio', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #B9975B' : '2px solid transparent',
                  color: activeTab === tab ? '#B9975B' : '#ccc',
                  fontSize: '16px',
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
          {activeTab === 'overview' && (
            <div>
              {/* Stats Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {tradesperson.rating}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '5px'
                  }}>
                    Average Rating
                  </div>
                  {renderStars(tradesperson.rating)}
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {tradesperson.reviewCount}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px'
                  }}>
                    Reviews
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {tradesperson.yearsExperience}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px'
                  }}>
                    Years Experience
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {tradesperson.completedJobs}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px'
                  }}>
                    Jobs Completed
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  About {tradesperson.name}
                </h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  {tradesperson.description}
                </p>
              </div>

              {/* Specialties */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Specialties
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {tradesperson.specialties.map(specialty => (
                    <span
                      key={specialty}
                      style={{
                        backgroundColor: '#333',
                        color: '#ccc',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '14px'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Certifications & Badges
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {tradesperson.badges.map(badge => (
                    <span
                      key={badge}
                      style={{
                        backgroundColor: '#B9975B',
                        color: '#000',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Contact Information
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px'
                }}>
                  <div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>
                      Phone
                    </div>
                    <div style={{
                      color: '#fff',
                      fontSize: '16px'
                    }}>
                      {tradesperson.contactInfo.phone}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>
                      Email
                    </div>
                    <div style={{
                      color: '#fff',
                      fontSize: '16px'
                    }}>
                      {tradesperson.contactInfo.email}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>
                      Website
                    </div>
                    <div style={{
                      color: '#B9975B',
                      fontSize: '16px'
                    }}>
                      {tradesperson.contactInfo.website}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h3 style={{
                color: '#B9975B',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                Portfolio
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {tradesperson.portfolio.map(item => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#222',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ padding: '15px' }}>
                      <h4 style={{
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 style={{
                color: '#B9975B',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>
                Customer Reviews
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {tradesperson.reviews.map(review => (
                  <div
                    key={review.id}
                    style={{
                      backgroundColor: '#222',
                      padding: '20px',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <div style={{
                          color: '#fff',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          marginBottom: '5px'
                        }}>
                          {review.customer}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div style={{
                        color: '#888',
                        fontSize: '12px'
                      }}>
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p style={{
                      color: '#ccc',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Button */}
          <div style={{
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <button
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '10px',
                color: '#000',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💬 Contact {tradesperson.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicTradespersonDirectory;
