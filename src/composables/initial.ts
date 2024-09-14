import { inject } from 'vue'
import lodash from 'lodash'
import type { Init } from '@/types'

export const useInitial = () => {
  const initialValue = inject('initialValue')

  const getValueFromModel = (schema: string, items?: string) => {
    let path = schema.replaceAll('/properties', '')
    path = path.replace('schema/', '')
    path = path.replaceAll('/', '.')

    if (path.includes('items')) {
      path = path.replace('.items', `[${items}]`)
    }
    const value = lodash.get(initialValue, path)
    return value
  }

  const calculateInitValue = (
    init: Init | undefined,
    schema: string,
    func: any,
    items?: string
  ) => {
    if (init) {
      if (init.type === 'static') return init.value
      else {
        const fName = init.value
        return func[fName]()
      }
    } else {
      return getValueFromModel(schema, items) || ''
    }
  }

  return { calculateInitValue }
}
