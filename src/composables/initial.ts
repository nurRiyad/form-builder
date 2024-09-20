import { inject } from 'vue'
import lodash from 'lodash'
import type { AllElement } from '@/types'

export const useInitial = () => {
  const initialValue = inject('initialValue')
  const func = inject<any>('func')

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

  const calculateInitValue = (el: AllElement, data: any, items?: string) => {
    if (el.type === 'block-layout' || el.type === 'horizontal-layout') return
    if (el?.init) {
      if (el.init.type === 'static') return el.init.value
      else {
        const fName = el.init.value
        if (fName && func) return func[fName](data)
        return ''
      }
    } else {
      return getValueFromModel(el.schema, items) || ''
    }
  }

  return { calculateInitValue }
}
