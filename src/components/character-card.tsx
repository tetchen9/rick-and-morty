import { Box, Image, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import type { Character } from 'types/character'

export function CharacterCard({ char }: { char: Character }) {
  return (
    <Box
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}>
      <Image
        src={char.image}
        boxSize={{ base: '120', md: '150', lg: '180' }}
        borderRadius="full"
        fit="cover"
        alt={char.name}
      />
      <Text fontWeight={600} fontSize="1.2em" my={4}>
        {char.name}
      </Text>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
        minHeight="4em"
        px={3}>
        A {char.species} from {char.location.name}
      </Text>
    </Box>
  )
}
