'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { UserInfo } from 'types/user-info'

interface UserContextType {
  user: UserInfo | null
  setUser: (user: UserInfo) => void
  clearUser: () => void
  loading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'user-info'

/**
 * UserProvider is a component that provides the user context.
 * It stores the user data in the localStorage.
 * @param children - The children of the provider.
 * @returns A UserContext.Provider component.
 */
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

