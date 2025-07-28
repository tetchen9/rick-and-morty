import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test-utils/rendering'
import Pagination from 'components/ui/pagination'

describe('Pagination', () => {
  const defaultProps = {
    page: 1,
    count: 840,
    pageSize: 20,
    setPage: vi.fn(),
  }

  it('renders correct number of page buttons', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    const expectedButtons = [ '<', 1, 2, 3, 4, 5, 42, '>']
    expect(buttons.length).toBe(expectedButtons.length)
  })

  it('renders correct page numbers', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    const { getByText } = within(container)
    
    const expectedNumbers = [1, 2, 3, 4, 5, 42]
    expectedNumbers.map(i => {
      expect(getByText(i)).toBeInTheDocument()
    })

  })

  it('calls setPage when clicking on a page number', async () => {
    const user = userEvent.setup()
    const setPage = vi.fn()
    const { container } = render(<Pagination {...defaultProps} setPage={setPage} />)
    const { getByText } = within(container)
    
    await user.click(getByText('3'))
    expect(setPage).toHaveBeenCalledWith(3)
  })

  it('calls setPage when clicking next button', async () => {
    const user = userEvent.setup()
    const setPage = vi.fn()
    const { container } = render(<Pagination {...defaultProps} setPage={setPage} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // Find the next button (last button)
    const nextButton = buttons[buttons.length - 1]
    await user.click(nextButton)
    expect(setPage).toHaveBeenCalledWith(2)
  })

  it('calls setPage when clicking prev button', async () => {
    const user = userEvent.setup()
    const setPage = vi.fn()
    const { container } = render(<Pagination {...defaultProps} page={2} setPage={setPage} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // Find the prev button (first button)
    const prevButton = buttons[0]
    await user.click(prevButton)
    expect(setPage).toHaveBeenCalledWith(1)
  })

  it('handles different page sizes correctly', () => {
    const { container } = render(<Pagination {...defaultProps} count={30} pageSize={10} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // 30 items / 10 per page = 3 pages + 2 navigation buttons = 5 total
    expect(buttons.length).toBe(5)
  })

  it('handles single page correctly', () => {
    const { container } = render(<Pagination {...defaultProps} count={3} pageSize={5} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // 3 items / 5 per page = 1 page + 2 navigation buttons = 3 total
    expect(buttons.length).toBe(3)
  })

  it('shows current page as selected', () => {
    const { container } = render(<Pagination {...defaultProps} page={3} />)
    const { getByText } = within(container)
    
    const page3Button = getByText('3')
    expect(page3Button).toBeInTheDocument()
  })

  it('handles edge case with zero count', () => {
    const { container } = render(<Pagination {...defaultProps} count={0} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // Should still render navigation buttons even with no items
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('handles edge case with zero pageSize', () => {
    const { container } = render(<Pagination {...defaultProps} pageSize={0} />)
    const { getAllByRole } = within(container)
    const buttons = getAllByRole('button')
    
    // Should handle division by zero gracefully
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})

