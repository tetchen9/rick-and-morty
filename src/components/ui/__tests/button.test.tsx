import { render } from 'test-utils/rendering'
import userEvent from '@testing-library/user-event'
import Button from '../button'

describe('Button', () => {
  it('renders with children', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    const { getByText } = render(<Button loading>Loading</Button>)
    expect(getByText('Loading')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const { getByText } = render(<Button disabled>Disabled</Button>)
    expect(getByText('Disabled')).toBeDisabled()
  })
})


