import React, { useState, useEffect, useRef } from 'react';

const DirectMessagingSystem = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadConversations();
    if (activeConversation) {
      loadMessages(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = () => {
    // Load conversations from localStorage or API
    const mockConversations = [
      {
        id: 1,
        type: 'customer_to_tradesperson',
        participants: {
          customer: { id: 1, name: 'John Smith', avatar: '👤' },
          tradesperson: { id: 1, name: 'David Thompson', trade: 'Plumber', avatar: '🔧' }
        },
        jobTitle: 'Bathroom Renovation',
        lastMessage: 'When can you start the work?',
        lastMessageTime: '2024-01-21T10:30:00Z',
        unreadCount: 2,
        status: 'active',
        jobId: 101
      },
      {
        id: 2,
        type: 'customer_to_tradesperson',
        participants: {
          customer: { id: 2, name: 'Sarah Johnson', avatar: '👤' },
          tradesperson: { id: 2, name: 'Emma Davies', trade: 'Electrician', avatar: '⚡' }
        },
        jobTitle: 'Kitchen Rewiring',
        lastMessage: 'Quote looks good, let\'s proceed',
        lastMessageTime: '2024-01-21T09:15:00Z',
        unreadCount: 0,
        status: 'quote_accepted',
        jobId: 102
      },
      {
        id: 3,
        type: 'customer_to_tradesperson',
        participants: {
          customer: { id: 3, name: 'Mike Wilson', avatar: '👤' },
          tradesperson: { id: 3, name: 'James Wilson', trade: 'Builder', avatar: '🏗️' }
        },
        jobTitle: 'Garden Wall Construction',
        lastMessage: 'I\'ll send you the materials list',
        lastMessageTime: '2024-01-20T16:45:00Z',
        unreadCount: 1,
        status: 'in_progress',
        jobId: 103
      }
    ];
    setConversations(mockConversations);
  };

  const loadMessages = (conversationId) => {
    // Load messages for specific conversation
    const mockMessages = {
      1: [
        {
          id: 1,
          senderId: 1,
          senderType: 'customer',
          content: 'Hi David, I saw your profile and I\'m interested in getting a quote for my bathroom renovation.',
          timestamp: '2024-01-21T09:00:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: 1,
          senderType: 'tradesperson',
          content: 'Hello John! I\'d be happy to help with your bathroom renovation. Could you tell me more about what you\'re looking to do?',
          timestamp: '2024-01-21T09:15:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 1,
          senderType: 'customer',
          content: 'I want to completely renovate a small bathroom - new tiles, fixtures, and plumbing. Here are some photos of the current state.',
          timestamp: '2024-01-21T09:30:00Z',
          type: 'text',
          attachments: [
            { type: 'image', name: 'bathroom_current_1.jpg', url: '/api/placeholder/300/200' },
            { type: 'image', name: 'bathroom_current_2.jpg', url: '/api/placeholder/300/200' }
          ]
        },
        {
          id: 4,
          senderId: 1,
          senderType: 'tradesperson',
          content: 'Thanks for the photos! Based on what I can see, I can provide you with a detailed quote. The job would take approximately 5-7 days.',
          timestamp: '2024-01-21T10:00:00Z',
          type: 'text'
        },
        {
          id: 5,
          senderId: 1,
          senderType: 'tradesperson',
          content: '',
          timestamp: '2024-01-21T10:15:00Z',
          type: 'quote',
          quote: {
            id: 'Q001',
            title: 'Complete Bathroom Renovation',
            items: [
              { description: 'Remove existing fixtures and tiles', price: 300, quantity: 1 },
              { description: 'New plumbing installation', price: 800, quantity: 1 },
              { description: 'Tiling (walls and floor)', price: 600, quantity: 1 },
              { description: 'Install new fixtures (toilet, sink, shower)', price: 500, quantity: 1 },
              { description: 'Labor and finishing', price: 400, quantity: 1 }
            ],
            subtotal: 2600,
            vat: 520,
            total: 3120,
            validUntil: '2024-02-21',
            terms: 'Payment in 3 stages: 30% upfront, 40% mid-project, 30% on completion'
          }
        },
        {
          id: 6,
          senderId: 1,
          senderType: 'customer',
          content: 'When can you start the work?',
          timestamp: '2024-01-21T10:30:00Z',
          type: 'text'
        }
      ],
      2: [
        {
          id: 1,
          senderId: 2,
          senderType: 'customer',
          content: 'Hi Emma, I need my kitchen rewired. Can you help?',
          timestamp: '2024-01-21T08:00:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: 2,
          senderType: 'tradesperson',
          content: 'Absolutely! I\'d be happy to help with your kitchen rewiring. Let me send you a quote.',
          timestamp: '2024-01-21T08:30:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 2,
          senderType: 'customer',
          content: 'Quote looks good, let\'s proceed',
          timestamp: '2024-01-21T09:15:00Z',
          type: 'text'
        }
      ],
      3: [
        {
          id: 1,
          senderId: 3,
          senderType: 'customer',
          content: 'James, I need a garden wall built. Are you available?',
          timestamp: '2024-01-20T15:00:00Z',
          type: 'text'
        },
        {
          id: 2,
          senderId: 3,
          senderType: 'tradesperson',
          content: 'Yes, I can help with that. What dimensions are you looking for?',
          timestamp: '2024-01-20T15:30:00Z',
          type: 'text'
        },
        {
          id: 3,
          senderId: 3,
          senderType: 'tradesperson',
          content: 'I\'ll send you the materials list',
          timestamp: '2024-01-20T16:45:00Z',
          type: 'text'
        }
      ]
    };
    
    setMessages(mockMessages[conversationId] || []);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    if (!activeConversation) return;

    const message = {
      id: Date.now(),
      senderId: 1, // Current user ID
      senderType: 'customer', // or 'tradesperson' based on user type
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setAttachments([]);

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversation.id 
        ? { ...conv, lastMessage: newMessage || 'Sent attachments', lastMessageTime: new Date().toISOString() }
        : conv
    ));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const sendQuote = (quoteData) => {
    const quoteMessage = {
      id: Date.now(),
      senderId: 1,
      senderType: 'tradesperson',
      content: '',
      timestamp: new Date().toISOString(),
      type: 'quote',
      quote: quoteData
    };

    setMessages(prev => [...prev, quoteMessage]);
    setShowQuoteModal(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participants.tradesperson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex'
    }}>
      {/* Conversations Sidebar */}
      <div style={{
        width: '350px',
        backgroundColor: '#111',
        borderRight: '1px solid #333',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #333'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 0 15px 0'
          }}>💬 Messages</h2>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Conversations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto'
        }}>
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid #222',
                cursor: 'pointer',
                backgroundColor: activeConversation?.id === conversation.id ? '#1a1a1a' : 'transparent',
                borderLeft: activeConversation?.id === conversation.id ? '3px solid #B9975B' : '3px solid transparent'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{
                  fontSize: '24px',
                  marginRight: '10px'
                }}>
                  {conversation.participants.tradesperson.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '2px'
                  }}>
                    {conversation.participants.tradesperson.name}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px'
                  }}>
                    {conversation.participants.tradesperson.trade}
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <div style={{
                    backgroundColor: '#B9975B',
                    color: '#000',
                    borderRadius: '10px',
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
              
              <div style={{
                color: '#B9975B',
                fontSize: '13px',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                {conversation.jobTitle}
              </div>
              
              <div style={{
                color: '#ccc',
                fontSize: '12px',
                marginBottom: '5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {conversation.lastMessage}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  color: '#666',
                  fontSize: '11px'
                }}>
                  {formatDate(conversation.lastMessageTime)}
                </div>
                <div style={{
                  backgroundColor: conversation.status === 'active' ? '#4CAF50' : 
                                 conversation.status === 'quote_accepted' ? '#2196F3' : '#FF9800',
                  color: '#fff',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {conversation.status.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: '20px',
              backgroundColor: '#111',
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginRight: '15px'
                }}>
                  {activeConversation.participants.tradesperson.avatar}
                </div>
                <div>
                  <div style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '2px'
                  }}>
                    {activeConversation.participants.tradesperson.name}
                  </div>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {activeConversation.jobTitle}
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📋 Send Quote
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196F3',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📞 Call
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              backgroundColor: '#0a0a0a'
            }}>
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: message.senderType === 'customer' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: message.senderType === 'customer' ? '#B9975B' : '#222',
                    color: message.senderType === 'customer' ? '#000' : '#fff',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    borderBottomRightRadius: message.senderType === 'customer' ? '4px' : '18px',
                    borderBottomLeftRadius: message.senderType === 'tradesperson' ? '4px' : '18px'
                  }}>
                    {message.type === 'text' && (
                      <>
                        {message.content && (
                          <div style={{
                            fontSize: '14px',
                            lineHeight: '1.4',
                            marginBottom: message.attachments ? '10px' : '0'
                          }}>
                            {message.content}
                          </div>
                        )}
                        
                        {message.attachments && (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '8px'
                          }}>
                            {message.attachments.map((attachment, index) => (
                              <div key={index}>
                                {attachment.type === 'image' ? (
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    style={{
                                      width: '100%',
                                      borderRadius: '8px',
                                      cursor: 'pointer'
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    padding: '8px',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                  }}>
                                    📎 {attachment.name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    
                    {message.type === 'quote' && (
                      <div style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          📋 {message.quote.title}
                          <span style={{
                            fontSize: '12px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            {message.quote.id}
                          </span>
                        </div>
                        
                        <div style={{ marginBottom: '10px' }}>
                          {message.quote.items.map((item, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '12px',
                              marginBottom: '4px'
                            }}>
                              <span>{item.description}</span>
                              <span>£{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div style={{
                          borderTop: '1px solid rgba(255,255,255,0.2)',
                          paddingTop: '8px',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total (inc. VAT):</span>
                            <span>£{message.quote.total}</span>
                          </div>
                        </div>
                        
                        <div style={{
                          marginTop: '10px',
                          fontSize: '11px',
                          opacity: 0.8
                        }}>
                          Valid until: {new Date(message.quote.validUntil).toLocaleDateString()}
                        </div>
                        
                        <div style={{
                          marginTop: '10px',
                          display: 'flex',
                          gap: '8px'
                        }}>
                          <button style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}>
                            ✅ Accept Quote
                          </button>
                          <button style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#ff4444',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}>
                            ❌ Decline
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.7,
                      marginTop: '5px',
                      textAlign: 'right'
                    }}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{
              padding: '20px',
              backgroundColor: '#111',
              borderTop: '1px solid #333'
            }}>
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div style={{
                  marginBottom: '10px',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        backgroundColor: '#222',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#ccc'
                      }}
                    >
                      {attachment.type === 'image' ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <div>📎 {attachment.name}</div>
                      )}
                      <button
                        onClick={() => removeAttachment(index)}
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#ff4444',
                          border: 'none',
                          color: '#fff',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-end'
              }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  style={{ display: 'none' }}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '10px',
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#B9975B',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  📎
                </button>
                
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #444',
                    borderRadius: '20px',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'none',
                    minHeight: '40px',
                    maxHeight: '120px'
                  }}
                />
                
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() && attachments.length === 0}
                  style={{
                    padding: '10px 16px',
                    background: newMessage.trim() || attachments.length > 0 
                      ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)' 
                      : '#333',
                    border: 'none',
                    borderRadius: '20px',
                    color: newMessage.trim() || attachments.length > 0 ? '#000' : '#666',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: newMessage.trim() || attachments.length > 0 ? 'pointer' : 'not-allowed'
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#666'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>💬</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Select a conversation</h3>
              <p style={{ fontSize: '14px' }}>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal
          onClose={() => setShowQuoteModal(false)}
          onSend={sendQuote}
          jobTitle={activeConversation?.jobTitle}
        />
      )}
    </div>
  );
};

// Quote Modal Component
const QuoteModal = ({ onClose, onSend, jobTitle }) => {
  const [quoteData, setQuoteData] = useState({
    title: jobTitle || 'Quote',
    items: [{ description: '', price: 0, quantity: 1 }],
    vatRate: 20,
    terms: 'Payment in 3 stages: 30% upfront, 40% mid-project, 30% on completion',
    validDays: 30
  });

  const addItem = () => {
    setQuoteData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', price: 0, quantity: 1 }]
    }));
  };

  const updateItem = (index, field, value) => {
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (index) => {
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotals = () => {
    const subtotal = quoteData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = subtotal * (quoteData.vatRate / 100);
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const handleSend = () => {
    const { subtotal, vat, total } = calculateTotals();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + quoteData.validDays);

    const quote = {
      id: `Q${Date.now().toString().slice(-6)}`,
      title: quoteData.title,
      items: quoteData.items.filter(item => item.description.trim()),
      subtotal,
      vat,
      total,
      validUntil: validUntil.toISOString(),
      terms: quoteData.terms
    };

    onSend(quote);
  };

  const { subtotal, vat, total } = calculateTotals();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#111',
        borderRadius: '15px',
        padding: '30px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0
          }}>📋 Create Quote</h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#666',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        {/* Quote Title */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            color: '#B9975B',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}>
            Quote Title
          </label>
          <input
            type="text"
            value={quoteData.title}
            onChange={(e) => setQuoteData(prev => ({ ...prev, title: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Quote Items */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            color: '#B9975B',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>
            Quote Items
          </label>
          
          {quoteData.items.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 80px 40px',
              gap: '10px',
              marginBottom: '10px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                style={{
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                style={{
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                style={{
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={() => removeItem(index)}
                style={{
                  padding: '8px',
                  backgroundColor: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          ))}
          
          <button
            onClick={addItem}
            style={{
              padding: '8px 16px',
              backgroundColor: '#333',
              border: '1px solid #555',
              borderRadius: '6px',
              color: '#B9975B',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            + Add Item
          </button>
        </div>

        {/* Terms */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            color: '#B9975B',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '5px'
          }}>
            Terms & Conditions
          </label>
          <textarea
            value={quoteData.terms}
            onChange={(e) => setQuoteData(prev => ({ ...prev, terms: e.target.value }))}
            style={{
              width: '100%',
              height: '60px',
              padding: '10px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Totals */}
        <div style={{
          backgroundColor: '#222',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            color: '#ccc',
            fontSize: '14px'
          }}>
            <span>Subtotal:</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            color: '#ccc',
            fontSize: '14px'
          }}>
            <span>VAT ({quoteData.vatRate}%):</span>
            <span>£{vat.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#B9975B',
            fontSize: '18px',
            fontWeight: 'bold',
            borderTop: '1px solid #444',
            paddingTop: '8px'
          }}>
            <span>Total:</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#ccc',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
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
            Send Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectMessagingSystem;
