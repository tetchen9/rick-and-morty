'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AppHeading from 'components/ui/app-heading'
import type { Character } from 'types/character'
import withAuthGuard from 'context/with-user-guard'
import UserText from 'components/user-text'
import ErrorMessage from 'components/ui/error-message'
import Pagination from 'components/ui/pagination'
import CharacterList from 'app/characters/[page]/_components/character-list'
import CharacterModal from 'app/characters/[page]/_components/character-modal'
import OutOfRangeMessage from 'app/characters/[page]/_components/out-of-range-message'
import { useCharacters } from 'hooks/use-characters'
import { PATHS } from 'consts/paths'

const PAGE_SIZE = 20

const CharactersPage = (): React.JSX.Element => {
  const params = useParams()
  const router = useRouter()
  const page = Number(params.page) || 1
  const [selectedChar, setSelectedChar] = useState<Character | null>(null)

  const { loading, error, characters } = useCharacters(page)
  const { results, info: { count } = {} } = characters ?? {}

  const setPage = (newPage: number): void => {
    router.push(`${PATHS.CHARACTERS_BASE}/${newPage}`)
  }

  return (
    <main>
      <AppHeading title="Rick and Morty Characters" />
      <UserText />
      {error && <ErrorMessage message={error.message} />}
      {!error && <CharacterList
        isLoading={loading}
        characters={results}
        onSelect={setSelectedChar}
      />}
      {!loading && count !== undefined && count !== null && (
        <>
          <Pagination
            page={page}
            setPage={setPage}
            count={count}
            pageSize={PAGE_SIZE}
          />
          <CharacterModal 
            selectedChar={selectedChar} 
            onClose={() => {
              setSelectedChar(null)
            }}
          />
        </>
      )}
      {!loading && count === null && (
        <OutOfRangeMessage page={page} />
      )}
    </main>
  )
}

export default withAuthGuard(CharactersPage)
