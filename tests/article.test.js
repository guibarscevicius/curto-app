import useArticle from '../src/modules/articles'

const listMock = [
  { _id: '1', title: 'Article number one' },
  { _id: '2', title: 'Article number two' },
  { _id: '3', title: 'Article number three' },
  { _id: '4', title: 'Article number four' },
  { _id: '5', title: 'Article number five' },
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
