'use client'

import { Box, Image, Text } from '@chakra-ui/react'
import { useColorModeValue } from '../../../../components/ui/color-mode'
import type { Character } from 'types/character'
import { getDescription } from 'app/utils/character-utils'

export function CharacterCard({ char }: { char: Character }) {
  const { 
    name, 
    image, 
    origin: { name: originName }, 
    species 
  } = char

  return (
    <Box
      as="button"
      maxW={'26rem'}
      height="100%"
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'sm'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      cursor="pointer"
      _hover={{ bg: useColorModeValue('gray.100', 'gray.700')}}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: useColorModeValue('gray.400', 'gray.300'), // adjust color as needed
        outlineOffset: '2px'
      }}
      aria-label={`Open details for ${name}`}
    >
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
        mt={3}
      >
        {name}
      </Text>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        {getDescription(originName, species)}
      </Text>
    </Box>
  )
}
