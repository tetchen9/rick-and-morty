
"use client"
import { useEffect, ComponentType } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from 'context/user-context'

const withAuthGuard = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthGuardComponent = (props: P) => {
    const { user, loading } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/')
        }
    }, [user, loading, router])

    if (loading) {
        return null
    }
    if (!user) {
        return null
    }

        return <WrappedComponent {...props} />
    };

    return AuthGuardComponent
}

export default withAuthGuard