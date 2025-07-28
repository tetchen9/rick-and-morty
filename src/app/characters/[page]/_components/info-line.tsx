import { Text, Stack} from '@chakra-ui/react'
import { useColorModeValue } from '../../../../components/ui/color-mode'

export type InfoLineProps = {
  value?: string
  title?: string
}

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
