export interface MultiStepForm {
  type: 'multi'
  step: Array<SingleStepForm>
  labe: string
}

export interface SingleStepForm {
  type: 'single'
  schema: string
  label: string
  elements: Array<BaseElement>
  fetchFn?: string
}

export interface Input {
  type: 'input'
  label: string
  schema: string
  computed?: {
    val: string
    func: string
  }
  if?: string
  disable?: boolean
}

export interface TextArea {
  type: 'textarea'
  schema: string
  label: string
}

export interface Radio {
  type: 'radio'
  schema: string
  label: string
  options: Array<string>
}

export interface Select {
  type: 'select'
  label: string
  options: Array<string | boolean | number>
  schema: string
}

export interface FinalInput {
  type: 'input'
  label: string
  schema: string
  computed?: {
    val: string
    func: string
  }
  if?: string
  disable?: boolean
}

export type BaseElement = Input | Select | TextArea | Radio

export type FormType = SingleStepForm | MultiStepForm
