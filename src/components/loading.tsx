import { Spinner, Text, VStack } from '@chakra-ui/react'

/**
 * Displays a loading spinner.
 * @returns A Chakra UI component with a Spinner and a Text.
 */
const Loading = (): React.JSX.Element => {
  return (
    <VStack colorPalette="teal" minHeight="100vh" justifyContent="center" alignItems="center">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}

export default Loading
