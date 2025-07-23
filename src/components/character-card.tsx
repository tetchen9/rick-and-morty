import { Box, Image, Text } from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode'
import type { Character } from 'types/character'
import { getDescription } from 'app/utils/character-utils'

export function CharacterCard({ char }: { char: Character }) {
  const { 
    name, 
    image, 
    location: { name: locationName }, 
    species 
  } = char

  return (
    <Box
      maxW={'26rem'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'sm'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}>
      <Image
        src={image}
        boxSize={{ base: '8em', md: '10em', lg: '12em' }}
        borderRadius="full"
        fit="cover"
        alt={name}
        mx="auto"
      />
      <Text 
        fontWeight={600} 
        fontSize="1.2em" 
        mt={3}>
        {name}
      </Text>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
      >
        {getDescription(locationName, species)}
      </Text>
    </Box>
  )
}
