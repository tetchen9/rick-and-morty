import { Box } from '@chakra-ui/react'
import NextLink from 'next/link'

interface HomeLinkProps {
  href?: string
  children?: React.ReactNode
}

const HOME_URL = '/characters/1'

/**
 * HomeLink is a component that displays a link to the home page.
 * @param href - The href of the link.
 * @param children - The children of the link.
 * @returns A Chakra UI Box component with a NextLink component inside it.
 */
export const HomeLink = ({ href = HOME_URL, children = 'home' }: HomeLinkProps) => {
  return (
    <Box asChild textDecoration="underline">
      <NextLink href={href} >
        {children}
      </NextLink>
    </Box>
  )
} 
