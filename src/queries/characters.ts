import { gql } from '@apollo/client'

/**
 * Gets the characters from the GraphQL server.
 * @param page - The page number.
 * @returns The characters.
 */
export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int!) {
        characters(page: $page) {
            info {
                count
            }
            results {
                id
                name
                image
                species
                origin {
                    name
                }
            }
        }
    }
`

/**
 * Gets the character details from the GraphQL server.
 * @param id - The id of the character.
 * @returns The character details.
 */
export const GET_CHARACTER_DETAILS_BY_ID = gql`
    query GetCharacterDetails($id: ID!) {
        character(id: $id) {
            id
            status
            gender
            location {
                name
            }
            episode {
                id
                name
                episode
            }
            type
        }
    }
`
