import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      await register({
        ...formData,
        user_type: userType
      })
      // Navigation will be handled by the auth context
    } catch (err) {
      setError(err.message || 'Registration failed')
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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500">
            <span className="text-gray-900 font-bold text-2xl">HTK</span>
          </div>
          <h1 className="text-2xl font-bold text-yellow-500">Join HTK</h1>
          <p className="text-gray-400 mt-2">
            Create your {userType === 'customer' ? 'Customer' : 'Tradesperson'} account
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500 text-center">
              {userType === 'customer' ? 'Customer Registration' : 'Tradesperson Registration'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your location"
                  required
                />
              </div>

              {userType === 'tradesperson' && (
                <div className="space-y-2">
                  <Label htmlFor="trade" className="text-gray-300">Trade/Profession</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select your trade" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {trades.map((trade) => (
                        <SelectItem key={trade} value={trade} className="text-white hover:bg-gray-600">
                          {trade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => navigate(`/login/${userType}`)}
                  className="text-yellow-500 hover:text-yellow-400 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-400 text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

