// This file contains all the missing pages referenced in the navigation menu
// Each component is a fully functional page with real content

import React, { useState } from 'react';

// About HTK Page
export const AboutHTK = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#000',
    padding: '20px'
  }}>
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#B9975B',
          fontSize: '36px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>About HTK Platform</h1>
        <p style={{
          color: '#ccc',
          fontSize: '18px',
          margin: 0
        }}>Built by trades, for trades • Community-focused • Zero commission fees</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>🎯 Our Mission</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            To create a fair, community-driven platform where skilled tradespeople can connect directly with customers without exploitative commission fees. We believe in empowering trades through technology, not extracting profit from their hard work.
          </p>
        </div>

        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>🤝 Community First</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            HTK operates on a community profit-sharing model. Once we reach £100,000 in profit, 50% goes back to the communities we serve. This ensures our success directly benefits the tradespeople and customers who make it possible.
          </p>
        </div>

        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>💰 Fair Economics</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            No pay-per-lead roulette. Our credit system (£1 = 1 credit) gives tradespeople predictable costs and access to quality leads. Job leads are priced fairly from £3-£100 based on actual value, not arbitrary markups.
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '40px',
        borderRadius: '15px',
        border: '1px solid #333',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '28px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>Why HTK is Different</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginTop: '30px'
        }}>
          <div>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🚫</div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>No Commission Fees</h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Keep 100% of what you earn</p>
          </div>
          
          <div>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏘️</div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Community Owned</h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Profits shared with communities</p>
          </div>
          
          <div>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔧</div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Built by Trades</h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Created by tradespeople who understand the industry</p>
          </div>
          
          <div>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚡</div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Modern Tools</h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Advanced features that actually help your business</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// FAQ Page
export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const faqs = [
    {
      question: "How does HTK's credit system work?",
      answer: "HTK uses a simple credit system where £1 = 1 credit. You purchase credits in packages and use them to access job leads. Job leads are priced from £3-£100 based on the actual value and complexity of the work, not arbitrary markups."
    },
    {
      question: "Are there any commission fees?",
      answer: "No! HTK charges zero commission fees. You keep 100% of what you earn from jobs. We only charge for access to leads through our fair credit system, but we never take a percentage of your earnings."
    },
    {
      question: "How does community profit sharing work?",
      answer: "Once HTK reaches £100,000 in profit, 50% of all future profits are shared back with the communities we serve. This ensures our success directly benefits the tradespeople and customers who make it possible."
    },
    {
      question: "What makes HTK different from other platforms?",
      answer: "HTK is built by tradespeople for tradespeople. We focus on community benefit rather than profit extraction, offer zero commission fees, provide modern tools that actually help your business, and share profits with the communities we serve."
    },
    {
      question: "How do I get verified on HTK?",
      answer: "Our verification system includes skills badges (Gas Safe, NICEIC, City & Guilds), work proof stack with before/after photos, GPS verification, and professional credentials. Verified members get priority in search results and access to premium leads."
    },
    {
      question: "Can I collaborate with other tradespeople?",
      answer: "Yes! HTK includes a trade-to-trade forum, peer endorsement system, shared apprentice pool, and community projects. You can collaborate on jobs, share knowledge, and build professional relationships."
    }
  ];

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
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>Frequently Asked Questions</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            margin: 0
          }}>Get answers to common questions about HTK platform</p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#111',
                borderRadius: '15px',
                border: '1px solid #333',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin: 0
                }}>{faq.question}</h3>
                <span style={{
                  color: '#B9975B',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {openFAQ === index ? '−' : '+'}
                </span>
              </button>
              
              {openFAQ === index && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid #333'
                }}>
                  <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    margin: 0,
                    paddingTop: '15px'
                  }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Community Guidelines Page
