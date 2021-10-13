import { reactive, toRefs } from 'vue'
import request from '~/modules/request'

const state = reactive({
  list: [],
  selected: [],
  active: null,
})

export default function useArticles() {
  const fetchArticles = async () => {
    const [err, articles] = await request.get('/article/list')
    if (err) return

    state.list = articles
  }

  const addSelected = (id) => {
    state.selected = [...new Set([...state.selected, id])]
  }

  const removeSelected = (id) => {
    state.selected = state.selected.filter(selected => selected !== id)
  }

  const listSelected = () => state.selected
    .map(id => state.list.find(({ _id }) => _id === id))

  return {
    ...toRefs(state),
    fetchArticles,
    addSelected,
    removeSelected,
    listSelected,
  }
}
