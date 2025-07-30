'use client'

import { Box, Icon } from '@chakra-ui/react'
import { JSX } from 'react'
import { useColorModeValue } from 'components/ui/color-mode'
import { FaUserPen } from 'react-icons/fa6'
import NextLink from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * EditUserLink is a component that displays a link to the edit user page.
 * @returns A Chakra UI Box component with a NextLink component inside it.
 */
export default function EditUserLink(): JSX.Element {
  const pathname = usePathname()
  const search = useSearchParams()?.toString() ?? ''
  const currentPath = `${pathname}${search ? `?${search}` : ''}`
  
  return (
    <Box asChild 
      p={2}
      pt={1}
      borderRadius="sm"
      _hover={{ bg: useColorModeValue('gray.100', 'gray.800')}}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: useColorModeValue('gray.400', 'gray.300'),
        outlineOffset: '2px'
      }}
      aria-label="Edit user data"
    >
      <NextLink href={{pathname: '/', query: { edit: 'true', returnTo: currentPath }}}>
        <Icon size="md" color="gray.500" aria-label="Edit user data">
          <FaUserPen />
        </Icon>
      </NextLink>
    </Box>
  )
}
