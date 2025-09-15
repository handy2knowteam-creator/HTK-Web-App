import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import LandingPage from './components/LandingPage'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import CustomerDashboard from './components/CustomerDashboard'
import TradespersonDashboard from './components/TradespersonDashboard'

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-500 text-lg">Loading HTK...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          {!user ? (
            // Unauthenticated routes
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/:userType" element={<LoginScreen />} />
              <Route path="/register/:userType" element={<RegisterScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            // Authenticated routes
            <>
              {user.user_type === 'customer' ? (
                <Route path="/*" element={<CustomerDashboard />} />
              ) : (
                <Route path="/*" element={<TradespersonDashboard />} />
              )}
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

