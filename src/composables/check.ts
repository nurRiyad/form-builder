import { computed, type Ref } from 'vue'

export const useCheck = (model: Ref<Record<string, unknown>>) => {
  const showInput = computed(() => {
    const val = model.value['family.man.age']
    console.log(val)
    return val == 'riyad'
  })

  const fetchData = async () => {
    try {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      const data = await resp.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
    return false
  }

  return { showInput, fetchData }
}
