'use client'

import { Heading } from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'

type AppHeadingProps = {
  title: string
}

/**
 * AppHeading is a component that displays a heading for the app.
 * @param title - The title of the heading.
 * @returns A Chakra UI Heading component.
 */
export default function AppHeading({ title }: AppHeadingProps) {
  return (
    <Heading
      as={'h1'}
      textTransform={'uppercase'}
      fontSize={'3xl'}
      color={useColorModeValue('gray.800', 'gray.200')}
      textAlign={'center'}
      my={6}
      data-testid="app-heading"
    >
      {title}
    </Heading>
  )
}
