
import { List, ListItem, Skeleton } from '@chakra-ui/react'
import { CharacterCard } from 'app/characters/[page]/_components/character-card'
import type { Character } from 'types/character'

export type CharacterListProps = {
  /** Whether the characters are loading. */
  isLoading?: boolean
  /** The characters to display. */
  characters?: Character[]
  /** The function to call when a character is selected. */
  onSelect?: (char: Character) => void
}

const SKELETON_COUNT = 8

/**
 * Displays a list of characters in a grid layout.
 * A skeleton is displayed while the characters are loading.
 * The grid layout is responsive and adapts to the screen size.
 * @param isLoading - Whether the characters are loading.
 * @param characters - The characters to display.
 * @param onSelect - The function to call when a character is selected.
 * @returns A Chakra UI List component with a grid of character cards.
 */
const CharacterList = ({
  isLoading = false,
  characters,
  onSelect = (): void => {},
}: CharacterListProps): React.JSX.Element => { 
  return (
    <List.Root
      as="ul"
      unstyled
      display="grid"
      gridTemplateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)'
      }}
      gap={4}
      p={0}
      mx={{ base: 6, lg: 'auto' }}
      my={{ base: 6, lg: 8 }}
      maxWidth="72rem"
    >
      {isLoading && (
        <>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ListItem key={i}>
              <Skeleton height="20em" borderRadius="xl" data-testid="skeleton" />
            </ListItem>
          ))}
        </>
      )
      }
      {!isLoading && characters && (
        <>
          {characters.map((char) => (
            <ListItem key={char.id} onClick={() => onSelect(char)}>
              <CharacterCard char={char} />
            </ListItem>
          ))}
        </>
      )
      }
    </List.Root>
  )
}
export default CharacterList
