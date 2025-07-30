
import { Container, Text } from '@chakra-ui/react'

const version = process.env.NEXT_PUBLIC_VERSION ?? 'dev'

/**
 * Footer is a component that displays the footer of the app.
 * It displays the version of the app.
 * @param version - The version of the app.
 * @returns A Chakra UI Container component with a Text component inside it.
 */
export const Footer = () => (
  <Container as="footer" py={{ base: '2', md: '6' }}>
    <Text fontSize="sm" color="fg.muted" textAlign="right">
      Rick and Morty | Version: {version}
    </Text>
  </Container>
)
