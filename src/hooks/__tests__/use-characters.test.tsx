import { renderHook } from '@testing-library/react'
import { useQuery } from '@apollo/client'
import { useCharacters } from '../use-characters'
import { mockCharacters } from 'test-utils/mock-characters'

vi.mock('@apollo/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@apollo/client')>()
  return {
    ...actual,
    useQuery: vi.fn(),
  }
})

const mockUseQuery = useQuery as ReturnType<typeof vi.fn>

const mockCharactersData = {
  characters: {
    info: {
      count: 286,
    },
    results: mockCharacters,
  },
}

describe('useCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state initially', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    })

    const { result } = renderHook(() => useCharacters(1))

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.characters).toBeUndefined()
  })

  it('should return characters data when query succeeds', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: mockCharactersData,
    })

    const { result } = renderHook(() => useCharacters(1))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.characters).toEqual(mockCharactersData.characters)
    expect(result.current.characters?.info?.count).toEqual(286)
  })

  it('should call useQuery with correct parameters', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: mockCharactersData,
    })

    renderHook(() => useCharacters(2))

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.any(Object), // GET_CHARACTERS query
      expect.objectContaining({
        variables: { page: 2 },
      })
    )
  })
}) 
