import { toRaw } from 'vue'
import { get } from './lodash'

export const requiredCheck = (val: unknown): string | false => {
  if (typeof val === 'number') {
    if (val || val === 0) return false
    else return 'This field is required'
  } else if (val) return false
  else return 'This field is required'
}

export const isRequiredFromSchema = (path: string | undefined, wholeSchema: unknown) => {
  if (!path) return false
  const splittedPath = path.split('/')
  const rPath = splittedPath.slice(1, -2) || []
  const fPath = rPath.join('.') || ''
  let val = toRaw(wholeSchema) as undefined | { required: Array<string> }
  if (fPath) val = get(wholeSchema, fPath) as undefined | { required: Array<string> }
  const requiredField = val?.required || []
  const valueName = path.split('/').at(-1) || ''
  if (requiredField.includes(valueName)) return true
  return false
}
