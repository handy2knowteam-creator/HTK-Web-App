import React, { useState, useEffect } from 'react';

const SearchSystem = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    radius: '10',
    rating: '',
    verified: false,
    availability: ''
  });

  const categories = [
    'Plumber', 'Electrician', 'Builder', 'Carpenter', 'Painter/Decorator',
    'Roofer', 'Gardener', 'Heating Engineer', 'Kitchen Fitter', 'Bathroom Fitter',
    'Flooring Specialist', 'Plasterer', 'Tiler', 'Locksmith', 'Glazier'
  ];

  const mockResults = [
    {
      id: 1,
      name: 'Mike Thompson',
      trade: 'Plumber',
      location: 'Manchester',
      distance: '2.3 miles',
      rating: 4.9,
      reviews: 127,
      verified: true,
      available: 'This week',
      image: '/api/placeholder/80/80',
      specialties: ['Emergency repairs', 'Bathroom installations', 'Boiler servicing'],
      hourlyRate: '£45-65',
      responseTime: '< 2 hours'
    },
    {
      id: 2,
      name: 'Sarah Davies',
      trade: 'Electrician',
      location: 'Birmingham',
      distance: '1.8 miles',
      rating: 4.8,
      reviews: 89,
      verified: true,
      available: 'Next week',
      image: '/api/placeholder/80/80',
      specialties: ['Rewiring', 'EV charger installation', 'Smart home systems'],
      hourlyRate: '£50-70',
      responseTime: '< 1 hour'
    },
    {
      id: 3,
      name: 'James Wilson',
      trade: 'Builder',
      location: 'Leeds',
      distance: '3.1 miles',
      rating: 4.7,
      reviews: 156,
      verified: true,
      available: 'Available now',
      image: '/api/placeholder/80/80',
      specialties: ['Extensions', 'Renovations', 'New builds'],
      hourlyRate: '£40-60',
      responseTime: '< 3 hours'
    }
  ];

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults.filter(result => 
        (selectedCategory === '' || result.trade === selectedCategory) &&
        (searchQuery === '' || result.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         result.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
      ));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchQuery || selectedCategory || location) {
      handleSearch();
    }
  }, [searchQuery, selectedCategory, location]);

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
          }}>Find Skilled Tradespeople</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            margin: 0
          }}>Search verified professionals in your area</p>
        </div>

        {/* Search Bar */}
        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '8px'
              }}>What do you need?</label>
              <input
                type="text"
                placeholder="e.g. plumber, fix leak, install boiler"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '8px'
              }}>Location</label>
              <input
                type="text"
                placeholder="Enter postcode or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{
                color: '#B9975B',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '8px'
              }}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              >
                <option value="">All categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingTop: '20px',
            borderTop: '1px solid #333'
          }}>
            <div>
              <label style={{
                color: '#ccc',
                fontSize: '14px',
                marginRight: '10px'
              }}>Radius:</label>
              <select
                value={filters.radius}
                onChange={(e) => setFilters({...filters, radius: e.target.value})}
                style={{
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="50">50 miles</option>
              </select>
            </div>

            <div>
              <label style={{
                color: '#ccc',
                fontSize: '14px',
                marginRight: '10px'
              }}>Min Rating:</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                style={{
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="">Any rating</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4.0">4.0+ stars</option>
                <option value="3.5">3.5+ stars</option>
              </select>
            </div>

            <label style={{
              color: '#ccc',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Verified only
            </label>

            <button
              onClick={handleSearch}
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
              🔍 Search
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#ccc'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
            Searching for tradespeople...
          </div>
        ) : (
          <div>
            <div style={{
              color: '#ccc',
              fontSize: '16px',
              marginBottom: '20px'
            }}>
              Found {results.length} tradespeople {location && `near ${location}`}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {results.map(result => (
                <div
                  key={result.id}
                  style={{
                    backgroundColor: '#111',
                    borderRadius: '15px',
                    border: '1px solid #333',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#B9975B';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '15px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#333',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      🔧
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '5px'
                      }}>
                        <h3 style={{
                          color: '#B9975B',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>{result.name}</h3>
                        {result.verified && (
                          <span style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>✓ VERIFIED</span>
                        )}
                      </div>

                      <p style={{
                        color: '#ccc',
                        fontSize: '16px',
                        margin: '0 0 5px 0'
                      }}>{result.trade} • {result.location}</p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <span style={{ color: '#FFD700' }}>⭐</span>
                          <span style={{ color: '#fff', fontWeight: 'bold' }}>{result.rating}</span>
                          <span style={{ color: '#888', fontSize: '14px' }}>({result.reviews} reviews)</span>
                        </div>
                        <span style={{ color: '#888', fontSize: '14px' }}>{result.distance}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginBottom: '10px'
                      }}>
                        {result.specialties.slice(0, 2).map(specialty => (
                          <span
                            key={specialty}
                            style={{
                              backgroundColor: '#333',
                              color: '#B9975B',
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
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid #333'
                  }}>
                    <div>
                      <div style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '14px' }}>
                        {result.hourlyRate}/hour
                      </div>
                      <div style={{ color: '#888', fontSize: '12px' }}>
                        Responds {result.responseTime}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '10px'
                    }}>
                      <button style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        border: '1px solid #B9975B',
                        borderRadius: '6px',
                        color: '#B9975B',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}>
                        View Profile
                      </button>
                      <button style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSystem;
