import { renderHook } from '@testing-library/react'
import { useCharacterDetails } from '../use-character-details'
import type { CharacterDetails } from 'types/character'
import { useQuery } from '@apollo/client'
import { vi } from 'vitest'  

vi.mock('@apollo/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@apollo/client')>()
  return {
    ...actual,
    useQuery: vi.fn(),
  }
})

const mockUseQuery = useQuery as ReturnType<typeof vi.fn>

const mockCharacterDetails: CharacterDetails = {
  status: 'Alive',
  gender: 'Male',
  location: {
    name: 'Earth (C-137)',
  },
  type: '',
  episode: [
    {
      id: 1,
      name: 'Pilot',
      episode: 'S01E01',
    },
  ],
}

describe('useCharacterDetails', () => {
  beforeAll(() => {
    vi.clearAllMocks()
  })

  it('should return loading state initially', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    })

    const { result } = renderHook(() => useCharacterDetails('1'))

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.characterDetails).toBeUndefined()
  })

  it('should return character details when query succeeds', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { character: mockCharacterDetails },
    })

    const { result } = renderHook(() => useCharacterDetails('1'))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.characterDetails).toEqual(mockCharacterDetails)
  })

  it('should skip query when characterId is undefined', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    })

    const { result } = renderHook(() => useCharacterDetails(undefined))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.characterDetails).toBeUndefined()
  })
}) 
