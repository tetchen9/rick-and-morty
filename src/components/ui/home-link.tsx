import { Box } from '@chakra-ui/react'
import { PATHS } from 'consts/paths'
import NextLink from 'next/link'

type HomeLinkProps = {
  /** the href of the link. */
  href?: string
  /** the children of the link. */
  children?: React.ReactNode
}

/**
 * HomeLink is a component that displays a link to the home page.
 * @param href - the href of the link.
 * @param children - the children of the link.
 * @returns a Chakra UI Box component with a NextLink component inside it.
 */
export const HomeLink = ({ href = PATHS.CHARACTERS, children = 'home' }: HomeLinkProps): React.JSX.Element => {
  return (
    <Box asChild textDecoration="underline">
      <NextLink href={href} >
        {children}
      </NextLink>
    </Box>
  )
} 
