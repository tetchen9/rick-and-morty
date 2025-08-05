import { Dialog, Portal, CloseButton, Text } from '@chakra-ui/react'
import { CharacterInfoCard } from './character-info-card'
import type { Character } from 'types/character'
import { useEffect, useRef, useCallback } from 'react'
import { useCharacterDetails } from 'hooks/use-character-details'

type CharacterModalProps = {
  /** the character to display. */
  selectedChar: Character | null
  /** the function to call when the modal is closed. */
  onClose: () => void
}

/**
 * Displays a modal with the character details:
 * name, image, origin, species, status, location, gender, type and episodes.
 * It receives the additional character details from the GraphQL server.
 * The modal gets closed when the user clicks outside the modal, 
 * presses the escape key or clicks the close button.
 * @param selectedChar - the character to display.
 * @param onClose - the function to call when the modal is closed.
 * @returns a Chakra UI Dialog component with the character details.
 */
const CharacterModal = ({ selectedChar, onClose }: CharacterModalProps): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const open = !!selectedChar
  const { id, name } = selectedChar || {}
  
  const { loading, error, characterDetails } = useCharacterDetails(id)

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

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClickOutside])

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onEscapeKeyDown={(): void => onClose()}
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
                charDetails={characterDetails} 
                loading={loading}
              />}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={(): void => onClose()} aria-label="Close" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default CharacterModal
