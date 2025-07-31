'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { UserInfo } from 'types/user-info'

type UserContextType = {
  /** the user data */
  user: UserInfo | null
  /** sets the user data */
  setUser: (user: UserInfo) => void
  /** clears the user data */
  clearUser: () => void
  /** whether the user data is loading */
  loading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const STORAGE_KEY = 'user-info'

/**
 * The UserProvider is a wrapper component that:
 * - manages state: uses useState to track user data and loading state
 * - persists data: automatically saves/loads user data from localStorage
 * - provides context: wraps child components with the context values
 * @param children - the children of the provider
 * @returns a UserContext.Provider component
 */
export function UserProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [user, setUserState] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null && stored !== undefined && stored !== '') {
      try {
        setUserState(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  /**
   * Sets the user data in the localStorage.
   * @param user - the user data to set
   */
  const setUser = (user: UserInfo): void => {
    setUserState(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  /**
   * Clears the user data from the localStorage.
   * This function is not used in the app, since there's no
   * logout functionality, but it's here for future reference.
   */
  const clearUser = (): void => {
    setUserState(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

