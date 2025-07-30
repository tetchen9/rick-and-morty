import { Button as ChakraButton } from '@chakra-ui/react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** The children of the button. */
    children: React.ReactNode
    /** Whether the button is in loading state. */
    loading?: boolean
}
/**
 * Button is a component that displays a button for the app.
 * @param children - The children of the button.
 * @param type - The type of the button.
 * @param loading - Whether the button is loading.
 * @param props - The props of the button.
 * @returns A Chakra UI Button component.
 */
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
