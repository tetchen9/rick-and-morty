import { createSystem, defaultConfig } from '@chakra-ui/react'

/**
 * The system is the theme of the app, used to style the app.
 * @returns A Chakra UI System component.
 */
export const system = createSystem(defaultConfig, {
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      maxWidth: '100vw',
      overflowX: 'hidden',
    },
    '*':  {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    }}
})
