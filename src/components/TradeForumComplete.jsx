import React, { useState, useEffect } from 'react';

const TradeForumComplete = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📋', color: '#B9975B' },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#2196F3' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', color: '#FF9800' },
    { id: 'carpentry', name: 'Carpentry', icon: '🪚', color: '#8BC34A' },
    { id: 'painting', name: 'Painting', icon: '🎨', color: '#E91E63' },
    { id: 'roofing', name: 'Roofing', icon: '🏠', color: '#795548' },
    { id: 'general', name: 'General', icon: '💬', color: '#9C27B0' },
    { id: 'tools', name: 'Tools & Equipment', icon: '🔨', color: '#FF5722' },
    { id: 'regulations', name: 'Regulations', icon: '📜', color: '#607D8B' }
  ];

  // Sample forum posts
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        title: 'Best practice for kitchen sink installation?',
        content: 'Working on a kitchen renovation and wondering about the best approach for installing an undermount sink. Any tips on sealing and support?',
        author: 'Mike_Plumber',
        authorRating: 4.8,
        authorBadges: ['Gas Safe', 'CIPHE Member'],
        category: 'plumbing',
        tags: ['kitchen', 'sink', 'installation'],
        timestamp: '2024-09-30T10:30:00Z',
        likes: 12,
        replies: 8,
        views: 156,
        isHelpful: true,
        location: 'London',
        responses: [
          {
            id: 1,
            author: 'Dave_Kitchen_Pro',
            authorRating: 4.9,
            authorBadges: ['20+ Years', 'Kitchen Specialist'],
            content: 'Always use a proper mounting system. I recommend Blanco or Franke mounting clips. Make sure to seal with high-quality silicone.',
            timestamp: '2024-09-30T11:15:00Z',
            likes: 8,
            isAccepted: true
          },
          {
            id: 2,
            author: 'Sarah_Renovations',
            authorRating: 4.7,
            authorBadges: ['Verified Pro'],
            content: 'Don\'t forget to check the cabinet structure can handle the weight, especially with granite worktops.',
            timestamp: '2024-09-30T12:00:00Z',
            likes: 5
          }
        ]
      },
      {
        id: 2,
        title: 'New Part P regulations - what\'s changed?',
        content: 'Can anyone clarify the recent updates to Part P regulations? Particularly around bathroom installations and notification requirements.',
        author: 'ElectricExpert',
        authorRating: 4.9,
        authorBadges: ['NICEIC Approved', 'Part P Qualified'],
        category: 'electrical',
        tags: ['regulations', 'part-p', 'bathroom'],
        timestamp: '2024-09-29T14:20:00Z',
        likes: 24,
        replies: 15,
        views: 342,
        isHelpful: true,
        location: 'Manchester',
        responses: [
          {
            id: 3,
            author: 'RegulationsGuru',
            authorRating: 5.0,
            authorBadges: ['Building Control', 'Regulations Expert'],
            content: 'The main changes affect zones 1 and 2. New requirements for RCD protection on all circuits. I\'ll post the full breakdown later.',
            timestamp: '2024-09-29T15:30:00Z',
            likes: 18,
            isAccepted: true
          }
        ]
      },
      {
        id: 3,
        title: 'Recommend good quality chisels under £100?',
        content: 'Looking to upgrade my chisel set. What brands do you recommend for mortise and paring chisels? Budget around £100.',
        author: 'WoodworkWizard',
        authorRating: 4.6,
        authorBadges: ['City & Guilds', 'Joinery Specialist'],
        category: 'tools',
        tags: ['chisels', 'tools', 'woodworking'],
        timestamp: '2024-09-28T16:45:00Z',
        likes: 18,
        replies: 12,
        views: 289,
        location: 'Birmingham',
        responses: [
          {
            id: 4,
            author: 'ToolReviewer',
            authorRating: 4.8,
            authorBadges: ['Tool Expert', '15+ Years'],
            content: 'Narex chisels are excellent value. Ashley Iles if you can stretch the budget slightly. Avoid the cheap sets from big box stores.',
            timestamp: '2024-09-28T17:20:00Z',
            likes: 12,
            isAccepted: true
          }
        ]
      },
      {
        id: 4,
        title: 'Anyone else struggling with material costs?',
        content: 'Copper prices have gone through the roof again. How are you handling pricing with customers when material costs keep fluctuating?',
        author: 'PlumbingBusiness',
        authorRating: 4.7,
        authorBadges: ['Business Owner', 'Gas Safe'],
        category: 'general',
        tags: ['business', 'pricing', 'materials'],
        timestamp: '2024-09-27T09:15:00Z',
        likes: 31,
        replies: 22,
        views: 445,
        location: 'Leeds',
        responses: []
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handleNewPost = () => {
    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: 'YourUsername',
      authorRating: 4.5,
      authorBadges: ['HTK Member'],
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0,
      views: 1,
      location: 'Your Location',
      responses: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'general', tags: '' });
    setShowNewPost(false);
  };

  const handleLike = (postId, responseId = null) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (responseId) {
          return {
            ...post,
            responses: post.responses.map(response =>
              response.id === responseId
                ? { ...response, likes: response.likes + 1 }
                : response
            )
          };
        } else {
          return { ...post, likes: post.likes + 1 };
        }
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
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
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#B9975B',
            fontSize: '36px',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>Trade-to-Trade Forum</h1>
          <p style={{
            color: '#ccc',
            fontSize: '18px',
            marginBottom: '30px'
          }}>Connect, share knowledge, and grow together • Reddit for trades</p>
          
          {/* Search and New Post */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <input
              type="text"
              placeholder="Search posts, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 20px',
                backgroundColor: '#222',
                border: '1px solid #B9975B',
                borderRadius: '25px',
                color: '#fff',
                fontSize: '16px',
                width: '300px',
                maxWidth: '100%'
              }}
            />
            
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                border: 'none',
                borderRadius: '25px',
                color: '#000',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              + New Post
            </button>
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
                padding: '10px 20px',
                backgroundColor: selectedCategory === category.id ? category.color : '#222',
                color: selectedCategory === category.id ? '#000' : '#fff',
                border: `1px solid ${category.color}`,
                borderRadius: '20px',
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
            </button>
          ))}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div style={{
            backgroundColor: '#111',
            padding: '30px',
            borderRadius: '15px',
            border: '2px solid #B9975B',
            marginBottom: '30px'
          }}>
            <h3 style={{
              color: '#B9975B',
              fontSize: '24px',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>Create New Post</h3>
            
            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#ccc',
                  fontSize: '14px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="What's your question or topic?"
                />
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#ccc',
                    fontSize: '14px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#222',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#ccc',
                    fontSize: '14px',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#222',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g. installation, tools, safety"
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  color: '#ccc',
                  fontSize: '14px',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  style={{
                    width: '100%',
                    height: '120px',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Share your knowledge, ask for advice, or start a discussion..."
                />
              </div>
              
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowNewPost(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #666',
                    borderRadius: '8px',
                    color: '#ccc',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleNewPost}
                  disabled={!newPost.title || !newPost.content}
                  style={{
                    padding: '10px 20px',
                    background: newPost.title && newPost.content 
                      ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)' 
                      : '#666',
                    border: 'none',
                    borderRadius: '8px',
                    color: newPost.title && newPost.content ? '#000' : '#ccc',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: newPost.title && newPost.content ? 'pointer' : 'not-allowed'
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {filteredPosts.map((post) => {
            const categoryInfo = getCategoryInfo(post.category);
            
            return (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: '1px solid #333',
                  overflow: 'hidden'
                }}
              >
                {/* Post Header */}
                <div style={{
                  padding: '25px',
                  borderBottom: '1px solid #333'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '15px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                        flexWrap: 'wrap'
                      }}>
                        <span
                          style={{
                            backgroundColor: categoryInfo.color,
                            color: '#000',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                        
                        {post.isHelpful && (
                          <span style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            ✓ HELPFUL
                          </span>
                        )}
                      </div>
                      
                      <h3 style={{
                        color: '#B9975B',
                        fontSize: '22px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}>{post.title}</h3>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        flexWrap: 'wrap',
                        marginBottom: '15px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            color: '#B9975B',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}>{post.author}</span>
                          
                          <span style={{
                            color: '#FFD700',
                            fontSize: '14px'
                          }}>⭐ {post.authorRating}</span>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          gap: '5px',
                          flexWrap: 'wrap'
                        }}>
                          {post.authorBadges.map((badge, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#333',
                                color: '#B9975B',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '11px',
                                fontWeight: 'bold'
                              }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        
                        <span style={{
                          color: '#888',
                          fontSize: '14px'
                        }}>{post.location} • {formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      color: '#888',
                      fontSize: '14px'
                    }}>
                      <span>👁 {post.views}</span>
                      <span>💬 {post.replies}</span>
                      <span>👍 {post.likes}</span>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '15px'
                  }}>{post.content}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#222',
                            color: '#B9975B',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            border: '1px solid #B9975B'
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        border: '1px solid #B9975B',
                        borderRadius: '20px',
                        color: '#B9975B',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      👍 Like ({post.likes})
                    </button>
                  </div>
                </div>

                {/* Responses */}
                {post.responses.length > 0 && (
                  <div style={{ padding: '25px' }}>
                    <h4 style={{
                      color: '#fff',
                      fontSize: '18px',
                      marginBottom: '20px',
                      fontWeight: 'bold'
                    }}>Responses ({post.responses.length})</h4>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px'
                    }}>
                      {post.responses.map((response) => (
                        <div
                          key={response.id}
                          style={{
                            backgroundColor: '#222',
                            padding: '20px',
                            borderRadius: '10px',
                            border: response.isAccepted ? '2px solid #4CAF50' : '1px solid #333'
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
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '8px'
                              }}>
                                <span style={{
                                  color: '#B9975B',
                                  fontSize: '16px',
                                  fontWeight: 'bold'
                                }}>{response.author}</span>
                                
                                <span style={{
                                  color: '#FFD700',
                                  fontSize: '14px'
                                }}>⭐ {response.authorRating}</span>
                                
                                {response.isAccepted && (
                                  <span style={{
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    fontWeight: 'bold'
                                  }}>
                                    ✓ ACCEPTED ANSWER
                                  </span>
                                )}
                              </div>
                              
                              <div style={{
                                display: 'flex',
                                gap: '5px',
                                flexWrap: 'wrap'
                              }}>
                                {response.authorBadges.map((badge, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      backgroundColor: '#333',
                                      color: '#B9975B',
                                      padding: '2px 6px',
                                      borderRadius: '8px',
                                      fontSize: '10px',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '15px'
                            }}>
                              <span style={{
                                color: '#888',
                                fontSize: '12px'
                              }}>{formatTimeAgo(response.timestamp)}</span>
                              
                              <button
                                onClick={() => handleLike(post.id, response.id)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: 'transparent',
                                  border: '1px solid #666',
                                  borderRadius: '12px',
                                  color: '#ccc',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                👍 {response.likes}
                              </button>
                            </div>
                          </div>
                          
                          <p style={{
                            color: '#ccc',
                            fontSize: '15px',
                            lineHeight: '1.5',
                            margin: 0
                          }}>{response.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#888'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{
              color: '#ccc',
              fontSize: '24px',
              marginBottom: '10px'
            }}>No posts found</h3>
            <p style={{
              fontSize: '16px',
              margin: 0
            }}>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeForumComplete;
