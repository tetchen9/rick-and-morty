'use client'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import NameForm from 'components/name-form'
import AppHeading from 'components/app-heading'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null  // Avoid SSR issues

  return (
    <Box as="main" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <AppHeading title="Rick and Morty" />
      <NameForm />
    </Box>
  )
}

