import { render } from 'test-utils/rendering'
import { CharacterList } from 'components/character-list'

describe('CharacterList', () => {
  it('renders children', () => {
    const { getByText } = render(
      <CharacterList>
        <div>Test Child</div>
      </CharacterList>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    const { getByText } = render(
      <CharacterList>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CharacterList>
    )
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
    expect(getByText('Child 3')).toBeInTheDocument()
  })
})

