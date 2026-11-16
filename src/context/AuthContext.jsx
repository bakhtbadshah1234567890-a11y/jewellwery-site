import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('gemly_auth_token'))
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  // Verify stored token on initial mount
  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      const storedToken = localStorage.getItem('gemly_auth_token')
      if (!storedToken) {
        if (isMounted) setIsLoading(false)
        return
      }

      try {
        const res = await api.auth.getMe()
        if (isMounted && res.success && res.user) {
          setUser(res.user)
          setToken(storedToken)
        }
      } catch (err) {
        console.warn('[Auth] Token verification failed:', err.message)
        // If expired or invalid, remove token
        localStorage.removeItem('gemly_auth_token')
        if (isMounted) {
          setUser(null)
          setToken(null)
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    checkAuth()
    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const res = await api.auth.login({ email, password })
      if (res.success && res.token) {
        localStorage.setItem('gemly_auth_token', res.token)
        setToken(res.token)
        setUser(res.user)
        return { success: true, user: res.user }
      }
      throw new Error(res.message || 'Login failed')
    } catch (err) {
      const message = err.data?.message || err.message || 'Invalid credentials'
      setAuthError(message)
      return { success: false, error: message }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const res = await api.auth.register(userData)
      if (res.success && res.token) {
        localStorage.setItem('gemly_auth_token', res.token)
        setToken(res.token)
        setUser(res.user)
        return { success: true, user: res.user }
      }
      throw new Error(res.message || 'Registration failed')
    } catch (err) {
      const message = err.data?.message || err.message || 'Registration failed'
      setAuthError(message)
      return { success: false, error: message }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('gemly_auth_token')
    setToken(null)
    setUser(null)
    setAuthError(null)
  }, [])

  const updateProfile = useCallback(async (profileData) => {
    try {
      const res = await api.auth.updateProfile(profileData)
      if (res.success && res.user) {
        setUser(res.user)
        return { success: true, user: res.user }
      }
      throw new Error(res.message || 'Profile update failed')
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [])

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    authError,
    login,
    register,
    logout,
    updateProfile,
    clearError: () => setAuthError(null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
