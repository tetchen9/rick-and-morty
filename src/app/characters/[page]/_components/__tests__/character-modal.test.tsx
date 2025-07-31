import { fireEvent, waitFor } from '@testing-library/react'
import { render } from 'test-utils/rendering'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CHARACTER_DETAILS_BY_ID } from 'queries/characters'
import { mockCharacters } from 'test-utils/mock-characters'
import { mockCharacterDetails } from 'test-utils/mock-character-details'
import CharacterModal from '../character-modal'

const mocks = [
  {
    request: {
      query: GET_CHARACTER_DETAILS_BY_ID,
      variables: { id: '1' },
    },
    result: {
      data: mockCharacterDetails,
    },
  },
]

const renderWithMocks = (component: React.ReactElement): ReturnType<typeof render> =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {component}
    </MockedProvider>
  )

describe('CharacterModal', () => {
  it('loads and displays character details from GraphQL', async () => {
    const onClose = vi.fn()
    const { findByText } = renderWithMocks(
      <CharacterModal selectedChar={mockCharacters[0]} onClose={onClose} />
    )

    // Wait for the GraphQL query to resolve and show character details
    await waitFor(async () => {
      expect(await findByText('Alive')).toBeInTheDocument()
      expect(await findByText('Male')).toBeInTheDocument()
      expect(await findByText('Earth (Replacement Dimension)')).toBeInTheDocument()
      expect(await findByText('Human | Scientist')).toBeInTheDocument()
      expect(await findByText('S01E01 Pilot')).toBeInTheDocument()
      expect(await findByText('S01E02 Lawnmower Dog')).toBeInTheDocument()
    })
  })

  it('renders nothing when selectedChar is null', () => {
    const { queryByRole } = renderWithMocks(
      <CharacterModal selectedChar={null} onClose={vi.fn()} />
    )
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the modal when the close button is clicked', () => {
    const onClose = vi.fn()
    const { getByRole } = renderWithMocks(
      <CharacterModal selectedChar={mockCharacters[0]} onClose={onClose} />
    )
    const closeButton = getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })
  
})
