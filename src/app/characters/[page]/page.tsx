'use client'

import { useQuery } from '@apollo/client'
import client from 'lib/apollo-client'
import { useParams } from 'next/navigation'
import { ListItem, Skeleton } from '@chakra-ui/react'
import { CharacterCard } from 'components/character-card'
import { CharacterList } from 'components/character-list'
import { GET_CHARACTERS } from 'queries/characters'
import AppHeading from 'components/app-heading'
import type { Character } from 'types/character'
import withAuthGuard from 'context/with-user-guard'

const CharactersPage = () => {
  const params = useParams()
  const page = Number(params.page) || 1
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    client,
  })
  let list

  if (loading) {
    list = Array.from({ length: 8 }).map((_, i) => (
      <ListItem key={i}>
        <Skeleton 
          height="320px" 
          borderRadius="xl" 
        />
      </ListItem>
    ))
  }
  else {
    list = data.characters.results.map((char: Character) => (
      <ListItem key={char.id} >
        <CharacterCard char={char} />
      </ListItem>
    ))
  }

  if (error) return <main>Error: {error.message}</main>

  return (
    <main>
      <AppHeading title="Rick and Morty Characters" />
      <CharacterList>
        {list}
      </CharacterList>
    </main>
  )
}

export default withAuthGuard(CharactersPage)
