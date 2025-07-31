
import { renderHook, act } from '@testing-library/react'
import { UserInfo } from 'types/user-info' 
import { useUser } from 'hooks/use-user'
import { UserProvider } from 'context/user-context'
import { localStorageMock } from 'test-utils/local-storage-mock'


const localStorageConfig = {
  writable: true,
  configurable: true,
  value: localStorageMock,
}
// override the global localStorage mock 
Object.defineProperty(globalThis, 'localStorage', localStorageConfig)

const mockUser: UserInfo = {
  name: 'Penelopa Cruz',
  role: 'actress',
}

beforeEach(() => {
  localStorageMock.clear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
})

describe('useUser hook', () => {
  it('should throw an error if used outside of UserProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => renderHook(() => useUser())).toThrow(
      'useUser must be used within UserProvider',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return the context value when used inside UserProvider', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: UserProvider,
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.user).toBeNull()
    expect(typeof result.current.setUser).toBe('function')
    expect(typeof result.current.clearUser).toBe('function')
  })

  it('should set user in localStorage when setUser is called', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: UserProvider,
    })

    await act(async () => {
      await result.current.setUser(mockUser)
    })
    expect(localStorageMock.setItem)
      .toHaveBeenCalledWith('user-info', JSON.stringify(mockUser))
  })
})

