import { computed, unref } from 'vue'

export const useFunc = (model) => {
  const raw = unref(model)
  const isCredAws = () => {
    if (raw['schema/type'] === 'Aws') return true
    else return false
  }

  const isCredAzure = computed(() => {
    if (raw['schema/type'] === 'Azure') return true
    else return false
  })

  const loadData = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }

  const loadData2 = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/3')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }

  const loadData1 = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/2')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }

  return { isCredAws, isCredAzure, loadData, loadData1, loadData2 }
}
