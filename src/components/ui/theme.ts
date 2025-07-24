import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
        margin: 0,
        padding: 0,
        maxWidth: '100vw',
        overflowX: 'hidden',
    },
    "*":  {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
    }},
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
})