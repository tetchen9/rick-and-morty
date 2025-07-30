'use client'

import { Box, Image, Text, Stack, Skeleton, Heading} from '@chakra-ui/react'
import type { CharacterDetails, Character } from 'types/character'
import EpisodesList from './episodes-list'
import { InfoLine } from './info-line'

export interface CharacterInfoCardProps {
  char: Character
  charDetails?: CharacterDetails
  loading?: boolean
}

export function CharacterInfoCard({ char, charDetails, loading }: CharacterInfoCardProps) {
  const { 
    name, 
    image, 
    origin: { name: originName }, 
    species,
  } = char

  const { 
    status,
    location: { name: locationName } = {},
    episode = [],
    gender,
    type
  } = charDetails || {}

  return (
    <Box
      maxW={'40rem'}
      w={'full'}
      p={[2, 6, 6]}
      pt={0}
      textStyle="md">

      <Image
        src={image}
        boxSize={{ base: '15em', lg: '18em' }}
        borderRadius="lg"
        fit="cover"
        alt={name}
        mx="auto"
      />
      <Heading as="h2" mb={0} mt={8} textStyle="lg">
        {name}
      </Heading>
      {!!charDetails && (<>
        <Text mb={4}>
          {species} {type ? `| ${type}` : ''}
        </Text>
        {!!originName && (
          <InfoLine title="Originally from" value={originName} />
        )}
        {!!locationName && (
          <InfoLine title="Last seen on" value={locationName} />
        )}
        <InfoLine title="Dead or alive" value={status} />
        <InfoLine title="Gender" value={gender} />
        <Heading as="h3" my={2} textStyle="md">
        Appeared in episodes:
        </Heading>
        <EpisodesList episodes={episode} />
      </>)}
      {loading && (<>
        <Stack flex="1">
          <Skeleton aria-label="skeleton" mb={4} mt={2} height="5" width="50%"/>
          <Skeleton aria-label="skeleton" height="5" width="60%" />
          <Skeleton aria-label="skeleton" height="5" width="70%" />
          <Skeleton aria-label="skeleton" height="5" width="40%" />
          <Skeleton aria-label="skeleton" height="5" width="40%" />
          <Skeleton aria-label="skeleton" my={2} height="5" width="70%" />
          <Skeleton aria-label="skeleton" height="5" width="70%" />
        </Stack>
      </>)}
    </Box>
  )
}


