import { within } from '@testing-library/react'
import { render } from 'test-utils/rendering'
import { UserProvider } from 'context/user-context'
import { mockCharacters } from 'test-utils/mock-characters'

// Mock useUser to always return a user
vi.mock('context/user-context', () => ({
  useUser: () => ({ user: { name: 'James Joyce', role: 'choreographer' } }),
  UserProvider: ({ children }: { children: React.ReactNode }) => children,
}))

const useParamsMock = vi.fn()
vi.mock('next/navigation', () => ({
  useParams: (...args: unknown[]) => useParamsMock(...args),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

// Mock apollo-client
vi.mock('lib/apollo-client', () => ({
  default: {},
}))

// Mock queries/characters
vi.mock('queries/characters', () => ({
  GET_CHARACTERS: {},
  GET_CHARACTER_DETAILS_BY_ID: {},
}))

// Mock withAuthGuard to just return the component
vi.mock('context/with-user-guard', () => ({
  default: (comp: unknown) => comp,
}))

// Mock useQuery from @apollo/client
const mockUseQuery = vi.fn()
vi.mock('@apollo/client', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}))

import CharactersPage from '../page'

describe('CharactersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useParamsMock.mockReturnValue({ page: '2' })
  })

  it('renders heading and user text', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { characters: { results: [], info: { count: 0 } } },
    })

    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByTestId, getByText } = within(container)
    expect(getByTestId('app-heading')).toBeInTheDocument()
    expect(getByText('James Joyce, a choreographer from Earth')).toBeInTheDocument()
  })

  it('should show loading state when characters are loading', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: null,
      data: undefined,
    })

    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByRole, getAllByTestId } = within(container)
    expect(getByRole('list')).toBeInTheDocument()

    const skeletons = getAllByTestId('skeleton')
    expect(skeletons.length).toBe(8)
  })

  it('should show error message when there is an error', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: { message: 'Error loading characters' },
      data: undefined,
    })

    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByText } = within(container)
    expect(getByText('Error: Error loading characters')).toBeInTheDocument()
  })      
  
  it('should show pagination when characters are loaded', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { characters: { results: mockCharacters, info: { count: 20 } } },
    })

    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByRole } = within(container) 
    const navigation = getByRole('group', { name: 'pagination' })
    const page1Button = getByRole('button', { name: 'page 1' })
    const page2Button = getByRole('button', { name: 'next page' })

    expect(navigation).toBeInTheDocument()
    expect(page1Button).toBeInTheDocument()
    expect(page2Button).toBeInTheDocument()
  })

  it('should show an out of range message when the page is out of range', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { characters: { results: [], info: { count: null } } },
    })

    useParamsMock.mockReturnValue({ page: '2' }) // Set page param to 2

    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByText } = within(container) 
    expect(getByText('Page 2 is out of reach, try to go to')).toBeInTheDocument()
  })

  it('should show a list of characters when the page is in range', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { characters: { results: mockCharacters, info: { count: mockCharacters.length } } },
    })
  
    const { container } = render(
      <UserProvider>
        <CharactersPage />
      </UserProvider>
    )
    const { getByRole } = within(container)
    expect(getByRole('list')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Open details for Summer Smith' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Open details for Rick Sanchez' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Open details for Morty Smith' })).toBeInTheDocument()

  })







})
