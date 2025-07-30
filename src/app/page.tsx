'use client'
import { useEffect, useState, Suspense } from 'react'
import { Box } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import NameForm from 'components/name-form'
import AppHeading from 'components/ui/app-heading'
import Loading from 'components/loading'
import { useUser } from 'hooks/use-user'

/**
 * Displays the home page content.
 * It displays a form to enter the user's name and job title.
 * @returns A Chakra UI Box component with a AppHeading and a NameForm component inside it.
 */
const HomeContent = () => {
  const [mounted, setMounted] = useState(false)
  const { loading } = useUser()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'
  const returnTo = searchParams.get('returnTo')
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Store returnTo in sessionStorage when in edit mode
  useEffect(() => {
    if (mounted && isEditMode && returnTo && typeof window !== 'undefined') {
      sessionStorage.setItem('returnTo', returnTo)
    }
  }, [mounted, isEditMode, returnTo])
  
  if (!mounted || loading) return null  // Avoid SSR issues and show nothing while loading

  const title = isEditMode ? 'Update Your Details' : 'Rick and Morty'

  return (
    <>
      <Box as="main" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <AppHeading title={title} />
        <NameForm />
      </Box>
    </>
  )
}

/**
 * Displays the home page. 
 * It uses a suspense fallback to display a loading component.
 * @returns A Chakra UI Box component with a HomeContent component inside it.
 */
export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  )
}

