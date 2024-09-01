import type { FormType } from '@/types/schema'

export const ui: FormType = {
  type: 'single',
  label: 'This is one step of form',
  schema: 'this is schema',
  elements: [
    {
      type: 'radio',
      label: 'radio label',
      schema: 'family.man.age',
      options: ['riyad', 'srouav', 'athoy', 'roza']
    },
    {
      type: 'input',
      label: 'This is input',
      schema: 'name',
      if: 'showInput'
    },
    {
      type: 'check-box',
      label: 'Checkbox Test',
      schema: 'ch.a.b.c'
    },
    {
      type: 'textarea',
      label: 'Text Area Check',
      schema: 'text.a.f'
    },
    {
      type: 'simple-select',
      label: 'Simple Select Box',
      schema: 'select.a.ff.ss',
      options: ['apple', 'guava']
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
