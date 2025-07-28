import { render } from 'test-utils/rendering'
import userEvent from '@testing-library/user-event'
import TextInput from 'components/ui/text-input'

describe('TextInput', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(<TextInput placeholder="Enter name" />)
    expect(getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter name" onChange={handleChange} />
    )
    
    const input = getByPlaceholderText('Enter name')
    await user.type(input, 'John')
    expect(handleChange).toHaveBeenCalled()
  })

  it('can be disabled', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter name" disabled />
    )
    expect(getByPlaceholderText('Enter name')).toBeDisabled()
  })

  it('can have a default value', () => {
    const { getByDisplayValue } = render(
      <TextInput placeholder="Enter name" defaultValue="John" />
    )
    expect(getByDisplayValue('John')).toBeInTheDocument()
  })

  it('can be controlled', () => {
    const { getByDisplayValue } = render(
      <TextInput placeholder="Enter name" value="John" onChange={() => {}} />
    )
    expect(getByDisplayValue('John')).toBeInTheDocument()
  })
})
