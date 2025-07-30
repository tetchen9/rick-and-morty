'use client'

import { Input, InputProps } from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'

/**
 * TextInput is a component that displays a text input.
 * @param props - The props of the text input.
 * @returns A Chakra UI Input component.
 */
const TextInput: React.FC<InputProps> = (props: InputProps) => {
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
      _focusVisible={{
        outline: '2px solid',
        outlineColor: useColorModeValue('gray.400', 'gray.300'),
        outlineOffset: '2px'
      }}
      _placeholder={{ color: 'gray.400' }}
      {...props}
    />
  )
}

export default TextInput
