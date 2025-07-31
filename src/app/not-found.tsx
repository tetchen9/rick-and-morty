import { Center, Heading, Stack } from '@chakra-ui/react'
import { HomeLink } from 'components/ui/home-link'

/**
 * Displays a message and a link to the first page when the page is not found.
 * @returns A component with a message and a HomeLink component inside it.
 */
const Custom404 = (): React.JSX.Element => {
  return (
    <Center minH={['50vh', '100vh']} width="100%" p={6}>
      <Stack>
        <Heading as='h1'>
          Nobody exists on purpose. Nobody belongs anywhere. 
          The page you are looking for is not found.
        </Heading>
        <HomeLink>Let me take you home.</HomeLink>
      </Stack>
    </Center>
  )
}

export default Custom404
