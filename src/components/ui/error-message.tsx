import { Box, Text } from '@chakra-ui/react'

export type ErrorMessageProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box textAlign="center" mt={10}>
      <Text>Error: {message}</Text>
    </Box>
  )
} 
