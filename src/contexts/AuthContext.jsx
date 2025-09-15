import { createContext, useContext, useState, useEffect } from 'react'

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
    // Check for existing user session
    const savedUser = localStorage.getItem('htkUser')
    const savedToken = localStorage.getItem('htkToken')
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('htkUser')
        localStorage.removeItem('htkToken')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('https://0vhlizcgy3ye.manus.space/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('htkToken', data.token)
        localStorage.setItem('htkUser', JSON.stringify(data.user))
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch('https://0vhlizcgy3ye.manus.space/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('htkToken', data.token)
        localStorage.setItem('htkUser', JSON.stringify(data.user))
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, error: data.error || 'Registration failed' }
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('htkUser')
    localStorage.removeItem('htkToken')
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

