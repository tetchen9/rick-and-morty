import { useContext } from 'react'
import { UserContext } from 'context/user-context'

/**
 * useUser is a hook that returns the user context.
 * @returns The user context.
 */
export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
