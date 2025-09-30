import React, { useState, useEffect } from 'react';

const GroupBuyingSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState('London');
  const [savedAmount, setSavedAmount] = useState(1247);
  const [membershipTier, setMembershipTier] = useState('Professional');

  const merchantPartners = [
    {
      id: 'toolstation',
      name: 'Toolstation',
      logo: '🔧',
      category: 'tools',
      discount: '15%',
      description: 'Professional tools and equipment',
      locations: 'Nationwide',
      specialOffers: ['Free delivery on orders over £25', 'Extended warranty on power tools'],
      currentDeals: [
        { item: 'DeWalt 18V Drill Set', originalPrice: 199, discountPrice: 169, savings: 30 },
        { item: 'Stanley Tool Box', originalPrice: 45, discountPrice: 38, savings: 7 }
      ],
      memberBenefit: 'Additional 5% on bulk orders',
      verified: true
    },
    {
      id: 'selco',
      name: 'Selco Builders Warehouse',
      logo: '🏗️',
      category: 'materials',
      discount: '12%',
      description: 'Building materials and supplies',
      locations: '70+ branches UK wide',
      specialOffers: ['Trade account benefits', 'Bulk delivery discounts'],
      currentDeals: [
        { item: 'Plasterboard 12.5mm', originalPrice: 8.50, discountPrice: 7.48, savings: 1.02 },
        { item: 'Insulation Roll 100mm', originalPrice: 24, discountPrice: 21, savings: 3 }
      ],
      memberBenefit: 'Priority delivery slots',
      verified: true
    },
    {
      id: 'screwfix',
      name: 'Screwfix',
      logo: '🔩',
      category: 'tools',
      discount: '10%',
      description: 'Tools, accessories and hardware',
      locations: '800+ stores nationwide',
      specialOffers: ['Click & Collect in 5 minutes', '30-day returns'],
      currentDeals: [
        { item: 'Bosch Multi-tool', originalPrice: 89, discountPrice: 80, savings: 9 },
        { item: 'Screwfix Workbench', originalPrice: 129, discountPrice: 116, savings: 13 }
      ],
      memberBenefit: 'Express checkout lane',
      verified: true
    },
    {
      id: 'wickes',
      name: 'Wickes',
      logo: '🏠',
      category: 'materials',
      discount: '8%',
      description: 'Home improvement and building supplies',
      locations: '230+ stores',
      specialOffers: ['Design service included', 'Installation available'],
      currentDeals: [
        { item: 'Kitchen Worktop Oak', originalPrice: 85, discountPrice: 78, savings: 7 },
        { item: 'Bathroom Tiles 60x30', originalPrice: 32, discountPrice: 29, savings: 3 }
      ],
      memberBenefit: 'Free design consultation',
      verified: true
    },
    {
      id: 'travis_perkins',
      name: 'Travis Perkins',
      logo: '🚛',
      category: 'materials',
      discount: '15%',
      description: 'Building materials and merchant services',
      locations: '600+ branches',
      specialOffers: ['Trade credit accounts', 'Same day delivery'],
      currentDeals: [
        { item: 'Cement 25kg Bag', originalPrice: 4.20, discountPrice: 3.57, savings: 0.63 },
        { item: 'Timber 2x4 3m', originalPrice: 6.80, discountPrice: 5.78, savings: 1.02 }
      ],
      memberBenefit: 'Extended credit terms',
      verified: true
    },
    {
      id: 'plumb_center',
      name: 'Plumb Center',
      logo: '🚿',
      category: 'plumbing',
      discount: '18%',
      description: 'Plumbing and heating supplies',
      locations: '400+ branches',
      specialOffers: ['Technical support hotline', 'Next day delivery'],
      currentDeals: [
        { item: 'Worcester Boiler 24kW', originalPrice: 1200, discountPrice: 984, savings: 216 },
        { item: 'Copper Pipe 15mm x 3m', originalPrice: 12, discountPrice: 9.84, savings: 2.16 }
      ],
      memberBenefit: 'Priority technical support',
      verified: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Partners', icon: '🏪', count: merchantPartners.length },
    { id: 'tools', name: 'Tools & Equipment', icon: '🔧', count: merchantPartners.filter(m => m.category === 'tools').length },
    { id: 'materials', name: 'Building Materials', icon: '🧱', count: merchantPartners.filter(m => m.category === 'materials').length },
    { id: 'plumbing', name: 'Plumbing & Heating', icon: '🚿', count: merchantPartners.filter(m => m.category === 'plumbing').length },
    { id: 'electrical', name: 'Electrical Supplies', icon: '⚡', count: 0 },
    { id: 'safety', name: 'Safety Equipment', icon: '🦺', count: 0 }
  ];

  const membershipTiers = [
    {
      name: 'Starter',
      discount: '5-8%',
      color: '#666',
      benefits: ['Basic merchant discounts', 'Monthly deals newsletter']
    },
    {
      name: 'Professional',
      discount: '10-15%',
      color: '#B9975B',
      benefits: ['Enhanced discounts', 'Priority customer service', 'Bulk order benefits']
    },
    {
      name: 'Business',
      discount: '15-20%',
      color: '#4CAF50',
      benefits: ['Maximum discounts', 'Credit account support', 'Dedicated account manager']
    }
  ];

  const recentSavings = [
    { merchant: 'Toolstation', item: 'Power Tools', saved: 45, date: '2024-09-28' },
    { merchant: 'Selco', item: 'Building Materials', saved: 78, date: '2024-09-25' },
    { merchant: 'Screwfix', item: 'Hardware', saved: 23, date: '2024-09-22' },
    { merchant: 'Travis Perkins', item: 'Timber', saved: 34, date: '2024-09-20' }
  ];

  const filteredMerchants = selectedCategory === 'all' 
    ? merchantPartners 
    : merchantPartners.filter(merchant => merchant.category === selectedCategory);

  const totalSavingsThisMonth = recentSavings.reduce((total, saving) => total + saving.saved, 0);

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
          }}>HTK Group Buying Power</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            marginBottom: '30px'
          }}>Exclusive discounts at major trade suppliers • Savings that offset your subscription</p>
          
          {/* Savings Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#111',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #4CAF50'
            }}>
              <h3 style={{
                color: '#4CAF50',
                fontSize: '32px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>£{savedAmount}</h3>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>Total Saved This Year</p>
            </div>
            
            <div style={{
              backgroundColor: '#111',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #B9975B'
            }}>
              <h3 style={{
                color: '#B9975B',
                fontSize: '32px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>£{totalSavingsThisMonth}</h3>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>Saved This Month</p>
            </div>
            
            <div style={{
              backgroundColor: '#111',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #FF9800'
            }}>
              <h3 style={{
                color: '#FF9800',
                fontSize: '24px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>{membershipTier}</h3>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>Membership Tier</p>
            </div>
            
            <div style={{
              backgroundColor: '#111',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #2196F3'
            }}>
              <h3 style={{
                color: '#2196F3',
                fontSize: '32px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>{merchantPartners.length}</h3>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>Partner Merchants</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '12px 20px',
                backgroundColor: selectedCategory === category.id ? '#B9975B' : '#222',
                color: selectedCategory === category.id ? '#000' : '#fff',
                border: `1px solid ${selectedCategory === category.id ? '#B9975B' : '#555'}`,
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{category.icon}</span>
              {category.name}
              <span style={{
                backgroundColor: selectedCategory === category.id ? '#000' : '#B9975B',
                color: selectedCategory === category.id ? '#B9975B' : '#000',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginLeft: '5px'
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Merchant Partners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                border: '2px solid #333',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Merchant Header */}
              <div style={{
                padding: '25px',
                borderBottom: '1px solid #333'
              }}>
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
                    <div style={{
                      fontSize: '40px',
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#222',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {merchant.logo}
                    </div>
                    
                    <div>
                      <h3 style={{
                        color: '#B9975B',
                        fontSize: '22px',
                        marginBottom: '5px',
                        fontWeight: 'bold'
                      }}>{merchant.name}</h3>
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        margin: 0
                      }}>{merchant.description}</p>
                    </div>
                  </div>
                  
                  <div style={{
                    textAlign: 'right'
                  }}>
                    <div style={{
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>
                      {merchant.discount} OFF
                    </div>
                    
                    {merchant.verified && (
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>✓ VERIFIED PARTNER</span>
                    )}
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>LOCATIONS</p>
                    <p style={{
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{merchant.locations}</p>
                  </div>
                  
                  <div>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      marginBottom: '5px'
                    }}>MEMBER BENEFIT</p>
                    <p style={{
                      color: '#B9975B',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{merchant.memberBenefit}</p>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#222',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>Special Offers</h4>
                  <ul style={{
                    color: '#ccc',
                    fontSize: '14px',
                    margin: 0,
                    paddingLeft: '20px'
                  }}>
                    {merchant.specialOffers.map((offer, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>{offer}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Current Deals */}
              <div style={{ padding: '25px' }}>
                <h4 style={{
                  color: '#fff',
                  fontSize: '18px',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>Current Deals</h4>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {merchant.currentDeals.map((deal, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#222',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #333'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h5 style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>{deal.item}</h5>
                        
                        <span style={{
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          SAVE £{deal.savings}
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                      }}>
                        <span style={{
                          color: '#888',
                          fontSize: '14px',
                          textDecoration: 'line-through'
                        }}>£{deal.originalPrice}</span>
                        
                        <span style={{
                          color: '#4CAF50',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>£{deal.discountPrice}</span>
                        
                        <span style={{
                          color: '#ccc',
                          fontSize: '14px'
                        }}>HTK Member Price</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '20px'
                  }}
                >
                  View All Deals & Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Tiers */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Membership Tiers & Benefits</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: tier.name === membershipTier ? '#222' : '#111',
                  border: tier.name === membershipTier ? `2px solid ${tier.color}` : '1px solid #333',
                  borderRadius: '15px',
                  padding: '30px',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {tier.name === membershipTier && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: tier.color,
                    color: '#000',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    CURRENT TIER
                  </div>
                )}
                
                <h3 style={{
                  color: tier.color,
                  fontSize: '24px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>{tier.name}</h3>
                
                <div style={{
                  fontSize: '32px',
                  color: tier.color,
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>{tier.discount}</div>
                
                <p style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '20px'
                }}>Average Discount Range</p>
                
                <ul style={{
                  color: '#ccc',
                  fontSize: '14px',
                  textAlign: 'left',
                  margin: 0,
                  paddingLeft: '20px'
                }}>
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} style={{ marginBottom: '8px' }}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Savings */}
        <div>
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Your Recent Savings</h2>
          
          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '1px solid #333',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #333',
              backgroundColor: '#222'
            }}>
              <h3 style={{
                color: '#B9975B',
                fontSize: '20px',
                margin: 0,
                fontWeight: 'bold'
              }}>Savings History</h3>
            </div>
            
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {recentSavings.map((saving, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      backgroundColor: '#222',
                      borderRadius: '8px',
                      border: '1px solid #333'
                    }}
                  >
                    <div>
                      <h4 style={{
                        color: '#B9975B',
                        fontSize: '16px',
                        marginBottom: '5px',
                        fontWeight: 'bold'
                      }}>{saving.merchant}</h4>
                      <p style={{
                        color: '#ccc',
                        fontSize: '14px',
                        margin: 0
                      }}>{saving.item}</p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        color: '#4CAF50',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                      }}>£{saving.saved} saved</div>
                      <p style={{
                        color: '#888',
                        fontSize: '12px',
                        margin: 0
                      }}>{new Date(saving.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#4CAF50',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '24px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>Total Monthly Savings: £{totalSavingsThisMonth}</h3>
                <p style={{
                  color: '#fff',
                  fontSize: '16px',
                  margin: 0
                }}>Your HTK membership has already paid for itself!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBuyingSystem;
