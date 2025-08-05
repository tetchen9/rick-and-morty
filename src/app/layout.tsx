import { Flex, Box } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import { Provider } from 'components/ui/provider'
import { UserProvider } from 'context/user-context'
import Footer from 'components/ui/footer'

/**
 * RootLayout is the main layout of the app, providing the user context, 
 * the color mode and the Chakra UI Provider.
 * @param children - The children of the layout.
 * @returns A layout with the children and the footer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode="system"/>
      </head>
      <body>
        <title>Rick and Morty</title>
        <Provider>
          <Flex minH="100vh" flexDirection="column">
            <UserProvider>
              <Box flex="1">{children}</Box>
            </UserProvider>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  )
}
