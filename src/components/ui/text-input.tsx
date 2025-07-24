'use client'

import { Input, InputProps } from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'

const TextInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      type={'text'}
      color={useColorModeValue('gray.800', 'gray.200')}
      bg={useColorModeValue('gray.100', 'gray.600')}
      rounded={'full'}
      border={0}
      _focus={{
        bg: useColorModeValue('gray.200', 'gray.700'),
        outline: 'none',
      }}
      _placeholder={{ color: 'gray.400' }}
      {...props}
    />
  )
}

export default TextInput
