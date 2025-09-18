import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
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

    if (userType === 'tradesperson' && !formData.trade) {
      setError('Please select your trade')
      setIsLoading(false)
      return
    }

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        userType: userType
      }

      // Add trade for tradespeople
      if (userType === 'tradesperson') {
        registrationData.trade = formData.trade
      }

      const result = await register(registrationData)
      
      if (result.success) {
        // Registration successful, user will be redirected by AuthContext
        navigate('/dashboard')
      } else {
        setError(result.error || 'Registration failed')
      }
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
    <div className="min-h-screen bg-black text-white">
      {/* Header with HTK Logo */}
      <header className="htk-header border-b htk-border-gold">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="htk-logo-container">
              <img src="/htk-logo-large.png" alt="HTK Logo" className="h-20 w-20" />
              <span className="htk-logo-text text-2xl">HANDY TO KNOW</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <Card className="htk-card w-full max-w-md htk-shadow-gold">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="htk-logo-container justify-center mb-4">
                <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-4">
                  <span className="text-black font-bold text-xl">HTK</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-htk-gold mb-2">Join HTK</h1>
              <p className="htk-text-muted">Create your {userType === 'customer' ? 'Customer' : 'Tradesperson'} account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="bg-gradient-to-r from-htk-gold/10 to-htk-gold-dark/10 rounded-lg p-6 border htk-border-gold">
                <h2 className="text-lg font-semibold text-htk-gold mb-4">
                  {userType === 'customer' ? 'Customer Registration' : 'Tradesperson Registration'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-htk-gold-light">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-htk-gold-light">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-htk-gold-light">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-htk-gold-light">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>

                  {userType === 'tradesperson' && (
                    <div>
                      <Label htmlFor="trade" className="text-htk-gold-light">Trade/Profession</Label>
                      <Select onValueChange={handleSelectChange} required>
                        <SelectTrigger className="bg-gray-800 border-htk-gold/30 text-white focus:border-htk-gold">
                          <SelectValue placeholder="Select your trade" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-htk-gold/30 text-white">
                          {trades.map((trade) => (
                            <SelectItem key={trade} value={trade} className="text-white hover:bg-gray-700">
                              {trade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password" className="text-htk-gold-light">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-htk-gold-light">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-htk-gold/30 text-white placeholder-gray-400 focus:border-htk-gold"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="htk-btn-gold w-full py-3 text-lg font-semibold"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center space-y-4">
                <p className="htk-text-muted">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate(`/login/${userType}`)}
                    className="text-htk-gold hover:text-htk-gold-light underline"
                  >
                    Sign in here
                  </button>
                </p>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black"
                >
                  ← Back to Home
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="htk-header border-t htk-border-gold py-6">
        <div className="htk-container px-6">
          <div className="text-center">
            <p className="htk-text-muted text-sm">
              © 2024 HTK - Handy To Know. Built by trades, for trades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

