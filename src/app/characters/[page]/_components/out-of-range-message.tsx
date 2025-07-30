import { Box } from '@chakra-ui/react'
import { HomeLink } from 'components/ui/home-link'

export type OutOfRangeMessageProps = {
  /** The page number, where the user is trying to go. */
  page: number
}

/**
 * Displays a message and a link to the first page when the page is out of range.
 * @param page - The page number.
 * @returns A Chakra UI Box component with a Text component inside it.
 */
const OutOfRangeMessage = ({ page }: OutOfRangeMessageProps) => {
  return (
    <Box p={6}>
      Page {page} is out of reach, try to go to <HomeLink>first page</HomeLink>
    </Box>
  )
} 

export default OutOfRangeMessage
