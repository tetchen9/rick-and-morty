'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserInfo = {
  name: string
  role: string
}

interface UserContextType {
  user: UserInfo | null
  setUser: (user: UserInfo) => void
  clearUser: () => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'user-info'

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    console.log('Loading user from localStorage:', stored)
    if (stored) setUserState(JSON.parse(stored))
    setLoading(false)
  }, [])

  const setUser = (user: UserInfo) => {
    setUserState(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  const clearUser = () => {
    setUserState(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
