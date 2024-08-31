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

type Options = Array<string> | Array<{ name: string; value: string }>

export interface Input extends BaseCommon {
  type: 'input'
  computed?: {
    val: string
    func: string
  }
}

export interface Select extends BaseCommon {
  type: 'simple-select'
  options: Options
}

export interface TextArea extends BaseCommon {
  type: 'textarea'
}

export interface Radio extends BaseCommon {
  type: 'radio'
  options: Options
}

export interface CheckBox extends BaseCommon {
  type: 'check-box'
}

export type BaseElement = Input | Select | TextArea | Radio | CheckBox

export type FormType = SingleStepForm | MultiStepForm
