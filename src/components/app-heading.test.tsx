import AppHeading from './app-heading'
import { render, within } from '@testing-library/react'
import { Provider } from 'components/ui/provider'

describe('AppHeading', () => {
  it('renders the title correctly', () => {
    const title = 'Rick and Morty'
    const { container } = render(
      <Provider>
        <AppHeading title={title} />
      </Provider>
    )
    
    // Note: Using within(container) instead of screen queries due to Chakra UI CSS-in-JS
    // rendering issues in the test environment. The within approach works reliably.
    const { getByTestId } = within(container)
    const heading = getByTestId('app-heading')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
    expect(heading).toHaveTextContent(title)
  })
})
