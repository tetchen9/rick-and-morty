import { Dialog, Portal, CloseButton, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER_DETAILS_BY_ID } from 'queries/characters'
import { CharacterInfoCard } from './character-info-card'
import type { CharacterDetails, Character } from 'types/character'
import { useEffect, useRef, useCallback } from 'react'
import client from 'lib/apollo-client'

interface CharacterModalProps {
  /** The character to display. */
  selectedChar: Character | null
  /** The function to call when the modal is closed. */
  onClose: () => void
}

/**
 * A helper function to add the Apollo client to the options.
 * It is used to avoid the Apollo client being added in the test environment.
 * @param options - The options to add the client to.
 * @returns The options with the client.
 */
function withClient<T extends object>(options: T): T & { client?: typeof client } {
  return process.env.NODE_ENV !== 'test' ? { ...options, client } : options
}

/**
 * Displays a modal with the character details:
 * name, image, origin, species, status, location, gender, type and episodes.
 * It receives the additional character details from the GraphQL server.
 * The modal gets closed when the user clicks outside the modal, 
 * presses the escape key or clicks the close button.
 * @param selectedChar - The character to display.
 * @param onClose - The function to call when the modal is closed.
 * @returns A Chakra UI Dialog component with the character details.
 */
const CharacterModal = ({ selectedChar, onClose }: CharacterModalProps) => {
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
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClickOutside])

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

export default CharacterModal
