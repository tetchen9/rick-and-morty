import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test-utils/rendering'
import { UserProvider } from 'context/user-context'
import NameForm from '../name-form'
import { PATHS } from 'consts/paths'

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: (): { push: () => void } => ({
    push: mockPush,
  }),
}))

const mockUseUser = vi.fn()
vi.mock('hooks/use-user', () => ({
  useUser: (...args: unknown[]): unknown => mockUseUser(...args),
}))

vi.mock('context/user-context', () => ({
  UserProvider: ({ children }: { children: React.ReactNode }): React.ReactNode => children,
}))

describe('NameForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseUser.mockReturnValue({ 
      user: { 
        name: 'James Joyce', 
        role: 'choreographer' 
      },
      setUser: vi.fn(),
      clearUser: vi.fn(),
      loading: false,
    })
  })

  it('renders the name input and submit button', () => {
    const { container } = render(
      <UserProvider>
        <NameForm />
      </UserProvider>
    )
    const { getByRole, getByLabelText } = within(container)

    expect(getByLabelText(/username/i)).toBeInTheDocument()
    expect(getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should redirect to characters page after submitting', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <UserProvider>
        <NameForm />
      </UserProvider>
    )
    const { getByRole, getByLabelText } = within(container)
    
    await user.type(getByLabelText(/username/i), 'James Joyce')
    await user.type(getByLabelText(/job title/i), 'choreographer')
    await user.click(getByRole('button', { name: /submit/i }))

    expect(mockPush).toHaveBeenCalledWith(PATHS.CHARACTERS)
  })

  it('should show values in the form when a user is set', () => {
    const { container } = render(
      <UserProvider>
        <NameForm />
      </UserProvider>
    )
    const { getByLabelText } = within(container)
    expect((getByLabelText(/username/i)).value)
      .toBe('James Joyce')
    expect((getByLabelText(/job title/i)).value)
      .toBe('choreographer')
  })

  it('should show empty values in the form when no user is set', () => {
    mockUseUser.mockReturnValue({ 
      user: null,
      setUser: vi.fn(),
      clearUser: vi.fn(),
      loading: false,
    })
    
    const { container } = render(
      <UserProvider>
        <NameForm />
      </UserProvider>
    )

    const { getByLabelText } = within(container)
    expect((getByLabelText(/username/i)).value)
      .toBe('')
    expect((getByLabelText(/job title/i)).value)
      .toBe('')
  })
})
