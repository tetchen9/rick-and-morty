import { useContext } from 'react'
import { UserContext } from 'context/user-context'
import type { UserInfo } from 'types/user-info'

/**
 * useUser is a hook that returns the user context.
 * @returns The user context.
 */
export function useUser(): { user: UserInfo | null; setUser: (user: UserInfo) => void; clearUser: () => void; loading: boolean } {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
