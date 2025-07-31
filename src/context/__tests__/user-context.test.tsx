import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test-utils/rendering'
import { UserProvider, STORAGE_KEY } from '../user-context' 
import { UserInfo } from 'types/user-info' 
import { useUser } from 'hooks/use-user'
import { localStorageMock } from 'test-utils/local-storage-mock'

// override globalThis.localStorage
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
})


// a test component for Provider tests
const TestComponent: React.FC = () => {
  const { user, setUser, clearUser, loading } = useUser()
  const { name, role } = user || {}
  const newUser = {
    name: 'Emilia',
    role: 'mathematician',
  }

  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {!loading && user && (
        <div data-testid="user-info">
          Username: {name}, Job title: {role}
        </div>
      )}
      {!loading && !user && <div data-testid="no-user">No user data</div>}

      <button onClick={() => setUser(newUser)} >
        Set new user
      </button>
      <button onClick={clearUser}>Clear User</button>
    </div>
  )
}

const mockUser: UserInfo = {
  name: 'Jessica',
  role: 'student',
}

// Clear localStorage before each test
beforeEach(() => {
  localStorageMock.clear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
})

describe('UserProvider', () => {
  it('should load user from localStorage on initial render', async () => {
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(mockUser))
    const storedValue = localStorageMock.getItem(STORAGE_KEY)
    const { container } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )
    const { queryByTestId, getByText } = within(container)

    expect(queryByTestId('loading')).not.toBeInTheDocument()
      
    const noUserElement = queryByTestId('no-user')
    const userInfoElement = queryByTestId('user-info')
      
    if (storedValue === JSON.stringify(mockUser)) {
      expect(userInfoElement).toBeInTheDocument()
      const { name, role } = mockUser
      const userInfoText = `Username: ${name}, Job title: ${role}`
      expect(getByText(userInfoText)).toBeInTheDocument()
    } else {
      expect(noUserElement).toBeInTheDocument()
    }
      
    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY)
  })

  it('should set user in localStorage when setUser is called', async () => {
    const { container } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )
    const { getByText } = within(container)
    expect(getByText('No user data')).toBeInTheDocument()

    await userEvent.click(getByText('Set new user'))
    expect(getByText('Username: Emilia, Job title: mathematician')).toBeInTheDocument()
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user-info', JSON.stringify({
      name: 'Emilia',
      role: 'mathematician',
    }))
  })

  it('should clear user from localStorage when clearUser is called', async () => {
    const { container } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )
    const { getByText } = within(container)
    expect(getByText('No user data')).toBeInTheDocument()

    await userEvent.click(getByText('Set new user'))
    expect(getByText('Username: Emilia, Job title: mathematician')).toBeInTheDocument()

    await userEvent.click(getByText('Clear User'))
    expect(getByText('No user data')).toBeInTheDocument()
  })

  it('should update user in localStorage when setUser is called', async () => {
    const { container } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    )
    const { getByText } = within(container)
    expect(getByText('No user data')).toBeInTheDocument()

    await userEvent.click(getByText('Set new user'))
    expect(getByText('Username: Emilia, Job title: mathematician')).toBeInTheDocument()
  })

})

