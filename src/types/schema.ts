export interface MultiStepForm {
  type: 'multi-step-form'
  step: Array<SingleStepForm>
  label?: string
  loader?: string
}

export interface SingleStepForm {
  type: 'single-step-from'
  elements: Array<AllElement>
  schema?: string
  label?: string
  loader?: string
}

export type IfType = {
  type: 'function' | 'computed'
  name: string
}

export type Options = Array<string> | Array<{ name: string; value: string }>
export type Watchers = { paths: Array<string>; func: string }
export type Init = { type: 'func'; value: string } | { type: 'static'; value: unknown }
export type Validation = { type: 'required' } | { type: 'custom'; name: string }

interface BaseCommon {
  label: string
  schema: string
  if?: IfType
  loader?: string
  disable?: boolean | string
  init?: Init
  watcher?: Watchers
  validation?: Validation
}

export interface Input extends BaseCommon {
  type: 'input'
}

export interface TextArea extends BaseCommon {
  type: 'textarea'
  height: string
}

export interface Select extends BaseCommon {
  type: 'select'
  options?: Options
}

export interface MultiSelect extends BaseCommon {
  type: 'multi-select'
  options?: Options
}

export interface CheckBox extends BaseCommon {
  type: 'checkbox'
}

export interface Radio extends BaseCommon {
  type: 'radio'
  options: Options
}

export interface Switch extends BaseCommon {
  type: 'switch'
}

export interface Anchor extends BaseCommon {
  type: 'anchor'
}

export interface ArrayObject extends BaseCommon {
  type: 'array-object-form'
  elements: Array<BaseElement>
}

export interface ArrayItem extends BaseCommon {
  type: 'array-item-form'
  element: BaseElement
}

export interface ObjectItem extends BaseCommon {
  type: 'object-item'
}

interface CommonLayout {
  label: string
  if?: IfType
  init?: Init
  loader?: string
  showLabels?: boolean
  description?: string
  elements: Array<AllElement>
}

export interface BlockLayout extends CommonLayout {
  type: 'block-layout'
}

export interface HorizontalLayout extends CommonLayout {
  type: 'horizontal-layout'
}

export type BaseElement =
  | Input
  | Select
  | MultiSelect
  | TextArea
  | Radio
  | CheckBox
  | Switch
  | Anchor

export type LayoutElement = BlockLayout | HorizontalLayout
export type DerivedElement = ArrayObject | ArrayItem | ObjectItem

export type AllElement = BaseElement | DerivedElement | LayoutElement

export type FormType = SingleStepForm | MultiStepForm
