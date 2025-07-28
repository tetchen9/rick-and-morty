'use client'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import NameForm from 'components/name-form'
import AppHeading from 'components/ui/app-heading'
import { useUser } from 'context/user-context'
import withAuthGuard from 'context/with-user-guard'

const UserFormPage = () => {
  const [mounted, setMounted] = useState(false)
  const { user } = useUser()
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null  // Avoid SSR issues

  return (
    <Box as="main" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <AppHeading title="Update Your Details" />
      <NameForm user={user || undefined}/>
    </Box>
  )
}

export default withAuthGuard(UserFormPage)
