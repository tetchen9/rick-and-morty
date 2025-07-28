'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import client from 'lib/apollo-client'
import { useParams, useRouter } from 'next/navigation'
import { GET_CHARACTERS } from 'queries/characters'
import AppHeading from 'components/ui/app-heading'
import type { Character } from 'types/character'
import withAuthGuard from 'context/with-user-guard'
import UserText from 'components/user-text'
import ErrorMessage from 'components/ui/error-message'
import Pagination from 'components/ui/pagination'
import CharacterList from 'app/characters/[page]/_components/character-list'
import { CharacterModal } from 'app/characters/[page]/_components/character-modal'
import OutOfRangeMessage from './_components/out-of-range-message'

const PAGE_SIZE = 20

const CharactersPage = () => {
  const params = useParams()
  const router = useRouter()
  const page = Number(params.page) || 1
  const [selectedChar, setSelectedChar] = useState<Character | null>(null)

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    client,
  })

  const setPage = (newPage: number) => {
    router.push(`/characters/${newPage}`)
  }

  return (
    <main>
      <AppHeading title="Rick and Morty Characters" />
      <UserText />
      {error && <ErrorMessage message={error.message} />}
      {!error && <CharacterList
        isLoading={loading}
        characters={data?.characters?.results}
        onSelect={setSelectedChar}
      />}
      {!loading && !!data?.characters?.info?.count && (
        <>
          <Pagination
            page={page}
            setPage={setPage}
            count={data.characters.info.count}
            pageSize={PAGE_SIZE}
          />
          <CharacterModal 
            selectedChar={selectedChar} 
            onClose={() => setSelectedChar(null)} 
          />
        </>
      )}
      {!loading && data?.characters?.info?.count === null && (
        <OutOfRangeMessage page={page} />
      )}
    </main>
  )
}

export default withAuthGuard(CharactersPage)
