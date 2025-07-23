import { Provider } from 'components/ui/provider'
import { render as rtlRender, RenderOptions } from '@testing-library/react'

export function render(ui: React.ReactNode, options?: RenderOptions) {
  return rtlRender(<Provider>{ui}</Provider>, options)
}
