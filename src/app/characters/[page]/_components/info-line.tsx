import { Text, Stack} from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'

export type InfoLineProps = {
  value?: string
  title?: string
}

/**
 * Displays a line of information.
 * @param value - The value to display.
 * @param title - The title to display.
 * @returns A Chakra UI component with a Text component inside it.
 */
export const InfoLine = ({ value, title }: InfoLineProps) => {
  return (
    <Stack 
      direction={['column', 'row']}
      fontSize="md"
      mb={[2, 0]}
      gap={[0, 1]}
    >
      <Text as={'span'} fontWeight="medium">
        {`${title}:`}
      </Text>
      <Text 
        as={'span'} 
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        {value}
      </Text>
    </Stack>
  )
}
