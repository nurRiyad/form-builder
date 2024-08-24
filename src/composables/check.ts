import { computed, type Reactive } from 'vue'

export const useCheck = (model: Reactive<Record<string, unknown>>) => {
  const showInput = computed(() => {
    const val = model['family.man.age']
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
