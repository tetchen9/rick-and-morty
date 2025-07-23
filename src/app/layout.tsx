import { Flex, Box } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import { Footer } from 'components/ui/footer'
import { Provider } from 'components/ui/provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript />
      </head>
      <body>
        <Provider>
          <Flex minH="100vh" flexDirection="column">
            <Box flex="1">{children}</Box>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
