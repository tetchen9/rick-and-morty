import { useQuery, ApolloError } from '@apollo/client'
import { GET_CHARACTER_DETAILS_BY_ID } from 'queries/characters'
import type { CharacterDetails } from 'types/character'
import client from 'lib/apollo-client'

/**
 * a helper function to add the Apollo client to the options.
 * it is used to avoid the Apollo client being added in the test environment.
 * @param options - the options to add the client to.
 * @returns the options with the client.
 */
function withClient<T extends object>(options: T): T & { client?: typeof client } {
  return process.env.NODE_ENV !== 'test' ? { ...options, client } : options
}

/**
 * A custom hook to fetch character details by id.
 * @param characterId - id of the character to fetch details for.
 * @returns an object containing loading state, error, and character details data.
 */
export const useCharacterDetails = (characterId: string | undefined): {
  loading: boolean
  error: ApolloError | undefined
  characterDetails: CharacterDetails | undefined
} => {
  const { loading, error, data } = useQuery<{
    character: CharacterDetails
  }>(
    GET_CHARACTER_DETAILS_BY_ID,
    withClient({
      variables: { id: characterId },
      skip: characterId === undefined,
    })
  )

  return {
    loading,
    error,
    characterDetails: data?.character,
  }
} 
