import { render } from 'test-utils/rendering'
import AppHeading from 'components/ui/app-heading'

describe('AppHeading', () => {
  it('renders the title', () => {
    const { getByText } = render(<AppHeading title="Test Title" />)
    expect(getByText('Test Title')).toBeInTheDocument()
  })
})
