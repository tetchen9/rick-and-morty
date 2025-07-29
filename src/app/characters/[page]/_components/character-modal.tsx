import { Dialog, Portal, CloseButton, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER_DETAILS_BY_ID } from 'queries/characters'
import { CharacterInfoCard } from './character-info-card'
import type { CharacterDetails, Character } from 'types/character'
import { useEffect, useRef } from 'react'
import client from 'lib/apollo-client'

interface CharacterModalProps {
  selectedChar: Character | null
  onClose: () => void
}

function withClient<T extends object>(options: T): T & { client?: typeof client } {
  return process.env.NODE_ENV !== 'test' ? { ...options, client } : options
}

export function CharacterModal({ selectedChar, onClose }: CharacterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const open = !!selectedChar
  const { id, name } = selectedChar || {}
  const { loading, error, data } = useQuery<{
    character: CharacterDetails
  }>(
    GET_CHARACTER_DETAILS_BY_ID,
    withClient({
      variables: { id },
      skip: !id,
    })
  )

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onEscapeKeyDown={onClose}
      lazyMount
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={modalRef}>
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
              <CloseButton size="sm" onClick={onClose} aria-label="Close" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
