import type { FormType } from '@/types/schema'

export const ui: FormType = {
  type: 'single',
  label: 'This is one step of form',
  schema: 'this is schema',
  fetchFn: 'fetchData',
  elements: [
    {
      type: 'input',
      label: 'This is input',
      schema: 'name'
    },
    {
      type: 'radio',
      label: 'radio label',
      schema: 'family.man.age',
      options: ['riyad', 'srouav']
    }
  ]
}

export const model = {
  name: 'riyad',
  family: {
    man: {
      age: 'riyad'
    }
  }
}

export const language = {
  name: 'language'
}
