import { Center, Heading, Stack } from '@chakra-ui/react'
import { HomeLink } from 'components/ui/home-link'

export default function Custom404() {
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
