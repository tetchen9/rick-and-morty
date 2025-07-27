import { render, within } from '@testing-library/react'
import { Provider } from 'components/ui/provider'
import Pagination from '../pagination'

describe('Pagination', () => {
  const defaultProps = {
    page: 1,
    count: 20,
    pageSize: 5,
    setPage: vi.fn(),
  }

  it('renders correct number of page buttons', () => {
    const { container } = render(
      <Provider>
        <Pagination {...defaultProps} />
      </Provider>
    )
    const { getAllByRole } = within(container)
    // count / pageSize = 4 pages
    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(5)
  })

  

  
})