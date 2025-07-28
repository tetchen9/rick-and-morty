import { Box } from '@chakra-ui/react'
import { HomeLink } from 'components/ui/home-link'

export type OutOfRangeMessageProps = {
  page: number
}

export default function OutOfRangeMessage({ page }: OutOfRangeMessageProps) {
  return (
    <Box p={6}>
      Page {page} is out of reach, try to go to <HomeLink>first page</HomeLink>
    </Box>
  )
} 
