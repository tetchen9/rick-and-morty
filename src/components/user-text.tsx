'use client'

import { Text, Box } from '@chakra-ui/react'
import { useUser } from 'hooks/use-user'
import { getWelcomeText } from 'app/utils/character-utils'
import { JSX } from 'react'
import EditUserLink from './edit-user-link'

/**
 * Displays the user's name, job title and a link to the edit user page.
 * It gets user data from the user context.
 * @returns A Chakra UI component with a Text and an EditUserLink component inside it.
 */
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
      mr={{ base: 6, lg: 8 }}
      marginLeft="auto"
      width="fit-content"
    >
      <EditUserLink />
      <Text>{getWelcomeText(user)}</Text>
    </Box>
  )
}
