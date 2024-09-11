import { computed, unref } from 'vue'

export const useFunc = (model) => {
  const isCredAws = () => {
    const raw = unref(model)
    if (raw['schema/type'] === 'Aws') return true
    else return false
  }

  const isCredAzure = computed(() => {
    const raw = unref(model)
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

  const initFun = () => {
    const raw = unref(model)
    const type = raw['schema/type'] || ''
    return `This is from type ${type}`
  }

  const checkOnChange = (n) => {
    console.log('on Changes fires', n)

    model.value['schema/ownerID'] = 10
  }

  const watchTest = () => {
    return 'h1 '
  }

  return {
    isCredAws,
    isCredAzure,
    initFun,
    loadData,
    loadData1,
    loadData2,
    checkOnChange,
    watchTest
  }
}
