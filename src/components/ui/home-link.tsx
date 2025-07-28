import { Box } from '@chakra-ui/react'
import NextLink from 'next/link'

interface HomeLinkProps {
  href?: string
  children?: React.ReactNode
}

const HOME_URL = '/characters/1'

export const HomeLink = ({ href = HOME_URL, children = 'home' }: HomeLinkProps) => {
  return (
    <Box asChild textDecoration="underline">
      <NextLink href={href} >
        {children}
      </NextLink>
    </Box>
  )
} 
