import React, { useState } from 'react';

const JobPostingSystem = () => {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    postcode: '',
    budget: '',
    timeline: '',
    urgency: '',
    photos: [],
    requirements: {
      materials: false,
      permits: false,
      access: '',
      workingHours: ''
    },
    contact: {
      name: '',
      email: '',
      phone: '',
      preferredContact: 'email'
    }
  });

  const categories = [
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'building', name: 'Building & Construction', icon: '🏗️' },
    { id: 'carpentry', name: 'Carpentry', icon: '🪚' },
    { id: 'painting', name: 'Painting & Decorating', icon: '🎨' },
    { id: 'roofing', name: 'Roofing', icon: '🏠' },
    { id: 'gardening', name: 'Gardening & Landscaping', icon: '🌱' },
    { id: 'heating', name: 'Heating & Gas', icon: '🔥' },
    { id: 'kitchen', name: 'Kitchen Fitting', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom Fitting', icon: '🛁' },
    { id: 'flooring', name: 'Flooring', icon: '📐' },
    { id: 'other', name: 'Other', icon: '🔨' }
  ];

  const budgetRanges = [
    'Under £100',
    '£100 - £500',
    '£500 - £1,000',
    '£1,000 - £2,500',
    '£2,500 - £5,000',
    '£5,000 - £10,000',
    '£10,000+',
    'Not sure - need quotes'
  ];

  const timelineOptions = [
    'ASAP - Emergency',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'Within 3 months',
    'Flexible timing'
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    setJobData({
      ...jobData,
      photos: [...jobData.photos, ...photoUrls]
    });
  };

  const removePhoto = (index) => {
    const newPhotos = jobData.photos.filter((_, i) => i !== index);
    setJobData({ ...jobData, photos: newPhotos });
  };

  const handleSubmit = () => {
    // Simulate job posting
    alert('Job posted successfully! You will receive quotes from interested tradespeople.');
    // Reset form or redirect
  };

  const renderStep1 = () => (
    <div>
      <h2 style={{
        color: '#B9975B',
        fontSize: '24px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>What type of work do you need?</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => setJobData({ ...jobData, category: category.id })}
            style={{
              backgroundColor: jobData.category === category.id ? '#B9975B' : '#222',
              color: jobData.category === category.id ? '#000' : '#fff',
              padding: '20px',
              borderRadius: '10px',
              border: `2px solid ${jobData.category === category.id ? '#B9975B' : '#333'}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{category.icon}</div>
            <div style={{ fontWeight: 'bold' }}>{category.name}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          color: '#B9975B',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '10px'
        }}>Job Title</label>
        <input
          type="text"
          placeholder="e.g. Fix leaking tap in kitchen"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#222',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '16px'
          }}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 style={{
        color: '#B9975B',
        fontSize: '24px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>Describe your job</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          color: '#B9975B',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '10px'
        }}>Detailed Description</label>
        <textarea
          placeholder="Describe what needs to be done, any specific requirements, and any relevant details..."
          value={jobData.description}
          onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
          rows={6}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#222',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <label style={{
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Budget Range</label>
          <select
            value={jobData.budget}
            onChange={(e) => setJobData({ ...jobData, budget: e.target.value })}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            <option value="">Select budget range</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Timeline</label>
          <select
            value={jobData.timeline}
            onChange={(e) => setJobData({ ...jobData, timeline: e.target.value })}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            <option value="">When do you need this done?</option>
            {timelineOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={{
          color: '#B9975B',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '10px'
        }}>Upload Photos (Optional)</label>
        <p style={{
          color: '#888',
          fontSize: '14px',
          marginBottom: '15px'
        }}>Photos help tradespeople understand your job better and provide more accurate quotes</p>
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#222',
            border: '2px dashed #444',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        />

        {jobData.photos.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '20px'
          }}>
            {jobData.photos.map((photo, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={photo}
                  alt={`Upload ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <button
                  onClick={() => removePhoto(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: '#ff4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 style={{
        color: '#B9975B',
        fontSize: '24px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>Location & Contact Details</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <label style={{
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Location</label>
          <input
            type="text"
            placeholder="e.g. Manchester, Birmingham"
            value={jobData.location}
            onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
            style={{
              width: '100%',
              padding: '15px',
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
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Postcode</label>
          <input
            type="text"
            placeholder="e.g. M1 1AA"
            value={jobData.postcode}
            onChange={(e) => setJobData({ ...jobData, postcode: e.target.value })}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <label style={{
            color: '#B9975B',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Your Name</label>
          <input
            type="text"
            placeholder="Full name"
            value={jobData.contact.name}
            onChange={(e) => setJobData({ 
              ...jobData, 
              contact: { ...jobData.contact, name: e.target.value }
            })}
            style={{
              width: '100%',
              padding: '15px',
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
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={jobData.contact.email}
            onChange={(e) => setJobData({ 
              ...jobData, 
              contact: { ...jobData.contact, email: e.target.value }
            })}
            style={{
              width: '100%',
              padding: '15px',
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
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px'
          }}>Phone Number</label>
          <input
            type="tel"
            placeholder="07123 456789"
            value={jobData.contact.phone}
            onChange={(e) => setJobData({ 
              ...jobData, 
              contact: { ...jobData.contact, phone: e.target.value }
            })}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>
      </div>

      <div style={{
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #333'
      }}>
        <h3 style={{
          color: '#B9975B',
          fontSize: '18px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>Additional Requirements</h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <label style={{
            color: '#ccc',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={jobData.requirements.materials}
              onChange={(e) => setJobData({
                ...jobData,
                requirements: { ...jobData.requirements, materials: e.target.checked }
              })}
              style={{ marginRight: '10px' }}
            />
            Tradesperson to provide materials
          </label>

          <label style={{
            color: '#ccc',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={jobData.requirements.permits}
              onChange={(e) => setJobData({
                ...jobData,
                requirements: { ...jobData.requirements, permits: e.target.checked }
              })}
              style={{ marginRight: '10px' }}
            />
            May require permits/certificates
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h2 style={{
        color: '#B9975B',
        fontSize: '24px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>Review & Post Your Job</h2>

      <div style={{
        backgroundColor: '#222',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #333',
        marginBottom: '30px'
      }}>
        <h3 style={{
          color: '#B9975B',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>{jobData.title}</h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <strong style={{ color: '#B9975B' }}>Category:</strong>
            <div style={{ color: '#ccc' }}>
              {categories.find(c => c.id === jobData.category)?.name}
            </div>
          </div>
          <div>
            <strong style={{ color: '#B9975B' }}>Budget:</strong>
            <div style={{ color: '#ccc' }}>{jobData.budget}</div>
          </div>
          <div>
            <strong style={{ color: '#B9975B' }}>Timeline:</strong>
            <div style={{ color: '#ccc' }}>{jobData.timeline}</div>
          </div>
          <div>
            <strong style={{ color: '#B9975B' }}>Location:</strong>
            <div style={{ color: '#ccc' }}>{jobData.location}, {jobData.postcode}</div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#B9975B' }}>Description:</strong>
          <div style={{ color: '#ccc', marginTop: '5px' }}>{jobData.description}</div>
        </div>

        {jobData.photos.length > 0 && (
          <div>
            <strong style={{ color: '#B9975B' }}>Photos:</strong>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              flexWrap: 'wrap'
            }}>
              {jobData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Job photo ${index + 1}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: '#111',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #B9975B',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#B9975B',
          fontSize: '18px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>What happens next?</h3>
        <p style={{
          color: '#ccc',
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          Your job will be visible to verified tradespeople in your area. 
          You'll receive quotes and can choose who to hire based on their profiles, reviews, and prices.
        </p>
        <button
          onClick={handleSubmit}
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
          🚀 Post Job Now
        </button>
      </div>
    </div>
  );

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
        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: '#111',
          borderRadius: '10px',
          border: '1px solid #333'
        }}>
          {[1, 2, 3, 4].map(stepNum => (
            <div
              key={stepNum}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: step >= stepNum ? '#B9975B' : '#666'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step >= stepNum ? '#B9975B' : '#333',
                color: step >= stepNum ? '#000' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: stepNum < 4 ? '10px' : '0'
              }}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div style={{
                  width: '50px',
                  height: '2px',
                  backgroundColor: step > stepNum ? '#B9975B' : '#333',
                  marginLeft: '10px'
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{
          backgroundColor: '#111',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid #333',
          marginBottom: '30px'
        }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            style={{
              padding: '12px 24px',
              backgroundColor: step === 1 ? '#333' : 'transparent',
              border: '1px solid #B9975B',
              borderRadius: '8px',
              color: step === 1 ? '#666' : '#B9975B',
              fontSize: '16px',
              cursor: step === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Previous
          </button>

          {step < 4 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!jobData.category || !jobData.title)) ||
                (step === 2 && (!jobData.description || !jobData.budget || !jobData.timeline)) ||
                (step === 3 && (!jobData.location || !jobData.contact.name || !jobData.contact.email))
              }
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
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingSystem;
