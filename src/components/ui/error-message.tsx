import { Box, Text } from '@chakra-ui/react'

export type ErrorMessageProps = {
  /** The message to display. */
  message: string
}

/**
 * ErrorMessage is a component that displays an error message.
 * @param message - The message to display.
 * @returns A Chakra UI Box component with a Text component inside it.
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box textAlign="center" mt={10}>
      <Text>Error: {message}</Text>
    </Box>
  )
} 
