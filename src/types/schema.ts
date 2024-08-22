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
}

export interface Input {
  type: 'input'
  schema: string
  label: string
}

export interface TextArea {
  type: 'textarea'
  schema: string
  label: string
}

export interface Radio {
  type: 'Radio'
  schema: string
  label: string
  options: Array<string>
}

export interface Select {
  type: 'select'
  options: Array<string | boolean | number>
  schema: string
  label: string
}

export type BaseElement = Input | Select | TextArea | Radio

export type FormType = SingleStepForm | MultiStepForm
