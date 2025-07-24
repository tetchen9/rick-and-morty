'use client'

import { Box } from '@chakra-ui/react'
import NameForm from 'components/name-form'
import AppHeading from 'components/app-heading'

export default function Home() {

  return (
    <Box as="main" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <AppHeading title="Rick and Morty" />
      <NameForm />
    </Box>
  )
}

