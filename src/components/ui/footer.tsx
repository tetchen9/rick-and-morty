
import { Container, Text } from '@chakra-ui/react'

const version = process.env.NEXT_PUBLIC_VERSION ?? 'dev'

export const Footer = () => (
  <Container as="footer" py={{ base: '2', md: '6' }}>
    <Text fontSize="sm" color="fg.muted" textAlign="right">
      Rick and Morty | Version: {version}
    </Text>
  </Container>
)
