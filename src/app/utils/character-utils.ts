
export const getDescription = (location: string, species: string): string => {
  if (!species) return ''
  const from = location && location !== 'unknown' 
    ? ` from ${location}` : ''
  const article = species.toLowerCase().startsWith('a') 
    ? 'An' : 'A'
  return `${article} ${species}${from}`
}
