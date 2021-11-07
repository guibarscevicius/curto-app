import { reactive, toRefs } from 'vue'
import request from '~/modules/request'

const baseUrl = import.meta.env.VITE_API_URL

const state = reactive({
  list: [],
  selected: [],
  active: null,
})

export default function useArticles() {
  const fetchArticles = async () => {
    const [err, articles] = await request.get('/articles')
    if (err) return

    state.list = articles
  }

  const listArticles = () => state.list
    .map(article => ({
      ...article,
      media: baseUrl + (article.media?.formats?.thumbnail?.url
        || article.media?.url),
      source: {
        ...article.source,
        logo: baseUrl + (article.source?.logo?.formats?.thumbnail?.url
          || article.source?.logo?.url),
      },
    }))

  const addSelected = (id) => {
    state.selected = [...new Set([...state.selected, id])]
  }

  const removeSelected = (id) => {
    state.selected = state.selected.filter(selected => selected !== id)
  }

  function listSelected() {
    return state.selected.map(id =>
      this.listArticles().find(({ _id }) => _id === id))
  }

  return {
    ...toRefs(state),
    fetchArticles,
    listArticles,
    addSelected,
    removeSelected,
    listSelected,
  }
}
