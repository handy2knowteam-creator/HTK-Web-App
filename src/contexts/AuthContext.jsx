import { createContext, useContext, useState, useEffect } from 'react'
import tempDB from '../utils/tempDatabase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session in temporary database
    const savedUser = localStorage.getItem('htk_current_user')
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('htk_current_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate network delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const result = tempDB.authenticateUser(email, password)
      
      if (result.success) {
        const userData = {
          ...result.user,
          userType: result.userType
        }
        setUser(userData)
        localStorage.setItem('htk_current_user', JSON.stringify(userData))
        return { success: true, user: userData }
      } else {
        return { success: false, error: result.message || 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const register = async (userData) => {
    try {
      // Simulate network delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let result
      
      if (userData.userType === 'customer') {
        result = tempDB.registerCustomer(userData)
      } else if (userData.userType === 'tradesperson') {
        result = tempDB.registerTradesperson(userData)
      } else {
        return { success: false, error: 'Invalid user type' }
      }

      if (result.success) {
        const newUser = {
          ...result[userData.userType],
          userType: userData.userType
        }
        setUser(newUser)
        localStorage.setItem('htk_current_user', JSON.stringify(newUser))
        return { success: true, user: newUser }
      } else {
        return { success: false, error: 'Registration failed' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('htk_current_user')
  }

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('htk_current_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

