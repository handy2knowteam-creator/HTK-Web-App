import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterScreen() {
  const navigate = useNavigate()
  const { userType } = useParams()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    trade: userType === 'tradesperson' ? '' : undefined
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const trades = [
    'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Roofer',
    'Landscaper', 'Cleaner', 'Handyman', 'Tiler', 'Plasterer',
    'Glazier', 'Locksmith', 'HVAC Technician', 'Flooring Specialist'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    // Send registration data to email via FormSubmit
    try {
      const formSubmitData = new FormData()
      formSubmitData.append('_to', 'handy2knowteam@gmail.com')
      formSubmitData.append('_subject', `HTK Registration - ${userType === 'tradesperson' ? 'Tradesperson' : 'Customer'}`)
      formSubmitData.append('_template', 'table')
      formSubmitData.append('_next', `${window.location.origin}/thank-you`)
      formSubmitData.append('Registration Type', userType === 'tradesperson' ? 'Tradesperson' : 'Customer')
      formSubmitData.append('Name', formData.name)
      formSubmitData.append('Email', formData.email)
      formSubmitData.append('Phone', formData.phone)
      formSubmitData.append('Location', formData.location)
      if (userType === 'tradesperson' && formData.trade) {
        formSubmitData.append('Trade', formData.trade)
      }
      formSubmitData.append('Registration Date', new Date().toLocaleString())

      await fetch('https://formsubmit.co/handy2knowteam@gmail.com', {
        method: 'POST',
        body: formSubmitData
      })
    } catch (error) {
      console.error('Error sending registration email:', error)
    }

    if (userType === 'tradesperson' && !formData.trade) {
      setError('Please select your trade/profession')
      setIsLoading(false)
      return
    }

    try {
      await register(formData, userType)
      
      // Send email notification
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        userType: userType,
        trade: formData.trade || 'N/A',
        registrationDate: new Date().toISOString()
      }

      // Send to FormSubmit
      const formSubmitData = new FormData()
      formSubmitData.append('_subject', `New ${userType} Registration - HTK Platform`)
      formSubmitData.append('Name', formData.name)
      formSubmitData.append('Email', formData.email)
      formSubmitData.append('Phone', formData.phone)
      formSubmitData.append('Location', formData.location)
      formSubmitData.append('User Type', userType)
      formSubmitData.append('Trade/Profession', formData.trade || 'N/A')
      formSubmitData.append('Registration Date', new Date().toLocaleString())

      fetch('https://formsubmit.co/handy2knowteam@gmail.com', {
        method: 'POST',
        body: formSubmitData
      })

      navigate(`/${userType}-dashboard`)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      trade: value
    })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#D4AF37',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#111',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #D4AF37'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/htk-logo-new.png" 
            alt="HTK Logo" 
            style={{ height: '80px', width: 'auto', marginBottom: '1rem' }}
          />
          <h1 style={{ color: '#D4AF37', fontSize: '2rem', marginBottom: '0.5rem' }}>HTK</h1>
          <p style={{ color: '#D4AF37', marginBottom: '1rem' }}>Join HTK</p>
          <p style={{ color: '#888' }}>Create your {userType === 'customer' ? 'Customer' : 'Tradesperson'} account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              backgroundColor: '#ff000020',
              border: '1px solid #ff0000',
              color: '#ff6666',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #D4AF37',
            marginBottom: '1rem'
          }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '1rem' }}>
              {userType === 'customer' ? 'Customer Registration' : 'Tradesperson Registration'}
            </h2>

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
              Full Name
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
              Phone Number
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
              Location
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            {userType === 'tradesperson' && (
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
                Trade/Profession
                <select
                  name="trade"
                  value={formData.trade}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '0.5rem',
                    backgroundColor: '#222',
                    color: '#D4AF37',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select your trade</option>
                  {trades.map(trade => (
                    <option key={trade} value={trade}>{trade}</option>
                  ))}
                </select>
              </label>
            )}

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#D4AF37' }}>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '1rem', color: '#D4AF37' }}>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="htk-input-real-gold"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '0.5rem',
                  backgroundColor: '#222',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37',
                  borderRadius: '4px'
                }}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="htk-btn-real-gold"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(45deg, #B8941F, #D4AF37, #B8941F)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

