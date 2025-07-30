
'use client'
import { useEffect, ComponentType } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useUser } from 'context/user-context'
import Loading from 'components/loading'

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
