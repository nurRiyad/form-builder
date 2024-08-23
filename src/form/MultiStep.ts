import type { FormType } from '@/types/schema'

export const ui: FormType = {
  type: 'multi',
  labe: 'This is the form',
  step: [
    {
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
    },
    {
      type: 'single',
      label: 'This is one step of form',
      schema: 'this is schema',
      elements: [
        {
          type: 'select',
          label: 'This is select',
          schema: 'sdflkj',
          options: [1, 2, 3, 4]
        },
        {
          type: 'textarea',
          label: 'This is textarea',
          schema: 'textarea'
        }
      ]
    }
  ]
}
