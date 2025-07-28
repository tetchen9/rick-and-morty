
import { List, ListItem, Skeleton } from '@chakra-ui/react'
import { CharacterCard } from 'app/characters/[page]/_components/character-card'
import type { Character } from 'types/character'

export type CharacterListProps = {
  isLoading?: boolean
  characters?: Character[]
  onSelect?: (char: Character) => void
}

const SKELETON_COUNT = 8

export default function CharacterList({
  isLoading = false,
  characters,
  onSelect = () => {},
}: CharacterListProps) { 
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
