import { Spinner, Text, VStack } from "@chakra-ui/react"

const Loading = () => {
  return (
    <VStack colorPalette="teal" minHeight="100vh" justifyContent="center" alignItems="center">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}

export default Loading
