'use client'

import { Text } from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'
import type { Character } from 'types/character'
import { getDescription } from 'app/utils/character-utils'
import ChakraNextImage from 'components/ui/chakra-next-image'
import { ClickableCard } from 'components/ui/clickable-card'

/**
 * Displays a character card.
 * It displays the character's name, image, origin and species.
 * It also displays a button to open the character details page.
 * @param char - The character to display.
 * @param onClick - Function to call when the card is clicked
 * @returns A ClickableCard component with character information inside it.
 */
export function CharacterCard({ char, onClick }: { char: Character, onClick: () => void }): React.JSX.Element {
  const { 
    name, 
    image, 
    origin: { name: originName }, 
    species 
  } = char

  return (
    <ClickableCard 
      onClick={onClick}
      aria-label={`Open details for ${name}`}
    >
      <ChakraNextImage 
        src={image}
        alt={name}
        boxSize={{ base: '8em', md: '10em', lg: '12em' }}
        borderRadius="full"
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
    </ClickableCard>
  )
}
