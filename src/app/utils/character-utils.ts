
import { UserInfo } from 'types/user-info'

export const getDescription = (origin: string, species: string): string => {
  if (!species) return ''
  const from = origin && origin !== 'unknown' 
    ? ` from ${origin}` : ''
  return `${getAnArticle(species)} ${species}${from}`
}

export const getWelcomeText = (user: UserInfo): string => {
  if (!user) return ''
  const { name, role } = user
  return `${name}, ${getAnArticle(role)} ${role} from Earth`
}

const getAnArticle = (word: string): string => {
  return /^[aieou]/i.test(word) ? 'an' : 'a'
}
