import { reactive, toRefs } from 'vue'

const state = reactive({
  list: [],
  selected: [],
  active: null,
})

export default function useArticles() {
  const get = async(category) => { return category }

  return { ...toRefs(state), get }
}
