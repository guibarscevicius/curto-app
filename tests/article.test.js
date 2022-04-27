import useArticle from '../src/modules/article'

const listMock = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
]

const selectedMock = ['1', '4']

const article = useArticle()

describe('handle selected articles list addition, removal and data display', () => {
  beforeEach(() => {
    article.list.value = listMock
    article.selected.value = selectedMock
  })

  it('adds article to selected list', () => {
    article.addSelected('2')
    expect(article.selected.value).toContain('2')
    expect(article.selected.value).toContain('4')
  })

  it('removes article from selected list', () => {
    article.removeSelected('4')
    expect(article.selected.value).not.toContain('4')
    expect(article.selected.value).toContain('1')
  })

  it('gets properties from selected list', () => {
    expect(article.listSelected()).toContainEqual(listMock[0])
  })
})
