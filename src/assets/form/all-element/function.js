export const useFunc = (model) => {
  console.log(model.value)

  const multiLoader = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const singleLoader1 = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/2')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const singleLoader2 = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/3')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }

  const fNameLoader = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/4')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }

  return { multiLoader, singleLoader1, singleLoader2, fNameLoader }
}
