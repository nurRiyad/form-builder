export function useFunc(model) {
  const isCredType = ({ params }) => {
    const type = params[1] || ''
    const key = 'schema/type'
    if (model.value[key] === type) return true
    else return false
  }

  return { isCredType }
}
