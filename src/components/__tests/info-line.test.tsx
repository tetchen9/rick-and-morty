import { render } from 'test-utils/rendering'
import { InfoLine } from 'components/info-line'

describe('InfoLine', () => {
  it('renders title and value', () => {
    const { getByText } = render(<InfoLine title="Status" value="Alive" />)
    expect(getByText('Alive')).toBeInTheDocument()
    expect(getByText('Status:')).toBeInTheDocument()
  })

  it('renders with empty value', () => {
    const { getByText } = render(<InfoLine title="Type" value="" />)
    expect(getByText('Type:')).toBeInTheDocument()
  })
 
})
