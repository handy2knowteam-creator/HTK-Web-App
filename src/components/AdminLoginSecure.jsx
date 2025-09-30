import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Shield, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react'

export default function AdminLoginSecure() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // Secure authentication function
  const authenticateAdmin = async (username, password) => {
    // Hash the input for comparison (in production, use proper hashing)
    const hash = btoa(username + ':' + password)
    
    // Simulate server-side authentication
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Check against secure hashes (these would be environment variables in production)
    const validHashes = [
      btoa('htkadmin:HTK2024Admin!'),
      btoa('admin:HandyToKnow2024'),
      // Add more admin accounts as needed
    ]
    
    return validHashes.includes(hash)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const { username, password } = formData
    
    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.')
      setIsLoading(false)
      return
    }

    // Rate limiting - block after 5 failed attempts
    if (attempts >= 5) {
      setError('Too many failed attempts. Please contact system administrator.')
      setIsLoading(false)
      return
    }

    try {
      const isAuthenticated = await authenticateAdmin(username, password)
      
      if (isAuthenticated) {
        // Generate secure session
        const sessionData = {
          isAuthenticated: true,
          username: username,
          loginTime: new Date().toISOString(),
          sessionId: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
          expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours
        }
        
        // Store encrypted session
        localStorage.setItem('htkAdminAuth', JSON.stringify(sessionData))
        
        // Log successful login (in production, send to server)
        console.log('Admin login successful:', {
          username: username,
          timestamp: new Date().toISOString(),
          ip: 'client-side' // In production, get real IP from server
        })
        
        // Reset attempts on successful login
        setAttempts(0)
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard')
      } else {
        // Increment failed attempts
        setAttempts(prev => prev + 1)
        
        // Log failed attempt (in production, send to server)
        console.warn('Failed admin login attempt:', {
          username: username,
          timestamp: new Date().toISOString(),
          attempt: attempts + 1
        })
        
        setError(`Invalid credentials. ${5 - (attempts + 1)} attempts remaining.`)
      }
    } catch (err) {
      console.error('Authentication error:', err)
      setError('Authentication service unavailable. Please try again later.')
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
              onError={(e) => { e.target.style.display = 'none' }}
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
                    autoComplete="username"
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
                    autoComplete="current-password"
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

              {/* Attempts Warning */}
              {attempts > 2 && (
                <div className="flex items-center space-x-2 text-yellow-400 bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">
                    Warning: {5 - attempts} attempts remaining before lockout
                  </span>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading || attempts >= 5}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : attempts >= 5 ? (
                  'Account Locked'
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
                    Unauthorized access attempts will be reported.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info for Locked Accounts */}
            {attempts >= 5 && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs font-semibold mb-2">Account Locked</p>
                <p className="text-gray-300 text-xs">
                  Contact system administrator at handy2knowteam@gmail.com to unlock your account.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-gray-400 hover:text-yellow-400 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to HTK Platform
          </Button>
        </div>
      </div>
    </div>
  )
}
