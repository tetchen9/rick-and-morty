import Button from '../button'
import { render, within } from '@testing-library/react'
import { Provider } from 'components/ui/provider'

describe('Button', () => {
  it('renders children', () => {
    const { container } = render(
      <Provider>
        <Button>Click me</Button>
      </Provider>
    )
    const { getByRole } = within(container)
    const btn = getByRole('button')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Click me')
  })

  it('passes props to ChakraButton', () => {
    const { container } = render(
      <Provider>
        <Button data-testid="custom-btn" disabled>Test</Button>
      </Provider>
    )
    const { getByTestId } = within(container)
    const btn = getByTestId('custom-btn')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Test')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    const { container } = render(
      <Provider>
        <Button onClick={handleClick}>Click</Button>
      </Provider>
    )
    const { getByRole } = within(container)
    const btn = getByRole('button')
    btn.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state when loading prop is true', () => {
    const { container } = render(
      <Provider>
        <Button loading>Loading</Button>
      </Provider>
    )
    const { getByRole } = within(container)
    const btn = getByRole('button')
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })
})


