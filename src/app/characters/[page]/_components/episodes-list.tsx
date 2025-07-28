import type { Episode } from 'types/character'
import { List, ListItem, Text } from '@chakra-ui/react'
import { useColorModeValue } from '../../../../components/ui/color-mode'

type EpisodesListProps = {
    episodes: Episode[]
}

const EpisodesList: React.FC<EpisodesListProps> = ({ episodes }) => {
  const textColor = useColorModeValue('gray.700', 'gray.200')
  
  const episodeListItems = episodes.map((ep) => (
    <ListItem key={ep.id}>
      <Text color={textColor}>
        {`${ep.episode} ${ep.name}`}
      </Text>
    </ListItem>
  ))
  return (
    <List.Root unstyled>
      {episodeListItems}
    </List.Root>
  )
}

export default EpisodesList
