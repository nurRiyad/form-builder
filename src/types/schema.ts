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

export interface InputText extends BaseCommon {
  type: 'input-text'
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

export interface CheckBox extends BaseCommon {
  type: 'check-box'
}

export interface Select extends BaseCommon {
  type: 'simple-select'
  options: Array<string | boolean | number>
}

export type BaseElement = InputText | Select | TextArea | Radio | CheckBox

export type FormType = SingleStepForm | MultiStepForm
