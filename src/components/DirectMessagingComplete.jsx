import React, { useState, useEffect, useRef } from 'react';

const DirectMessagingComplete = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userType, setUserType] = useState('tradesperson'); // customer or tradesperson
  const [attachments, setAttachments] = useState([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [credits, setCredits] = useState(25);
  const messagesEndRef = useRef(null);

  // Sample conversations data
  const sampleConversations = [
    {
      id: 1,
      customerName: 'Sarah Johnson',
      tradespersonName: 'Mike Thompson',
      jobTitle: 'Kitchen Renovation',
      lastMessage: 'When can you start the work?',
      timestamp: '2024-01-15T10:30:00Z',
      unread: 2,
      status: 'active',
      jobValue: '£2,500',
      location: 'London, SW1'
    },
    {
      id: 2,
      customerName: 'David Wilson',
      tradespersonName: 'Mike Thompson',
      jobTitle: 'Bathroom Plumbing',
      lastMessage: 'Quote looks good, let\'s proceed',
      timestamp: '2024-01-14T15:45:00Z',
      unread: 0,
      status: 'quoted',
      jobValue: '£850',
      location: 'London, SE1'
    },
    {
      id: 3,
      customerName: 'Emma Davis',
      tradespersonName: 'Mike Thompson',
      jobTitle: 'Boiler Installation',
      lastMessage: 'Thank you for the excellent work!',
      timestamp: '2024-01-13T09:15:00Z',
      unread: 0,
      status: 'completed',
      jobValue: '£1,200',
      location: 'London, N1'
    }
  ];

  // Sample messages for active conversation
  const sampleMessages = [
    {
      id: 1,
      senderId: 'customer',
      senderName: 'Sarah Johnson',
      message: 'Hi Mike, I saw your profile and I\'m interested in getting a quote for my kitchen renovation.',
      timestamp: '2024-01-15T09:00:00Z',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'tradesperson',
      senderName: 'Mike Thompson',
      message: 'Hi Sarah! Thanks for reaching out. I\'d be happy to help with your kitchen renovation. Could you tell me more about what you\'re looking to do?',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'text'
    },
    {
      id: 3,
      senderId: 'customer',
      senderName: 'Sarah Johnson',
      message: 'I want to completely renovate the kitchen - new cabinets, countertops, appliances, and flooring. The kitchen is about 12x10 feet.',
      timestamp: '2024-01-15T09:30:00Z',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'customer',
      senderName: 'Sarah Johnson',
      message: 'Here are some photos of the current kitchen:',
      timestamp: '2024-01-15T09:32:00Z',
      type: 'text',
      attachments: [
        { name: 'kitchen_current_1.jpg', type: 'image', url: '/api/placeholder/300/200' },
        { name: 'kitchen_current_2.jpg', type: 'image', url: '/api/placeholder/300/200' }
      ]
    },
    {
      id: 5,
      senderId: 'tradesperson',
      senderName: 'Mike Thompson',
      message: 'Thanks for the photos! Based on what you\'ve described, I can provide a detailed quote. Would you prefer me to visit for an in-person assessment, or shall I prepare an initial estimate based on the information provided?',
      timestamp: '2024-01-15T10:00:00Z',
      type: 'text'
    },
    {
      id: 6,
      senderId: 'tradesperson',
      senderName: 'Mike Thompson',
      message: 'I\'ve prepared a detailed quote for your kitchen renovation:',
      timestamp: '2024-01-15T10:15:00Z',
      type: 'quote',
      quote: {
        items: [
          { description: 'Kitchen Cabinets (Supply & Install)', quantity: 1, price: 1200 },
          { description: 'Countertops - Quartz', quantity: 1, price: 800 },
          { description: 'Flooring - Luxury Vinyl', quantity: 120, unit: 'sq ft', price: 360 },
          { description: 'Plumbing & Electrical Work', quantity: 1, price: 600 },
          { description: 'Labor & Installation', quantity: 1, price: 800 }
        ],
        subtotal: 3760,
        vat: 752,
        total: 4512,
        validUntil: '2024-02-15',
        startDate: '2024-02-01',
        duration: '2-3 weeks'
      }
    },
    {
      id: 7,
      senderId: 'customer',
      senderName: 'Sarah Johnson',
      message: 'The quote looks comprehensive! I have a few questions about the timeline and materials.',
      timestamp: '2024-01-15T10:25:00Z',
      type: 'text'
    },
    {
      id: 8,
      senderId: 'customer',
      senderName: 'Sarah Johnson',
      message: 'When can you start the work?',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text'
    }
  ];

  useEffect(() => {
    setConversations(sampleConversations);
    if (sampleConversations.length > 0) {
      setActiveConversation(sampleConversations[0]);
      setMessages(sampleMessages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const message = {
      id: messages.length + 1,
      senderId: userType,
      senderName: userType === 'customer' ? 'You' : 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setAttachments([]);

    // Deduct credit for tradesperson messaging
    if (userType === 'tradesperson' && credits > 0) {
      setCredits(credits - 1);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
      file: file
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const sendQuote = (quoteData) => {
    const quoteMessage = {
      id: messages.length + 1,
      senderId: 'tradesperson',
      senderName: 'You',
      message: 'I\'ve prepared a detailed quote for your project:',
      timestamp: new Date().toISOString(),
      type: 'quote',
      quote: quoteData
    };

    setMessages([...messages, quoteMessage]);
    setShowQuoteForm(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

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
            marginBottom: '10px'
          }}>
            💬 Messages
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              color: '#ccc',
              fontSize: '14px'
            }}>
              Credits: {credits}
            </div>
            <div style={{
              backgroundColor: userType === 'customer' ? '#4CAF50' : '#2196F3',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {userType === 'customer' ? 'Customer' : 'Tradesperson'}
            </div>
          </div>
        </div>

        {/* User Type Toggle */}
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid #333'
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#222',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button
              onClick={() => setUserType('customer')}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: userType === 'customer' ? '#B9975B' : 'transparent',
                color: userType === 'customer' ? '#000' : '#ccc',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Customer View
            </button>
            <button
              onClick={() => setUserType('tradesperson')}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: userType === 'tradesperson' ? '#B9975B' : 'transparent',
                color: userType === 'tradesperson' ? '#000' : '#ccc',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Tradesperson View
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto'
        }}>
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => {
                setActiveConversation(conversation);
                setMessages(sampleMessages);
              }}
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid #222',
                cursor: 'pointer',
                backgroundColor: activeConversation?.id === conversation.id ? '#222' : 'transparent',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <div>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '2px'
                  }}>
                    {userType === 'customer' ? conversation.tradespersonName : conversation.customerName}
                  </div>
                  <div style={{
                    color: '#B9975B',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {conversation.jobTitle}
                  </div>
                </div>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: '#888',
                    fontSize: '11px',
                    marginBottom: '2px'
                  }}>
                    {formatTimestamp(conversation.timestamp)}
                  </div>
                  {conversation.unread > 0 && (
                    <div style={{
                      backgroundColor: '#B9975B',
                      color: '#000',
                      borderRadius: '10px',
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{
                color: '#ccc',
                fontSize: '12px',
                marginBottom: '8px',
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
                  color: '#888',
                  fontSize: '11px'
                }}>
                  📍 {conversation.location}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    color: '#4CAF50',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {conversation.jobValue}
                  </div>
                  <div style={{
                    backgroundColor: 
                      conversation.status === 'active' ? '#FF9800' :
                      conversation.status === 'quoted' ? '#2196F3' :
                      '#4CAF50',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {conversation.status.toUpperCase()}
                  </div>
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
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  {userType === 'customer' ? activeConversation.tradespersonName : activeConversation.customerName}
                </h3>
                <div style={{
                  color: '#B9975B',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {activeConversation.jobTitle}
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: '#4CAF50',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {activeConversation.jobValue}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '12px'
                  }}>
                    📍 {activeConversation.location}
                  </div>
                </div>
                
                {userType === 'tradesperson' && (
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#000',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    📋 Send Quote
                  </button>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.senderId === userType ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: message.senderId === userType ? '#B9975B' : '#222',
                    color: message.senderId === userType ? '#000' : '#fff',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    borderBottomRightRadius: message.senderId === userType ? '4px' : '16px',
                    borderBottomLeftRadius: message.senderId === userType ? '16px' : '4px'
                  }}>
                    {/* Sender Name */}
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginBottom: '4px',
                      opacity: 0.8
                    }}>
                      {message.senderName}
                    </div>

                    {/* Message Content */}
                    {message.type === 'quote' ? (
                      <div>
                        <div style={{
                          marginBottom: '10px',
                          fontSize: '14px'
                        }}>
                          {message.message}
                        </div>
                        
                        {/* Quote Details */}
                        <div style={{
                          backgroundColor: message.senderId === userType ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                          padding: '12px',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}>
                          <div style={{
                            fontWeight: 'bold',
                            marginBottom: '8px'
                          }}>
                            📋 Quote Details
                          </div>
                          
                          {message.quote.items.map((item, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '4px'
                            }}>
                              <span>{item.description}</span>
                              <span>£{item.price}</span>
                            </div>
                          ))}
                          
                          <hr style={{
                            border: 'none',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            margin: '8px 0'
                          }} />
                          
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold'
                          }}>
                            <span>Total (inc. VAT)</span>
                            <span>£{message.quote.total}</span>
                          </div>
                          
                          <div style={{
                            marginTop: '8px',
                            fontSize: '11px',
                            opacity: 0.8
                          }}>
                            Valid until: {new Date(message.quote.validUntil).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{
                          fontSize: '14px',
                          lineHeight: '1.4',
                          marginBottom: message.attachments ? '8px' : '0'
                        }}>
                          {message.message}
                        </div>
                        
                        {/* Attachments */}
                        {message.attachments && (
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                          }}>
                            {message.attachments.map((attachment, index) => (
                              <div key={index}>
                                {attachment.type === 'image' ? (
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    style={{
                                      maxWidth: '200px',
                                      maxHeight: '150px',
                                      borderRadius: '8px',
                                      cursor: 'pointer'
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                  }}>
                                    📎 {attachment.name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Timestamp */}
                    <div style={{
                      fontSize: '10px',
                      opacity: 0.6,
                      marginTop: '4px',
                      textAlign: 'right'
                    }}>
                      {formatTimestamp(message.timestamp)}
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
              {/* Credit Warning for Tradespeople */}
              {userType === 'tradesperson' && credits <= 5 && (
                <div style={{
                  backgroundColor: '#FF9800',
                  color: '#000',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>⚠️ Low credits! Each message costs 1 credit.</span>
                  <button style={{
                    backgroundColor: '#000',
                    color: '#FF9800',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}>
                    Buy Credits
                  </button>
                </div>
              )}

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div style={{
                  marginBottom: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {attachment.type === 'image' ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <span>📎</span>
                      )}
                      <span style={{ color: '#ccc' }}>{attachment.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#ff4444',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px'
              }}>
                <div style={{
                  flex: 1,
                  position: 'relative'
                }}>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={
                      userType === 'tradesperson' && credits === 0 
                        ? 'No credits remaining - purchase credits to send messages'
                        : 'Type your message...'
                    }
                    disabled={userType === 'tradesperson' && credits === 0}
                    style={{
                      width: '100%',
                      minHeight: '40px',
                      maxHeight: '120px',
                      padding: '12px',
                      backgroundColor: '#222',
                      border: '1px solid #444',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>

                {/* File Upload */}
                <label style={{
                  padding: '10px',
                  backgroundColor: '#333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#B9975B'
                }}>
                  📎
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>

                {/* Send Button */}
                <button
                  onClick={sendMessage}
                  disabled={(!newMessage.trim() && attachments.length === 0) || (userType === 'tradesperson' && credits === 0)}
                  style={{
                    padding: '10px 16px',
                    background: (!newMessage.trim() && attachments.length === 0) || (userType === 'tradesperson' && credits === 0)
                      ? '#444'
                      : 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                    border: 'none',
                    borderRadius: '8px',
                    color: (!newMessage.trim() && attachments.length === 0) || (userType === 'tradesperson' && credits === 0) ? '#888' : '#000',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: (!newMessage.trim() && attachments.length === 0) || (userType === 'tradesperson' && credits === 0) ? 'not-allowed' : 'pointer'
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
            color: '#666',
            fontSize: '16px'
          }}>
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <QuoteFormModal
          onSend={sendQuote}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
  );
};

// Quote Form Modal Component
const QuoteFormModal = ({ onSend, onClose }) => {
  const [quoteItems, setQuoteItems] = useState([
    { description: '', quantity: 1, price: 0 }
  ]);
  const [validUntil, setValidUntil] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');

  const addItem = () => {
    setQuoteItems([...quoteItems, { description: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = quoteItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setQuoteItems(updated);
  };

  const removeItem = (index) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const subtotal = quoteItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const vat = subtotal * 0.2;
    return { subtotal, vat, total: subtotal + vat };
  };

  const handleSend = () => {
    const { subtotal, vat, total } = calculateTotal();
    const quoteData = {
      items: quoteItems.filter(item => item.description && item.price > 0),
      subtotal,
      vat,
      total,
      validUntil,
      startDate,
      duration
    };
    onSend(quoteData);
  };

  const { subtotal, vat, total } = calculateTotal();

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
          }}>
            📋 Create Quote
          </h2>
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

        {/* Quote Items */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            Quote Items
          </h3>
          
          {quoteItems.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 80px 100px 40px',
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
              <button
                onClick={() => removeItem(index)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ff4444',
                  cursor: 'pointer',
                  fontSize: '16px'
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
              border: '1px solid #B9975B',
              borderRadius: '6px',
              color: '#B9975B',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            + Add Item
          </button>
        </div>

        {/* Quote Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              color: '#B9975B',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Valid Until
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
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
          
          <div>
            <label style={{
              color: '#B9975B',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
          
          <div>
            <label style={{
              color: '#B9975B',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '5px'
            }}>
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g., 2-3 weeks"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
        </div>

        {/* Quote Summary */}
        <div style={{
          backgroundColor: '#222',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px'
          }}>
            <span style={{ color: '#ccc', fontSize: '14px' }}>Subtotal:</span>
            <span style={{ color: '#fff', fontSize: '14px' }}>£{subtotal.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px'
          }}>
            <span style={{ color: '#ccc', fontSize: '14px' }}>VAT (20%):</span>
            <span style={{ color: '#fff', fontSize: '14px' }}>£{vat.toFixed(2)}</span>
          </div>
          <hr style={{
            border: 'none',
            borderTop: '1px solid #444',
            margin: '10px 0'
          }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: '#B9975B', fontSize: '16px', fontWeight: 'bold' }}>Total:</span>
            <span style={{ color: '#B9975B', fontSize: '16px', fontWeight: 'bold' }}>£{total.toFixed(2)}</span>
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
              padding: '12px 20px',
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
            disabled={quoteItems.filter(item => item.description && item.price > 0).length === 0}
            style={{
              padding: '12px 20px',
              background: quoteItems.filter(item => item.description && item.price > 0).length === 0
                ? '#666'
                : 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              border: 'none',
              borderRadius: '8px',
              color: quoteItems.filter(item => item.description && item.price > 0).length === 0 ? '#ccc' : '#000',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: quoteItems.filter(item => item.description && item.price > 0).length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Send Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectMessagingComplete;
