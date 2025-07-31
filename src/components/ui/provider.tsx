'use client'

import { ChakraProvider } from '@chakra-ui/react'
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from './color-mode'
import { system } from '@chakra-ui/react/preset'

/**
 * Provider is a component that provides the app with 
 * the Chakra Provider and the color mode.
 * @param children - The children of the provider.
 * @param props - The props of the provider.
 * @returns A Chakra UI Provider component.
 */
export function Provider({ children, ...props }: ColorModeProviderProps & { children: React.ReactNode }): React.JSX.Element {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
