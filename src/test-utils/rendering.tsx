import { Provider } from 'components/ui/provider'
import { render as rtlRender, RenderOptions } from '@testing-library/react'

/**
 * Renders the app with the provider.
 * @param ui - The ReactNode to render.
 * @param options - The options for the render.
 * @returns The rendered ReactNode.
 */
export function render(ui: React.ReactNode, options?: RenderOptions) {
  return rtlRender(<Provider>{ui}</Provider>, options)
}
