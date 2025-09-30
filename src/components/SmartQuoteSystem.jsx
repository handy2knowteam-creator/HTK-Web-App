import React, { useState, useEffect, useRef } from 'react';

const SmartQuoteSystem = () => {
  const [quoteStep, setQuoteStep] = useState('overview');
  const [jobType, setJobType] = useState('');
  const [measurements, setMeasurements] = useState({});
  const [materials, setMaterials] = useState([]);
  const [laborHours, setLaborHours] = useState(0);
  const [totalQuote, setTotalQuote] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({});
  const [photos, setPhotos] = useState([]);
  const [videoRecording, setVideoRecording] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const jobTypes = [
    {
      id: 'bathroom_renovation',
      name: 'Bathroom Renovation',
      icon: '🚿',
      category: 'Plumbing',
      avgTime: '3-5 days',
      complexity: 'High',
      materials: ['Tiles', 'Fixtures', 'Piping', 'Waterproofing'],
      laborRate: 45
    },
    {
      id: 'kitchen_plumbing',
      name: 'Kitchen Plumbing',
      icon: '🔧',
      category: 'Plumbing',
      avgTime: '1-2 days',
      complexity: 'Medium',
      materials: ['Pipes', 'Fittings', 'Sink', 'Taps'],
      laborRate: 40
    },
    {
      id: 'electrical_rewire',
      name: 'House Rewiring',
      icon: '⚡',
      category: 'Electrical',
      avgTime: '5-7 days',
      complexity: 'High',
      materials: ['Cable', 'Sockets', 'Switches', 'Consumer Unit'],
      laborRate: 50
    },
    {
      id: 'boiler_installation',
      name: 'Boiler Installation',
      icon: '🔥',
      category: 'Heating',
      avgTime: '1 day',
      complexity: 'High',
      materials: ['Boiler', 'Pipes', 'Radiators', 'Controls'],
      laborRate: 55
    }
  ];

  const materialDatabase = {
    bathroom_renovation: [
      { name: 'Ceramic Tiles (per m²)', price: 25, unit: 'm²' },
      { name: 'Toilet Suite', price: 180, unit: 'each' },
      { name: 'Basin & Tap', price: 120, unit: 'each' },
      { name: 'Shower Enclosure', price: 350, unit: 'each' },
      { name: 'Waterproofing (per m²)', price: 15, unit: 'm²' },
      { name: 'Piping & Fittings', price: 200, unit: 'job' }
    ],
    kitchen_plumbing: [
      { name: 'Kitchen Sink', price: 150, unit: 'each' },
      { name: 'Kitchen Tap', price: 80, unit: 'each' },
      { name: 'Copper Pipe 15mm (per m)', price: 4, unit: 'm' },
      { name: 'Pipe Fittings', price: 50, unit: 'job' },
      { name: 'Isolation Valves', price: 25, unit: 'pair' }
    ],
    electrical_rewire: [
      { name: 'Twin & Earth Cable (per m)', price: 2.5, unit: 'm' },
      { name: 'Socket Outlets', price: 8, unit: 'each' },
      { name: 'Light Switches', price: 12, unit: 'each' },
      { name: 'Consumer Unit', price: 180, unit: 'each' },
      { name: 'Circuit Breakers', price: 25, unit: 'each' }
    ],
    boiler_installation: [
      { name: 'Combi Boiler 24kW', price: 1200, unit: 'each' },
      { name: 'Flue Kit', price: 120, unit: 'each' },
      { name: 'Radiator Valves', price: 35, unit: 'pair' },
      { name: 'Pipe Insulation', price: 3, unit: 'm' },
      { name: 'System Chemicals', price: 45, unit: 'job' }
    ]
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setVideoRecording(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for AR measurements. Please enable camera permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const photoData = canvas.toDataURL('image/jpeg');
      setPhotos([...photos, {
        id: Date.now(),
        data: photoData,
        timestamp: new Date().toISOString(),
        measurements: { ...measurements }
      }]);
    }
  };

  const calculateQuote = () => {
    const selectedJob = jobTypes.find(job => job.id === jobType);
    if (!selectedJob) return;

    let materialsCost = 0;
    materials.forEach(material => {
      materialsCost += material.price * material.quantity;
    });

    const laborCost = laborHours * selectedJob.laborRate;
    const subtotal = materialsCost + laborCost;
    const markup = subtotal * 0.2; // 20% markup
    const total = subtotal + markup;

    setTotalQuote(total);
  };

  useEffect(() => {
    calculateQuote();
  }, [materials, laborHours, jobType]);

  const addMaterial = (material, quantity) => {
    const existingIndex = materials.findIndex(m => m.name === material.name);
    if (existingIndex >= 0) {
      const updatedMaterials = [...materials];
      updatedMaterials[existingIndex].quantity = quantity;
      setMaterials(updatedMaterials);
    } else {
      setMaterials([...materials, { ...material, quantity }]);
    }
  };

  const generateQuotePDF = () => {
    const selectedJob = jobTypes.find(job => job.id === jobType);
    const quoteData = {
      jobType: selectedJob?.name,
      customer: customerInfo,
      materials,
      laborHours,
      laborRate: selectedJob?.laborRate,
      totalQuote,
      photos,
      measurements,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, this would generate a PDF
    console.log('Quote PDF data:', quoteData);
    alert('Quote generated! In a real app, this would create a PDF and send it to the customer.');
  };

  if (quoteStep === 'camera') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => setQuoteStep('job-selection')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '5px',
              color: '#B9975B',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ← Back to Job Selection
          </button>

          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '2px solid #B9975B',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #333'
            }}>
              <h2 style={{
                color: '#B9975B',
                fontSize: '24px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>AR Measurement Camera</h2>
              <p style={{
                color: '#ccc',
                fontSize: '16px',
                margin: 0
              }}>Point camera at the area to measure and capture photos</p>
            </div>

            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#222'
            }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              />

              {/* AR Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
              }}>
                {/* Measurement Grid */}
                <svg
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                  }}
                >
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#B9975B" strokeWidth="1" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Center Crosshair */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  border: '2px solid #B9975B',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(185, 151, 91, 0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '2px',
                    backgroundColor: '#B9975B'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '2px',
                    height: '20px',
                    backgroundColor: '#B9975B'
                  }}></div>
                </div>

                {/* Measurement Display */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid #B9975B'
                }}>
                  <h4 style={{
                    color: '#B9975B',
                    fontSize: '16px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>Measurements</h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}>
                    <span style={{ color: '#ccc', fontSize: '14px' }}>Width: {measurements.width || '0'} m</span>
                    <span style={{ color: '#ccc', fontSize: '14px' }}>Height: {measurements.height || '0'} m</span>
                    <span style={{ color: '#ccc', fontSize: '14px' }}>Area: {((measurements.width || 0) * (measurements.height || 0)).toFixed(2)} m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {!videoRecording ? (
                <button
                  onClick={startCamera}
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
                  📷 Start Camera
                </button>
              ) : (
                <>
                  <button
                    onClick={capturePhoto}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#4CAF50',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    📸 Capture Photo
                  </button>

                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <label style={{ color: '#ccc', fontSize: '14px' }}>Width (m):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={measurements.width || ''}
                      onChange={(e) => setMeasurements({...measurements, width: parseFloat(e.target.value)})}
                      style={{
                        padding: '8px',
                        backgroundColor: '#222',
                        border: '1px solid #555',
                        borderRadius: '5px',
                        color: '#fff',
                        width: '80px'
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <label style={{ color: '#ccc', fontSize: '14px' }}>Height (m):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={measurements.height || ''}
                      onChange={(e) => setMeasurements({...measurements, height: parseFloat(e.target.value)})}
                      style={{
                        padding: '8px',
                        backgroundColor: '#222',
                        border: '1px solid #555',
                        borderRadius: '5px',
                        color: '#fff',
                        width: '80px'
                      }}
                    />
                  </div>

                  <button
                    onClick={() => setQuoteStep('materials')}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#B9975B',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#000',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Continue to Materials →
                  </button>
                </>
              )}
            </div>

            {photos.length > 0 && (
              <div style={{
                padding: '20px',
                borderTop: '1px solid #333'
              }}>
                <h4 style={{
                  color: '#B9975B',
                  fontSize: '18px',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>Captured Photos ({photos.length})</h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '15px'
                }}>
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        backgroundColor: '#222',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #333'
                      }}
                    >
                      <img
                        src={photo.data}
                        alt="Captured measurement"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        padding: '10px',
                        fontSize: '12px',
                        color: '#ccc'
                      }}>
                        {photo.measurements.width && photo.measurements.height && (
                          <span>{photo.measurements.width}m × {photo.measurements.height}m</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (quoteStep === 'materials') {
    const selectedJob = jobTypes.find(job => job.id === jobType);
    const availableMaterials = materialDatabase[jobType] || [];

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
            onClick={() => setQuoteStep('camera')}
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
            ← Back to Camera
          </button>

          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '2px solid #B9975B',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '28px',
              marginBottom: '20px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Materials & Labor Calculator</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '30px'
            }}>
              {/* Materials Section */}
              <div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '20px',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>Materials Required</h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {availableMaterials.map((material, index) => (
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
                        <h4 style={{
                          color: '#B9975B',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          margin: 0
                        }}>{material.name}</h4>
                        <span style={{
                          color: '#4CAF50',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}>£{material.price}/{material.unit}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <label style={{
                          color: '#ccc',
                          fontSize: '14px'
                        }}>Quantity:</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="0"
                          onChange={(e) => addMaterial(material, parseFloat(e.target.value) || 0)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#333',
                            border: '1px solid #555',
                            borderRadius: '5px',
                            color: '#fff',
                            width: '80px'
                          }}
                        />
                        <span style={{
                          color: '#888',
                          fontSize: '14px'
                        }}>{material.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Labor Section */}
              <div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '20px',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>Labor Calculation</h3>

                <div style={{
                  backgroundColor: '#222',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #333',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      color: '#B9975B',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>Hourly Rate:</span>
                    <span style={{
                      color: '#4CAF50',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>£{selectedJob?.laborRate}/hour</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <label style={{
                      color: '#ccc',
                      fontSize: '14px'
                    }}>Estimated Hours:</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={laborHours}
                      onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#333',
                        border: '1px solid #555',
                        borderRadius: '5px',
                        color: '#fff',
                        width: '80px'
                      }}
                    />
                  </div>

                  <div style={{
                    borderTop: '1px solid #333',
                    paddingTop: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>Labor Cost:</span>
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}>£{(laborHours * (selectedJob?.laborRate || 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Summary */}
                <div style={{
                  backgroundColor: '#333',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '2px solid #B9975B'
                }}>
                  <h4 style={{
                    color: '#B9975B',
                    fontSize: '18px',
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>Quote Summary</h4>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '#ccc', fontSize: '14px' }}>Materials:</span>
                      <span style={{ color: '#fff', fontSize: '14px' }}>
                        £{materials.reduce((sum, m) => sum + (m.price * m.quantity), 0).toFixed(2)}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '#ccc', fontSize: '14px' }}>Labor:</span>
                      <span style={{ color: '#fff', fontSize: '14px' }}>
                        £{(laborHours * (selectedJob?.laborRate || 0)).toFixed(2)}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '#ccc', fontSize: '14px' }}>Markup (20%):</span>
                      <span style={{ color: '#fff', fontSize: '14px' }}>
                        £{(totalQuote * 0.2 / 1.2).toFixed(2)}
                      </span>
                    </div>

                    <div style={{
                      borderTop: '1px solid #555',
                      paddingTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        color: '#B9975B',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}>Total:</span>
                      <span style={{
                        color: '#4CAF50',
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}>£{totalQuote.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setQuoteStep('customer-info')}
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Continue to Customer Info →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quoteStep === 'customer-info') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => setQuoteStep('materials')}
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
            ← Back to Materials
          </button>

          <div style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            border: '2px solid #B9975B',
            padding: '30px'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '28px',
              marginBottom: '20px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Customer Information</h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '8px',
                  display: 'block'
                }}>Customer Name *</label>
                <input
                  type="text"
                  value={customerInfo.name || ''}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '8px',
                  display: 'block'
                }}>Email Address *</label>
                <input
                  type="email"
                  value={customerInfo.email || ''}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '8px',
                  display: 'block'
                }}>Phone Number *</label>
                <input
                  type="tel"
                  value={customerInfo.phone || ''}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                  placeholder="07123 456789"
                />
              </div>

              <div>
                <label style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '8px',
                  display: 'block'
                }}>Property Address *</label>
                <textarea
                  value={customerInfo.address || ''}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Enter full property address"
                />
              </div>

              <div>
                <label style={{
                  color: '#ccc',
                  fontSize: '16px',
                  marginBottom: '8px',
                  display: 'block'
                }}>Additional Notes</label>
                <textarea
                  value={customerInfo.notes || ''}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Any special requirements or notes..."
                />
              </div>
            </div>

            <div style={{
              marginTop: '30px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={generateQuotePDF}
                disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
                style={{
                  padding: '15px 30px',
                  background: customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address
                    ? 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)'
                    : '#666',
                  border: 'none',
                  borderRadius: '10px',
                  color: customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address ? '#000' : '#ccc',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address ? 'pointer' : 'not-allowed'
                }}
              >
                📄 Generate Quote PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quoteStep === 'job-selection') {
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
          <button
            onClick={() => setQuoteStep('overview')}
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
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              color: '#B9975B',
              fontSize: '32px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>Select Job Type</h2>
            <p style={{
              color: '#ccc',
              fontSize: '18px',
              margin: 0
            }}>Choose the type of work to create an accurate quote</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {jobTypes.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  setJobType(job.id);
                  setQuoteStep('camera');
                }}
                style={{
                  backgroundColor: '#111',
                  borderRadius: '15px',
                  border: jobType === job.id ? '2px solid #B9975B' : '1px solid #333',
                  padding: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: jobType === job.id ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '15px'
                  }}>{job.icon}</div>
                  
                  <h3 style={{
                    color: '#B9975B',
                    fontSize: '22px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>{job.name}</h3>
                  
                  <span style={{
                    backgroundColor: '#222',
                    color: '#ccc',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>{job.category}</span>
                </div>

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
                    }}>DURATION</p>
                    <p style={{
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{job.avgTime}</p>
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
                    }}>COMPLEXITY</p>
                    <p style={{
                      color: job.complexity === 'High' ? '#FF5722' : job.complexity === 'Medium' ? '#FF9800' : '#4CAF50',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{job.complexity}</p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#222',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <p style={{
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '10px'
                  }}>TYPICAL MATERIALS:</p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {job.materials.map((material, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#333',
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

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#B9975B',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>Labor Rate:</span>
                  <span style={{
                    color: '#4CAF50',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>£{job.laborRate}/hour</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Overview/Landing Page
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
          marginBottom: '50px'
        }}>
          <h1 style={{
            color: '#B9975B',
            fontSize: '42px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>60-Second Smart Quote</h1>
          <p style={{
            color: '#ccc',
            fontSize: '20px',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>Revolutionary AR-powered quoting system • Video + photo intake • Auto line-item generation</p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '📱', title: 'AR Camera', desc: 'Measure with your phone' },
              { icon: '⚡', title: '60 Seconds', desc: 'Complete quote in 1 minute' },
              { icon: '📊', title: 'Auto Calculate', desc: 'Materials + labor pricing' },
              { icon: '📄', title: 'PDF Quote', desc: 'Professional quote document' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#111',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid #333',
                textAlign: 'center',
                minWidth: '150px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{feature.icon}</div>
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '16px',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div style={{
          backgroundColor: '#111',
          borderRadius: '20px',
          border: '2px solid #B9975B',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <h2 style={{
            color: '#B9975B',
            fontSize: '32px',
            marginBottom: '30px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>How It Works</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                step: 1,
                title: 'Select Job Type',
                description: 'Choose from bathroom, kitchen, electrical, or heating jobs',
                icon: '🎯'
              },
              {
                step: 2,
                title: 'AR Measurement',
                description: 'Use your phone camera to measure the space with AR overlay',
                icon: '📐'
              },
              {
                step: 3,
                title: 'Auto Materials',
                description: 'System calculates required materials based on measurements',
                icon: '🧮'
              },
              {
                step: 4,
                title: 'Labor Estimate',
                description: 'Add labor hours and get instant pricing calculation',
                icon: '⏱️'
              },
              {
                step: 5,
                title: 'Customer Details',
                description: 'Enter customer information for the quote',
                icon: '👤'
              },
              {
                step: 6,
                title: 'Generate PDF',
                description: 'Professional quote PDF ready to send to customer',
                icon: '📄'
              }
            ].map((step) => (
              <div
                key={step.step}
                style={{
                  backgroundColor: '#222',
                  padding: '25px',
                  borderRadius: '15px',
                  border: '1px solid #333',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#B9975B',
                  color: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: '0 auto 15px'
                }}>
                  {step.step}
                </div>
                
                <div style={{
                  fontSize: '32px',
                  marginBottom: '15px'
                }}>{step.icon}</div>
                
                <h3 style={{
                  color: '#B9975B',
                  fontSize: '18px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>{step.title}</h3>
                
                <p style={{
                  color: '#ccc',
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '1.4'
                }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div style={{
          textAlign: 'center'
        }}>
          <button
            onClick={() => setQuoteStep('job-selection')}
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              border: 'none',
              borderRadius: '15px',
              color: '#000',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(185, 151, 91, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            🚀 Start 60-Second Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartQuoteSystem;
