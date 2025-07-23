'use client'

import { useQuery } from '@apollo/client'
import client from 'lib/apollo-client'
import { useParams } from 'next/navigation'
import { ListItem, List } from '@chakra-ui/react'
import { CharacterCard } from 'components/character-card'
import { GET_CHARACTERS } from 'queries/characters'
import AppHeading from 'components/app-heading'
import type { Character } from 'types/character'

export default function CharactersPage() {
  const params = useParams()
  const page = Number(params.page) || 1
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    client,
  })

  if (loading) return <main>Loading...</main>
  if (error) return <main>Error: {error.message}</main>

  return (
    <main>
      <AppHeading title="Rick and Morty Characters" />
      <List.Root
        as="ul"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
        p={0} 
        m={0} >
        {data.characters.results.map((char: Character) => (
          <ListItem key={char.id}>
            <CharacterCard char={char} />
          </ListItem>
        ))}
      </List.Root>
    </main>
  )
}