export const CommunityGuidelines = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#000',
    padding: '20px'
  }}>
    <div style={{
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#B9975B',
          fontSize: '36px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>Community Guidelines</h1>
        <p style={{
          color: '#ccc',
          fontSize: '18px',
          margin: 0
        }}>Building a respectful, professional community for all trades</p>
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '30px',
        borderRadius: '15px',
        border: '1px solid #333',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '24px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>🤝 Professional Conduct</h2>
        
        <ul style={{
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>Treat all members with respect and professionalism</li>
          <li>Communicate clearly and honestly about your skills and availability</li>
          <li>Honor your commitments and complete work to professional standards</li>
          <li>Provide accurate information in your profile and job applications</li>
          <li>Respond promptly to messages and job inquiries</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '30px',
        borderRadius: '15px',
        border: '1px solid #333',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '24px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>🚫 Prohibited Activities</h2>
        
        <ul style={{
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>Harassment, discrimination, or abusive behavior</li>
          <li>Posting false or misleading information</li>
          <li>Attempting to circumvent the platform for direct payments</li>
          <li>Spam, irrelevant content, or excessive self-promotion</li>
          <li>Sharing personal contact information in public forums</li>
          <li>Impersonating other users or businesses</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '30px',
        borderRadius: '15px',
        border: '1px solid #333',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '24px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>⭐ Quality Standards</h2>
        
        <ul style={{
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>Maintain professional certifications and insurance</li>
          <li>Provide high-quality work that meets industry standards</li>
          <li>Use appropriate safety measures and follow regulations</li>
          <li>Keep your profile and credentials up to date</li>
          <li>Share knowledge and help other community members</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#222',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #B9975B',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#B9975B',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>Report Issues</h3>
        <p style={{
          color: '#ccc',
          fontSize: '16px',
          marginBottom: '20px'
        }}>
          If you encounter any violations of these guidelines, please report them immediately through our support system.
        </p>
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
          border: 'none',
          borderRadius: '8px',
          color: '#000',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Report Issue
        </button>
      </div>
    </div>
  </div>
);

// Investment & Partnership Page
export const InvestmentPartnership = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#000',
    padding: '20px'
  }}>
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#B9975B',
          fontSize: '36px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>Investment & Partnership</h1>
        <p style={{
          color: '#ccc',
          fontSize: '18px',
          margin: 0
        }}>Join us in revolutionizing the trades industry • Community-focused growth • Sustainable returns</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>💼 Investment Opportunities</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            HTK offers unique investment opportunities in a growing market with a community-first approach. Our sustainable business model focuses on long-term value creation rather than short-term profit extraction.
          </p>
          <ul style={{
            color: '#ccc',
            fontSize: '14px',
            paddingLeft: '20px'
          }}>
            <li>Community profit sharing model</li>
            <li>Sustainable growth strategy</li>
            <li>Proven market demand</li>
            <li>Experienced founding team</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>🤝 Strategic Partnerships</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            We're seeking strategic partnerships with trade suppliers, training organizations, and industry bodies to enhance our platform and provide additional value to our community.
          </p>
          <ul style={{
            color: '#ccc',
            fontSize: '14px',
            paddingLeft: '20px'
          }}>
            <li>Trade supplier partnerships</li>
            <li>Training provider integration</li>
            <li>Industry body collaboration</li>
            <li>Technology partnerships</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>📈 Market Opportunity</h2>
          <p style={{
            color: '#ccc',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            The UK trades market is worth over £100 billion annually, with growing demand for digital solutions that serve both tradespeople and customers fairly.
          </p>
          <ul style={{
            color: '#ccc',
            fontSize: '14px',
            paddingLeft: '20px'
          }}>
            <li>£100B+ annual market size</li>
            <li>Growing digital adoption</li>
            <li>Demand for fair platforms</li>
            <li>Community-focused approach</li>
          </ul>
        </div>
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '40px',
        borderRadius: '15px',
        border: '1px solid #333',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '28px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>Get Involved</h2>
        
        <p style={{
          color: '#ccc',
          fontSize: '18px',
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto 30px auto'
        }}>
          Whether you're an investor looking for sustainable returns or a business seeking strategic partnership opportunities, we'd love to hear from you.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '15px 30px',
            background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            💼 Investment Enquiry
          </button>
          
          <button style={{
            padding: '15px 30px',
            backgroundColor: 'transparent',
            border: '2px solid #B9975B',
            borderRadius: '10px',
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            🤝 Partnership Enquiry
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Pricing Page
export const Pricing = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#000',
    padding: '20px'
  }}>
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#B9975B',
          fontSize: '36px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>Pricing & Credits</h1>
        <p style={{
          color: '#ccc',
          fontSize: '18px',
          margin: 0
        }}>Fair, transparent pricing • No commission fees • £1 = 1 credit</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        {[
          { name: 'Starter', credits: 10, price: 10, popular: false },
          { name: 'Professional', credits: 50, price: 45, popular: true },
          { name: 'Business', credits: 100, price: 85, popular: false },
          { name: 'Enterprise', credits: 250, price: 200, popular: false }
        ].map((package_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#111',
              borderRadius: '15px',
              border: package_.popular ? '2px solid #B9975B' : '1px solid #333',
              padding: '30px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {package_.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#B9975B',
                color: '#000',
                padding: '5px 20px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>{package_.name}</h3>
            
            <div style={{
              marginBottom: '20px'
            }}>
              <span style={{
                color: '#4CAF50',
                fontSize: '36px',
                fontWeight: 'bold'
              }}>£{package_.price}</span>
              <span style={{
                color: '#888',
                fontSize: '16px'
              }}> for {package_.credits} credits</span>
            </div>
            
            <p style={{
              color: '#ccc',
              fontSize: '14px',
              marginBottom: '25px'
            }}>
              {package_.credits > package_.price ? 
                `Save £${package_.credits - package_.price}!` : 
                'Standard rate'
              }
            </p>
            
            <button style={{
              width: '100%',
              padding: '12px',
              background: package_.popular ? 
                'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)' : 
                'transparent',
              border: package_.popular ? 'none' : '1px solid #B9975B',
              borderRadius: '8px',
              color: package_.popular ? '#000' : '#B9975B',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Purchase Credits
            </button>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '30px',
        borderRadius: '15px',
        border: '1px solid #333',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#B9975B',
          fontSize: '24px',
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>How Job Pricing Works</h2>
        
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
            <h4 style={{
              color: '#4CAF50',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Small Jobs</h4>
            <p style={{
              color: '#B9975B',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>£3-£15</p>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Quick fixes, small repairs, consultations</p>
          </div>
          
          <div style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{
              color: '#2196F3',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Medium Jobs</h4>
            <p style={{
              color: '#B9975B',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>£20-£50</p>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Installations, renovations, multi-day work</p>
          </div>
          
          <div style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{
              color: '#FF9800',
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>Large Jobs</h4>
            <p style={{
              color: '#B9975B',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>£60-£100</p>
            <p style={{
              color: '#ccc',
              fontSize: '14px'
            }}>Major projects, commercial work, high-value contracts</p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#222',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #B9975B',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#B9975B',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>🚫 Zero Commission Fees</h3>
        <p style={{
          color: '#ccc',
          fontSize: '16px',
          margin: 0
        }}>
          Unlike other platforms, HTK charges zero commission on your earnings. You keep 100% of what you make from jobs. 
          We only charge fair, transparent prices for access to quality leads.
        </p>
      </div>
    </div>
  </div>
);

export default {
  AboutHTK,
  FAQ,
  CommunityGuidelines,
  InvestmentPartnership,
  Pricing
};
