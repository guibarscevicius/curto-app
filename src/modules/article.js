import { reactive, toRefs } from 'vue'
import request from '~/modules/request'

const baseUrl = import.meta.env.VITE_API_URL

const state = reactive({
  entries: new Map(),
  list: [],
  selected: [],
  active: 0,
})

export default function useArticles () {
  const fetchArticles = async () => {
    const [err, articles] = await request.get('/articles')
    if (err) return

    articles.forEach(({
      id,
      createdAt,
      locale,
      media: {
        caption,
        formats: { thumbnail: { url: image } = {} } = {},
      } = {},
      source: {
        name: source,
        logo: { formats: { thumbnail: { url: logo } } },
      },
      title,
      url,
    }) => {
      state.entries.set(id, {
        createdAt,
        locale,
        caption,
        image,
        source,
        logo,
        title,
        url,
      })
    })

    state.list = articles.map(({ id }) => id)
  }

  const listArticles = () => state.list
    .map(id => ({ id, ...state.entries.get(id) }))

  const addSelected = (id) => {
    state.selected = [...new Set([...state.selected, id])]
  }

  const removeSelected = (id) => {
    const index = state.list.indexOf(id)

    state.active = (index < state.active)
      ? Math.max(state.active - 1, 0)
      : Math.min(state.active, state.selected.length - 1)

    state.selected = state.selected
      .filter(selected => selected !== id)
  }

  function listSelected () {
    return state.selected.map(id => state.entries.get(id))
  }

  function hasNext () {
    return (state.selected.length - 1) > state.active
  }

  function hasPrevious () {
    return state.active > 0
  }

  function getActive () {
    if (!state.selected.length) return {}

    const id = state.selected[state.active]

    return {
      ...state.entries[id],
      audioUrl: baseUrl + '/articles/' + id,
    }
  }

  function next () {
    state.active = Math.min(state.active + 1, state.selected.length)
  }

  function previous () {
    state.active = Math.max(state.active - 1, 0)
  }

  return {
    ...toRefs(state),
    fetchArticles,
    listArticles,
    addSelected,
    removeSelected,
    listSelected,
    hasNext,
    hasPrevious,
    getActive,
    next,
    previous,
  }
}
