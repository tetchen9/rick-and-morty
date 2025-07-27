import TextInput from '../text-input'
import { render, within, fireEvent } from '@testing-library/react'
import { Provider } from 'components/ui/provider'

describe('TextInput', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider>
        <TextInput/>
      </Provider>
    )
    const { getByRole } = within(container)
    const btn = getByRole('textbox')
    expect(btn).toBeInTheDocument()
  })

  it('accepts and displays a placeholder', () => {
    const placeholder = 'Enter text'
    const { getByPlaceholderText } = render(
      <Provider>
        <TextInput placeholder={placeholder} />
      </Provider>
    )
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('accepts a value prop', () => {
    const value = 'Monica Belucci'
    const { getByDisplayValue } = render(
      <Provider>
        <TextInput value={value} readOnly />
      </Provider>
    )
    expect(getByDisplayValue(value)).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <Provider>
        <TextInput onChange={handleChange} />
      </Provider>
    )
    const input = getByRole('textbox') as HTMLInputElement
    input.focus()
    fireEvent.change(input, { target: { value: 'Morty' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is set', () => {
    const { getByRole } = render(
      <Provider>
        <TextInput disabled />
      </Provider>
    )
    expect(getByRole('textbox')).toBeDisabled()
  })
})