import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test-utils/rendering'
import CharacterList from '../character-list'
import { mockCharacters } from 'test-utils/mock-characters'

describe('CharacterList', () => {
  it('renders loading skeletons when loading is true', () => {
    const { container } = render(<CharacterList isLoading />)
    const { getAllByTestId } = within(container)
    
    const skeletons = getAllByTestId('skeleton')
    expect(skeletons.length).toBe(8) // SKELETON_COUNT
  })

  it('renders characters when provided and not loading', () => {
    const { container } = render(
      <CharacterList characters={mockCharacters} />
    )
    const { getByText } = within(container)
    
    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Morty Smith')).toBeInTheDocument()
  })

  it('calls onSelect when a character is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = render(
      <CharacterList characters={mockCharacters} onSelect={onSelect} />
    )
    const { getByText } = within(container)
    
    await user.click(getByText('Rick Sanchez'))
    expect(onSelect).toHaveBeenCalledWith(mockCharacters[0])
  })

  it('renders nothing when not loading and no characters provided', () => {
    const { container } = render(<CharacterList />)
    const { queryByRole } = within(container)
    
    // Should still render the list container but with no items
    const list = queryByRole('list')
    expect(list).toBeInTheDocument()
    expect(list?.children.length).toBe(0)
  })

  it('renders skeletons when loading even if characters are provided', () => {
    const { container } = render(
      <CharacterList isLoading characters={mockCharacters} />
    )
    const { getAllByTestId, queryByText } = within(container)
    
    const skeletons = getAllByTestId('skeleton')
    expect(skeletons.length).toBe(8)
    expect(queryByText('Rick Sanchez')).not.toBeInTheDocument()
  })

  it('renders empty list when characters array is empty', () => {
    const { container } = render(<CharacterList characters={[]} />)
    const { queryByRole } = within(container)
    
    const list = queryByRole('list')
    expect(list).toBeInTheDocument()
    expect(list?.children.length).toBe(0)
  })

  it('handles onSelect being undefined', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <CharacterList characters={mockCharacters} />
    )
    const { getByText } = within(container)
    
    // Should not throw when clicking without onSelect handler
    await expect(user.click(getByText('Rick Sanchez'))).resolves.not.toThrow()
  })

  it('renders correct number of list items for characters', () => {
    const { container } = render(
      <CharacterList characters={mockCharacters} />
    )
    const { getAllByRole } = within(container)
    
    const listItems = getAllByRole('listitem')
    expect(listItems.length).toBe(mockCharacters.length)
  })

  it('renders correct number of list items for skeletons', () => {
    const { container } = render(<CharacterList isLoading />)
    const { getAllByRole } = within(container)
    
    const listItems = getAllByRole('listitem')
    expect(listItems.length).toBe(8) // SKELETON_COUNT
  })

}) 
