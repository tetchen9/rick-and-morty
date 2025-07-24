import { Flex, Box } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import { Footer } from 'components/ui/footer'
import { Provider } from 'components/ui/provider'
import { UserProvider } from 'context/user-context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode="system"/>
      </head>
      <body>
        <UserProvider>
          <Provider>
            <Flex minH="100vh" flexDirection="column">
              <Box flex="1">{children}</Box>
              <Footer />
            </Flex>
          </Provider>
        </UserProvider>
      </body>
    </html>
  )
}
