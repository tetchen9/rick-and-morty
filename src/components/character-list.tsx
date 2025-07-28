import { List } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export function CharacterList({ children }: { children: ReactNode }) {
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
      {children}
    </List.Root>
  )
}
