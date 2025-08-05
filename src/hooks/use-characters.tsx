import { useQuery, ApolloError } from '@apollo/client'
import { GET_CHARACTERS } from 'queries/characters'
import type { Character } from 'types/character'
import client from 'lib/apollo-client'

type CharactersData = {
  characters: {
    info: {
      count: number
    }
    results: Character[]
  }
}

/**
 * A helper function to add the Apollo client to the options.
 * is used to avoid the Apollo client being added in the test environment.
 * @param options - the options to add the client to.
 * @returns the options with the client.
 */
function withClient<T extends object>(options: T): T & { client?: typeof client } {
  return process.env.NODE_ENV !== 'test' ? { ...options, client } : options
}

/**
 * A custom hook to fetch characters list by page.
 * @param page - the page number to fetch characters for.
 * @returns an object containing loading state, error, and characters data.
 */
export const useCharacters = (page: number): {
  loading: boolean
  error: ApolloError | undefined
  characters: CharactersData['characters'] | undefined
} => {
  const { loading, error, data } = useQuery<CharactersData>(
    GET_CHARACTERS,
    withClient({
      variables: { page },
    })
  )

  return {
    loading,
    error,
    characters: data?.characters,
  }
} 
