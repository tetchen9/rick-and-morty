
import { UserInfo } from 'types/user-info'

/**
 * Returns a short description of a character based on their origin and species.
 * @param origin - The origin of the character.
 * @param species - The species of the character.
 * @returns A description of the character.
 */
export const getDescription = (origin: string, species: string): string => {
  if (!species) return ''
  const from = origin && origin !== 'unknown' 
    ? ` from ${origin}` : ''
  return `${getAnArticle(species)} ${species}${from}`
}

/**
 * Returns a welcome text for a user.
 * @param user - The user to get the welcome text for.
 * @returns A welcome text for the user.
 */
export const getWelcomeText = (user: UserInfo): string => {
  if (!user) return ''
  const { name, role } = user
  const article = getAnArticle(role).toLowerCase()
  return `${name}, ${article} ${role} from Earth`
}

/**
 * Returns an article based on the first letter of the word.
 * For words starting with a vowel, returns "An", otherwise returns "A".
 * @param word - The word to get the article for.
 * @returns An article for the word.
 */
const getAnArticle = (word: string): string => {
  return /^[aieou]/i.test(word) ? 'An' : 'A'
}
