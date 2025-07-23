// write a test for app-heading
import { render } from 'test-utils/rendering'
import AppHeading from './app-heading'
import { screen } from '@testing-library/react'

describe('AppHeading', () => {
  it('renders the title correctly', () => {
    const title = 'Rick and Morty'
    render(<AppHeading title={title} />)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  })
})