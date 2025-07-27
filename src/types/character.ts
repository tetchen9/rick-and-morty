export type Character = {
  id: string
  name: string
  image: string
  species: string
  origin: { name: string }
}

export type Episode = {
    id: number
    name: string
    episode: string
}

export type CharacterDetails = {
  status: string
  gender: string
  location: { name: string }
  episode: Array<Episode>
  created: string
  type: string
}
