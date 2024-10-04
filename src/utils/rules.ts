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
  // remove schema from first
  // remove properties/val from last
  // replace / with .
  const fPath = path
    .replace(/^schema\//, '')
    .replace(/\/properties\/[^/]+$/, '')
    .replace(/\//g, '.')
  const val = get(wholeSchema, fPath) as undefined | { required: Array<string> }
  const requiredField = val?.required || []
  const valueName = path.split('/').at(-1) || ''
  if (requiredField.includes(valueName)) return true
  return false
}
