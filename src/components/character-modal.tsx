import { Dialog, Portal, CloseButton, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import client from 'lib/apollo-client'
import { GET_CHARACTER_DETAILS_BY_ID } from 'queries/characters'
import { CharacterInfoCard } from './character-info-card'
import type { CharacterDetails, Character } from 'types/character'

interface CharacterModalProps {
  selectedChar: Character | null
  onClose: () => void
}

export function CharacterModal({ selectedChar, onClose }: CharacterModalProps) {
  const open = !!selectedChar
  const { id, name } = selectedChar || {}
  const { loading, error, data } = useQuery<{ 
    character: CharacterDetails 
  }>(
    GET_CHARACTER_DETAILS_BY_ID, {
      variables: { id },
      client,
      skip: !id,
    })

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onEscapeKeyDown={(e) => {
        e.preventDefault() 
        onClose()         
      }}
      lazyMount
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {error && <Text color="red.400">Error loading details</Text>}
              {!!selectedChar && <CharacterInfoCard 
                char={selectedChar} 
                charDetails={data?.character} 
                loading={loading}
              />}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
