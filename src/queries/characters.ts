import { gql } from '@apollo/client'

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
