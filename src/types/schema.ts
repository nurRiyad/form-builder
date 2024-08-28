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

interface BaseCommon {
  label: string
  schema: string
  if?: string
  fetch?: string
  disable?: boolean
}

export interface Input extends BaseCommon {
  type: 'input'
  computed?: {
    val: string
    func: string
  }
}

export interface TextArea extends BaseCommon {
  type: 'textarea'
}

export interface Radio extends BaseCommon {
  type: 'radio'
  options: Array<string>
}

export interface Select extends BaseCommon {
  type: 'select'
  options: Array<string | boolean | number>
}

export type BaseElement = Input | Select | TextArea | Radio

export type FormType = SingleStepForm | MultiStepForm
