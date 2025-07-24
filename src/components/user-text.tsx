'use client'

import { Text, Box, Icon } from '@chakra-ui/react'
import { useUser } from 'context/user-context'
import { getWelcomeText } from 'app/utils/character-utils'
import { JSX } from 'react'
import { FaUserPen } from "react-icons/fa6"
import { useColorModeValue } from './ui/color-mode'


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
      bg={useColorModeValue('gray.200', 'gray.800')}
      borderRadius="md"
      p={4}
      m={4}
      marginLeft="auto"
      width="fit-content"
    >
      <Icon size="md" color="gray.200">
        <FaUserPen />
      </Icon>
      <Text>{getWelcomeText(user)}</Text>
    </Box>
  )
}
