/* eslint-disable react-refresh/only-export-components -- AuthProvider + useAuth pair */
import { createContext, useContext, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

const USER_KEY = 'farmycure_user'
const TOKEN_KEY = 'farmycure_token'
const REFRESH_KEY = 'farmycure_refresh_token'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    } catch {
      return null
    }
  })

  const login = async (email, password) => {
    const data = await api.auth.login({ email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(REFRESH_KEY, data.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    setUser(data)
    return data
  }

  const register = async (payload) => {
    const data = await api.auth.register(payload)
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(REFRESH_KEY, data.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    setUser(data)
    return data
  }

  const logout = () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY)
    if (refreshToken) {
      api.auth.logout(refreshToken).catch(() => null)
    }
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    setUser,
    updateProfileImage: async (file) => {
      const formData = new FormData()
      formData.append('image', file)
      const data = await api.user.updateProfileImage(formData)
      const nextUser = data.user || user
      const merged = {
        ...user,
        ...nextUser,
        profileImage: data.image ?? nextUser.profileImage ?? user?.profileImage,
      }
      localStorage.setItem(USER_KEY, JSON.stringify(merged))
      setUser(merged)
      return merged
    },
    updateProfile: async (payload) => {
      const data = await api.user.updateProfile(payload)
      const updated = data.user ?? data
      const merged = {
        ...user,
        ...updated,
        name: updated.name ?? user?.name,
        email: updated.email ?? user?.email,
        phone: updated.phone ?? user?.phone,
        role: updated.role ?? user?.role,
        _id: updated._id ?? user?._id,
      }
      localStorage.setItem(USER_KEY, JSON.stringify(merged))
      setUser(merged)
      return merged
    }
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
