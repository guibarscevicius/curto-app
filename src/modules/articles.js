import { reactive, toRefs } from 'vue'

const state = reactive({
  list: [],
  selected: [],
  active: null,
})

export default function useArticles() {
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
    addSelected,
    removeSelected,
    listSelected,
  }
}
