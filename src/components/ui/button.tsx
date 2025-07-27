'use client'

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', loading, ...props }) => {
  return (
    <ChakraButton
      type={type}
      bg={'blue.400'}
      rounded={'full'}
      color={'white'}
      flex={'1 0 auto'}
      _hover={{ bg: 'blue.500' }}
      _focus={{ bg: 'blue.500' }}
      loading={loading}
      aria-busy={loading}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}

export default Button
