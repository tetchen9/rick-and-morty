'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'

type ClickableCardProps = Omit<BoxProps, 'onClick'> & {
  onClick: () => void
  children: React.ReactNode
}

/**
 * A clickable card component that supports mouse and keyboard interactions.
 * @param onClick - a function to call when the card is clicked or activated via keyboard
 * @param children - content to render inside the card
 * @param props - additional Box props
 * @returns a clickable Box component
 */
export function ClickableCard({ onClick, children, ...props }: ClickableCardProps): React.JSX.Element {
  return (
    <Box
      maxW={'26rem'}
      height="100%"
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'sm'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      cursor="pointer"
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      _hover={{ bg: useColorModeValue('gray.100', 'gray.700')}}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: useColorModeValue('gray.400', 'gray.300'),
        outlineOffset: '2px'
      }}
      {...props}
    >
      {children}
    </Box>
  )
} 
