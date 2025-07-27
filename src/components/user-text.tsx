'use client'

import { Text, Box } from '@chakra-ui/react'
import { useUser } from 'context/user-context'
import { getWelcomeText } from 'app/utils/character-utils'
import { JSX } from 'react'
import EditUserLink from './edit-user-link'

export default function UserText(): JSX.Element {
  const { user } = useUser()

  if (!user) {
    return <></>
  }

  return (
    <Box 
      display="flex" 
      flexDirection="row"
      gap={1}
      alignItems="center"
      mr={{ base: 4, md: 6, lg: 8 }}
      marginLeft="auto"
      width="fit-content"
    >
      <EditUserLink />
      <Text>{getWelcomeText(user)}</Text>
    </Box>
  )
}
