import React, { useState, useEffect } from 'react';

const LiveCalendarSystem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [events, setEvents] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [travelTime, setTravelTime] = useState({});
  const [syncStatus, setSyncStatus] = useState('synced');

  // Sample events data
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: 'Bathroom Installation - Smith Residence',
        start: new Date(2024, 9, 30, 9, 0),
        end: new Date(2024, 9, 30, 17, 0),
        type: 'job',
        customer: 'John Smith',
        address: '123 Oak Street, London SW1 2AB',
        phone: '07123 456789',
        value: 850,
        status: 'confirmed',
        weather: { condition: 'sunny', temp: 18 },
        travelTime: 25,
        materials: ['Tiles', 'Toilet', 'Basin'],
        notes: 'Customer will be home all day'
      },
      {
        id: 2,
        title: 'Kitchen Plumbing Quote - Johnson Property',
        start: new Date(2024, 10, 1, 10, 30),
        end: new Date(2024, 10, 1, 11, 30),
        type: 'quote',
        customer: 'Sarah Johnson',
        address: '456 Elm Road, London W1 1AA',
        phone: '07987 654321',
        value: 0,
        status: 'pending',
        weather: { condition: 'cloudy', temp: 15 },
        travelTime: 35,
        materials: [],
        notes: 'Initial consultation for kitchen renovation'
      },
      {
        id: 3,
        title: 'Boiler Service - Williams House',
        start: new Date(2024, 10, 2, 14, 0),
        end: new Date(2024, 10, 2, 16, 0),
        type: 'service',
        customer: 'Mike Williams',
        address: '789 Pine Avenue, London SE1 3CD',
        phone: '07555 123456',
        value: 120,
        status: 'confirmed',
        weather: { condition: 'rainy', temp: 12 },
        travelTime: 40,
        materials: ['Service Kit', 'Filters'],
        notes: 'Annual boiler maintenance'
      },
      {
        id: 4,
        title: 'Emergency Call - Burst Pipe',
        start: new Date(2024, 10, 3, 8, 0),
        end: new Date(2024, 10, 3, 12, 0),
        type: 'emergency',
        customer: 'Emma Davis',
        address: '321 Maple Close, London N1 4EF',
        phone: '07777 888999',
        value: 280,
        status: 'urgent',
        weather: { condition: 'sunny', temp: 16 },
        travelTime: 20,
        materials: ['Pipe', 'Fittings', 'Sealant'],
        notes: 'Water shut off, urgent repair needed'
      }
    ];
    setEvents(sampleEvents);

    // Sample availability slots
    const slots = [
      { date: '2024-10-04', times: ['09:00', '11:00', '14:00', '16:00'] },
      { date: '2024-10-05', times: ['10:00', '13:00', '15:00'] },
      { date: '2024-10-06', times: ['08:00', '12:00', '17:00'] }
    ];
    setAvailabilitySlots(slots);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'job': return '#4CAF50';
      case 'quote': return '#2196F3';
      case 'service': return '#FF9800';
      case 'emergency': return '#f44336';
      default: return '#666';
    }
  };

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'job': return '🔧';
      case 'quote': return '📋';
      case 'service': return '⚙️';
      case 'emergency': return '🚨';
      default: return '📅';
    }
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      default: return '🌤️';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const syncWithGoogleCalendar = () => {
    setSyncStatus('syncing');
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('synced');
      alert('Calendar synced with Google Calendar successfully!');
    }, 2000);
  };

  const addAvailabilitySlot = () => {
    const newSlot = {
      date: selectedDate.toISOString().split('T')[0],
      time: '09:00'
    };
    // In a real app, this would add to the database
    alert('Availability slot added! Customers can now book this time.');
  };

  const optimizeRoute = () => {
    alert('Route optimized! Travel time reduced by 15 minutes. New route sent to your navigation app.');
  };

  if (viewMode === 'day') {
    const dayEvents = getEventsForDate(selectedDate);
    
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h1 style={{
                color: '#B9975B',
                fontSize: '32px',
                marginBottom: '5px',
                fontWeight: 'bold'
              }}>
                {selectedDate.toLocaleDateString('en-GB', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h1>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>{dayEvents.length} appointments scheduled</p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setViewMode('month')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  color: '#B9975B',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ← Back to Month
              </button>
              
              <button
                onClick={syncWithGoogleCalendar}
                style={{
                  padding: '8px 16px',
                  backgroundColor: syncStatus === 'syncing' ? '#FF9800' : '#4CAF50',
                  border: 'none',
                  borderRadius: '5px',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {syncStatus === 'syncing' ? '🔄 Syncing...' : '📅 Sync Google'}
              </button>
            </div>
          </div>

          {/* Day Timeline */}
          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '1px solid #333',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #333'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: 0
                }}>Daily Schedule</h3>
                
                <button
                  onClick={optimizeRoute}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196F3',
                    border: 'none',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  🗺️ Optimize Route
                </button>
              </div>
            </div>
            
            <div style={{ padding: '20px' }}>
              {dayEvents.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>📅</div>
                  <h3 style={{
                    color: '#888',
                    fontSize: '18px',
                    marginBottom: '10px'
                  }}>No appointments scheduled</h3>
                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    margin: 0
                  }}>This day is available for new bookings</p>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        backgroundColor: '#222',
                        borderLeft: `4px solid ${getEventTypeColor(event.type)}`,
                        borderRadius: '10px',
                        padding: '20px'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '8px'
                          }}>
                            <span style={{ fontSize: '20px' }}>{getEventTypeIcon(event.type)}</span>
                            <h4 style={{
                              color: '#B9975B',
                              fontSize: '18px',
                              fontWeight: 'bold',
                              margin: 0
                            }}>{event.title}</h4>
                          </div>
                          
                          <p style={{
                            color: '#ccc',
                            fontSize: '16px',
                            marginBottom: '5px'
                          }}>{event.customer}</p>
                          
                          <p style={{
                            color: '#888',
                            fontSize: '14px',
                            margin: 0
                          }}>{event.address}</p>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            backgroundColor: getEventTypeColor(event.type),
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                          }}>
                            {event.type.toUpperCase()}
                          </div>
                          
                          {event.value > 0 && (
                            <div style={{
                              color: '#4CAF50',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}>£{event.value}</div>
                          )}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px',
                        marginBottom: '15px'
                      }}>
                        <div style={{
                          backgroundColor: '#333',
                          padding: '10px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <p style={{
                            color: '#888',
                            fontSize: '12px',
                            marginBottom: '5px'
                          }}>TIME</p>
                          <p style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: 0
                          }}>{formatTime(event.start)} - {formatTime(event.end)}</p>
                        </div>
                        
                        <div style={{
                          backgroundColor: '#333',
                          padding: '10px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <p style={{
                            color: '#888',
                            fontSize: '12px',
                            marginBottom: '5px'
                          }}>WEATHER</p>
                          <p style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: 0
                          }}>{getWeatherIcon(event.weather.condition)} {event.weather.temp}°C</p>
                        </div>
                        
                        <div style={{
                          backgroundColor: '#333',
                          padding: '10px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <p style={{
                            color: '#888',
                            fontSize: '12px',
                            marginBottom: '5px'
                          }}>TRAVEL</p>
                          <p style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: 0
                          }}>🚗 {event.travelTime} mins</p>
                        </div>
                        
                        <div style={{
                          backgroundColor: '#333',
                          padding: '10px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <p style={{
                            color: '#888',
                            fontSize: '12px',
                            marginBottom: '5px'
                          }}>CONTACT</p>
                          <p style={{
                            color: '#B9975B',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: 0
                          }}>📞 {event.phone}</p>
                        </div>
                      </div>
                      
                      {event.materials.length > 0 && (
                        <div style={{
                          backgroundColor: '#333',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '15px'
                        }}>
                          <p style={{
                            color: '#B9975B',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                          }}>Materials Required:</p>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                          }}>
                            {event.materials.map((material, index) => (
                              <span
                                key={index}
                                style={{
                                  backgroundColor: '#444',
                                  color: '#ccc',
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px'
                                }}
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {event.notes && (
                        <div style={{
                          backgroundColor: '#333',
                          padding: '15px',
                          borderRadius: '8px'
                        }}>
                          <p style={{
                            color: '#B9975B',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                          }}>Notes:</p>
                          <p style={{
                            color: '#ccc',
                            fontSize: '14px',
                            margin: 0,
                            fontStyle: 'italic'
                          }}>{event.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Month View
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div>
            <h1 style={{
              color: '#B9975B',
              fontSize: '36px',
              marginBottom: '5px',
              fontWeight: 'bold'
            }}>Live Calendar Integration</h1>
            <p style={{
              color: '#ccc',
              fontSize: '18px',
              margin: 0
            }}>Google Calendar sync • Real-time availability • Weather-aware scheduling</p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={syncWithGoogleCalendar}
              style={{
                padding: '10px 20px',
                backgroundColor: syncStatus === 'syncing' ? '#FF9800' : '#4CAF50',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {syncStatus === 'syncing' ? '🔄 Syncing...' : '📅 Sync Google Calendar'}
            </button>
            
            <button
              onClick={addAvailabilitySlot}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ➕ Add Availability
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          backgroundColor: '#111',
          padding: '20px',
          borderRadius: '15px',
          border: '1px solid #333'
        }}>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            style={{
              padding: '10px 15px',
              backgroundColor: '#222',
              border: '1px solid #555',
              borderRadius: '8px',
              color: '#B9975B',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ← Previous
          </button>
          
          <h2 style={{
            color: '#B9975B',
            fontSize: '28px',
            fontWeight: 'bold',
            margin: 0
          }}>{monthName}</h2>
          
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            style={{
              padding: '10px 15px',
              backgroundColor: '#222',
              border: '1px solid #555',
              borderRadius: '8px',
              color: '#B9975B',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '15px',
          border: '1px solid #333',
          overflow: 'hidden'
        }}>
          {/* Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            backgroundColor: '#222',
            borderBottom: '1px solid #333'
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  color: '#B9975B',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRight: '1px solid #333'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridAutoRows: 'minmax(120px, auto)'
          }}>
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const isToday = day && day.toDateString() === new Date().toDateString();
              const isSelected = day && day.toDateString() === selectedDate.toDateString();
              
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (day) {
                      setSelectedDate(day);
                      setViewMode('day');
                    }
                  }}
                  style={{
                    padding: '10px',
                    borderRight: '1px solid #333',
                    borderBottom: '1px solid #333',
                    backgroundColor: day ? (isSelected ? '#333' : isToday ? '#222' : '#111') : '#0a0a0a',
                    cursor: day ? 'pointer' : 'default',
                    minHeight: '120px',
                    position: 'relative'
                  }}
                >
                  {day && (
                    <>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          color: isToday ? '#B9975B' : '#fff',
                          fontSize: '16px',
                          fontWeight: isToday ? 'bold' : 'normal'
                        }}>
                          {day.getDate()}
                        </span>
                        
                        {dayEvents.length > 0 && (
                          <span style={{
                            backgroundColor: '#B9975B',
                            color: '#000',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {dayEvents.length}
                          </span>
                        )}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            style={{
                              backgroundColor: getEventTypeColor(event.type),
                              color: '#fff',
                              padding: '4px 6px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {getEventTypeIcon(event.type)} {formatTime(event.start)}
                          </div>
                        ))}
                        
                        {dayEvents.length > 3 && (
                          <div style={{
                            color: '#888',
                            fontSize: '11px',
                            textAlign: 'center',
                            marginTop: '4px'
                          }}>
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
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
            }}>{events.filter(e => e.type === 'job').length}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Jobs This Month</p>
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
            }}>{events.filter(e => e.type === 'quote').length}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Quotes Scheduled</p>
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
            }}>£{events.reduce((sum, e) => sum + e.value, 0)}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Total Value</p>
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
            }}>{availabilitySlots.length}</h3>
            <p style={{
              color: '#ccc',
              fontSize: '16px',
              margin: 0
            }}>Available Slots</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCalendarSystem;
