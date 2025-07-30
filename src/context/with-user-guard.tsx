
'use client'
import { useEffect, ComponentType } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useUser } from 'hooks/use-user'
import Loading from 'components/loading'

/**
 * withAuthGuard is a higher-order component that protects routes.
 * It checks if the user data exists in the user context.
 * If the user data exists, it redirects to the page 
 * specified in the returnTo parameter.
 * If the user data does not exist, it redirects to the home page 
 * with a form to enter the user's name and job title.
 * @param WrappedComponent - The component to protect.
 * @returns A component that protects the route.
 */
const withAuthGuard = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthGuardComponent = (props: P) => {
    const { user, loading } = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()?.toString() ?? ''

    useEffect(() => {
      if (!loading) {
        if (user) {
          // User exists - check if there's a returnTo path
          if (typeof window !== 'undefined') {
            const returnTo = sessionStorage.getItem('returnTo')
            if (returnTo) {
              sessionStorage.removeItem('returnTo')
              router.push(returnTo)
              return
            }
          }
          // No returnTo - redirect to characters page
          if (pathname === '/') {
            router.push('/characters/1')
          }
        } else {
          // No user - store current path and redirect to form
          if (typeof window !== 'undefined') {
            const returnTo = `${pathname}${search ? `?${search}` : ''}`
            sessionStorage.setItem('returnTo', returnTo)
          }
          router.push('/')
        }
      }
    }, [user, loading, router, pathname, search])

    if (loading || !user) {
      return <Loading />
    }

    return <WrappedComponent {...props} />
  }

  return AuthGuardComponent
}

export default withAuthGuard
