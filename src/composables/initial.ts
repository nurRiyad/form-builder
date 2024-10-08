import { inject } from 'vue'
import { get } from '@/utils/lodash'
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
    const value = get(initialValue, path)
    return value
  }

  const calculateInitValue = (el: AllElement, data: any, items?: string) => {
    if (el.type === 'block-layout' || el.type === 'horizontal-layout') return
    if (el?.init) {
      if (el.init.type === 'static') {
        if (el.init.value) return el.init.value
      } else {
        const fName = el.init.value
        if (fName && func) {
          const tmp = func[fName](data)
          if (tmp) return tmp
        }
      }
    } else {
      const tmp = getValueFromModel(el.schema, items) || ''
      if (tmp) return tmp
    }
    return ''
  }

  return { calculateInitValue }
}
