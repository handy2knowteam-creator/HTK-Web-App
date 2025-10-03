import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Lock, User, AlertCircle } from 'lucide-react'

function AdminLogin({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        // Store the session token
        localStorage.setItem('htk_admin_token', data.token)
        localStorage.setItem('htk_admin_login_time', Date.now().toString())
        
        // Call the success callback
        if (onLoginSuccess) {
          onLoginSuccess(data.token)
        }
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="htk-bg-primary min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="htk-card border-htk-gold/30">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-htk-gold/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-htk-gold" />
              </div>
              <CardTitle className="text-2xl htk-gold-text">HTK Admin</CardTitle>
              <p className="text-htk-platinum/60 text-sm">Secure Admin Access</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="htk-gold-text flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter admin username"
                    className="htk-input"
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="htk-gold-text flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    className="htk-input"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !formData.username || !formData.password}
                  className="htk-button-primary w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Login to Admin'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-htk-gold/20">
                <div className="flex items-center justify-center gap-1 text-xs text-htk-platinum/60">
                  <Lock className="w-3 h-3" />
                  <span>Secure Admin Portal</span>
                </div>
                <p className="text-center text-xs text-htk-platinum/40 mt-1">
                  Authorized Personnel Only
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
