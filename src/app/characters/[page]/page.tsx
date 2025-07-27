'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import client from 'lib/apollo-client'
import { useParams } from 'next/navigation'
import { ListItem, Skeleton, Text, Box } from '@chakra-ui/react'
import { CharacterCard } from 'components/character-card'
import { CharacterModal } from 'components/character-modal'
import { CharacterList } from 'components/character-list'
import { GET_CHARACTERS } from 'queries/characters'
import AppHeading from 'components/app-heading'
import type { Character } from 'types/character'
import withAuthGuard from 'context/with-user-guard'
import Pagination from 'components/ui/pagination'
import UserText from 'components/user-text'

const CharactersPage = () => {
  const params = useParams()
  const page = Number(params.page) || 1
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [selectedChar, setSelectedChar] = useState<Character | null>(null)

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
    client,
  })

  const setPage = (newPage: number) => {
    setCurrentPage(newPage)
  }

  let list

  if (error) {
    return <Box textAlign="center" mt={10}>
      <Text>Error: {error.message}</Text>
    </Box>
  }

  if (loading) {
    list = Array.from({ length: 8 }).map((_, i) => (
      <ListItem key={i}>
        <Skeleton 
          height="20em" 
          borderRadius="xl" 
        />
      </ListItem>
    ))
  }
  else {
    list = data.characters.results.map((char: Character) => (
      <ListItem 
        key={char.id} 
        onClick={() => setSelectedChar(char)}
      >
        <CharacterCard char={char} />
      </ListItem>
    ))
  }

  return (
    <main>
      <AppHeading title="Rick and Morty Characters" />
      <UserText />
      <CharacterList>
        {list}
      </CharacterList>
      {!loading && <Pagination 
        page={currentPage} 
        setPage={setPage} 
        count={data.characters.info.count} 
        pageSize={20}
      /> }
      <CharacterModal 
        selectedChar={selectedChar} 
        onClose={() => setSelectedChar(null)} 
      />
    </main>
  )
}

export default withAuthGuard(CharactersPage)
