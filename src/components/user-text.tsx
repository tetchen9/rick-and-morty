'use client'

import { Text, Box, Icon } from '@chakra-ui/react'
import { useUser } from 'context/user-context'
import { getWelcomeText } from 'app/utils/character-utils'
import { JSX } from 'react'
import { FaUserPen } from 'react-icons/fa6'

export default function UserText(): JSX.Element {
  const { user } = useUser()

  if (!user) {
    return <></>
  }

  return (
    <Box 
      display="flex" 
      flexDirection="row"
      gap={2}
      alignItems="center"
      mr={{ base: 4, md: 6, lg: 8 }}
      marginLeft="auto"
      width="fit-content"
    >
      <Icon size="md" color="gray.500">
        <FaUserPen />
      </Icon>
      <Text>{getWelcomeText(user)}</Text>
    </Box>
  )
}
