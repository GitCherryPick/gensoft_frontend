"use client"
import { createContext, useContext, useState } from "react"
import { loginUser, logoutUser } from "./auth-service"

const AuthContext = createContext(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function login(credentials) {
    setIsLoading(true)
    setError(null)

    try {
      const userData = await loginUser(credentials)
      setUser(userData)
      return userData
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    await logoutUser()
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
