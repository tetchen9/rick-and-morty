import { within } from '@testing-library/react'
import { render } from 'test-utils/rendering'
import { CharacterInfoCard } from 'components/character-info-card'
import type { CharacterDetails, Character } from 'types/character'

const baseChar: Character = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth (C-137)' },
  species: 'Human',
}

const charDetails: CharacterDetails = {
  status: 'Alive',
  location: { name: 'Earth (Replacement Dimension)' },
  episode: [
    { id: 1, name: 'Pilot', episode: 'S01E01' },
    { id: 2, name: 'Lawnmower Dog', episode: 'S01E02' },
  ],
  type: 'Scientist',
  gender: 'Male',
}

describe('CharacterInfoCard', () => {
  it('renders character name and image', () => {
    const { container } = render(<CharacterInfoCard char={baseChar} />)

    const { getByRole, getByText } = within(container)

    expect(getByRole('img', { name: /rick sanchez/i })).toBeInTheDocument()
    expect(getByText(/rick sanchez/i)).toBeInTheDocument()
  })

  it('renders character details when provided', () => {
    const { container } = render(<CharacterInfoCard char={baseChar} charDetails={charDetails} />)

    const { getByText } = within(container)

    expect(getByText('Alive')).toBeInTheDocument()
    expect(getByText(/Male/i)).toBeInTheDocument()
    expect(getByText(/Earth \(Replacement Dimension\)/i)).toBeInTheDocument()
    expect(getByText(/Scientist/i)).toBeInTheDocument()
    expect(getByText(/Appeared in episodes:/i)).toBeInTheDocument()
    expect(getByText(/Pilot/i)).toBeInTheDocument()
    expect(getByText(/Lawnmower Dog/i)).toBeInTheDocument()
  })

  it('renders skeletons when loading', () => {
    const { container } = render(<CharacterInfoCard char={baseChar} loading />)
    
    const { getAllByLabelText } = within(container)
    
    // Test that skeleton elements are rendered
    const skeletons = getAllByLabelText('skeleton')
    expect(skeletons.length).toBeGreaterThan(0)
    
    // Test that character name is still displayed even during loading
    const { getByText } = within(container)
    expect(getByText('Rick Sanchez')).toBeInTheDocument()
  })
})
