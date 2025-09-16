import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginScreen() {
  const navigate = useNavigate()
  const { userType } = useParams()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password, userType)
      // Navigation will be handled by the auth context
    } catch (err) {
      setError(err.message || 'Login failed')
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
              <h1 className="text-2xl font-bold text-htk-gold mb-2">Welcome Back</h1>
              <p className="htk-text-muted">Sign in as {userType === 'customer' ? 'Customer' : 'Tradesperson'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="bg-gradient-to-r from-htk-gold/10 to-htk-gold-dark/10 rounded-lg p-6 border htk-border-gold">
                <h2 className="text-lg font-semibold text-htk-gold mb-4">
                  {userType === 'customer' ? 'Customer Login' : 'Tradesperson Login'}
                </h2>
                
                <div className="space-y-4">
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
                    <Label htmlFor="password" className="text-htk-gold-light">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center space-y-4">
                <p className="htk-text-muted">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate(`/register/${userType}`)}
                    className="text-htk-gold hover:text-htk-gold-light underline"
                  >
                    Sign up here
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

