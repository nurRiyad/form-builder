import type { FormType } from '@/types/schema'

export const ui: FormType = {
  type: 'single',
  label: 'This is one step of form',
  schema: 'this is schema',
  elements: [
    {
      type: 'input',
      label: 'This is input',
      schema: 'sdflkj'
    },
    {
      type: 'radio',
      label: 'radio label',
      schema: 'radioschema',
      options: ['riyad', 'srouav']
    }
  ]
}
