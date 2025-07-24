import { Button as ChakraButton } from '@chakra-ui/react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    loading?: boolean
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (<ChakraButton
    type="submit"
    bg={'blue.400'}
    rounded={'full'}
    color={'white'}
    flex={'1 0 auto'}
    _hover={{ bg: 'blue.500' }}
    _focus={{ bg: 'blue.500' }}
    {...props}
  >
    {children}
  </ChakraButton>
  )}

export default Button
