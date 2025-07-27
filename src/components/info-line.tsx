import { Text,  HStack} from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode'

export type InfoLineProps = {
  value?: string
  title?: string
}

export const InfoLine = ({ value, title }: InfoLineProps) => {
  return (
    <HStack fontSize="md">
      <Text as={'span'} fontWeight="medium">
        {title}:
      </Text>
      <Text 
        as={'span'} 
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        {value}
      </Text>
    </HStack>
  )
}
