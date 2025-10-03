import React, { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

function AdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem('htk_admin_token')
    const loginTime = localStorage.getItem('htk_admin_login_time')
    
    if (token && loginTime) {
      // Check if session is still valid (24 hours)
      const sessionAge = Date.now() - parseInt(loginTime)
      const maxSessionAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (sessionAge < maxSessionAge) {
        setIsAuthenticated(true)
      } else {
        // Session expired, clear storage
        localStorage.removeItem('htk_admin_token')
        localStorage.removeItem('htk_admin_login_time')
        setIsAuthenticated(false)
      }
    }
    
    setIsLoading(false)
  }

  const handleLoginSuccess = (token) => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('htk_admin_token')
    localStorage.removeItem('htk_admin_login_time')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="htk-bg-primary min-h-screen flex items-center justify-center">
        <div className="text-htk-gold">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}

export default AdminAuth
