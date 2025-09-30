import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Shield, Lock, User, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Admin credentials (in production, this should be environment variables)
  const ADMIN_CREDENTIALS = {
    username: 'htkadmin',
    password: 'HTK2024Admin!',
    backupUsername: 'admin',
    backupPassword: 'HandyToKnow2024'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { username, password } = formData
    
    if ((username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) ||
        (username === ADMIN_CREDENTIALS.backupUsername && password === ADMIN_CREDENTIALS.backupPassword)) {
      
      // Store admin session
      localStorage.setItem('htkAdminAuth', JSON.stringify({
        isAuthenticated: true,
        username: username,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substr(2, 9)
      }))
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials. Please check your username and password.')
    }
    
    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              className="h-20 w-20 filter drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            HTK Admin Portal
          </h1>
          <p className="text-gray-400">Secure access to platform management</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full p-3">
                <Shield className="h-6 w-6 text-black" />
              </div>
            </div>
            <CardTitle className="text-yellow-400 text-xl">Administrator Login</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Access Admin Dashboard'
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-semibold text-sm">Security Notice</h4>
                  <p className="text-gray-300 text-xs mt-1">
                    This is a secure admin portal. All login attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>

            {/* Development Credentials (remove in production) */}
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-xs font-semibold mb-2">Development Access:</p>
              <p className="text-gray-300 text-xs">Username: htkadmin | Password: HTK2024Admin!</p>
              <p className="text-gray-300 text-xs">Alt: admin | Password: HandyToKnow2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-gray-400 hover:text-yellow-400"
          >
            ← Back to HTK Platform
          </Button>
        </div>
      </div>
    </div>
  )
}
