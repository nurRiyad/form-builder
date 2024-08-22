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

export interface Select {
  type: 'select'
  options: Array<string | boolean | number>
  schema: string
  label: string
}

export type BaseElement = Input | Select

export type FormType = SingleStepForm | MultiStepForm
