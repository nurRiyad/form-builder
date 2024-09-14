<script lang="ts" setup>
import type { IfType, SingleStepForm } from '@/types/schema'
import { defineAsyncComponent, inject, ref, toRaw, unref } from 'vue'

const TheInput = defineAsyncComponent(() => import('../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))
const TheSwitch = defineAsyncComponent(() => import('../base/TheSwitch.vue'))
const TheAnchor = defineAsyncComponent(() => import('../base/TheAnchor.vue'))
const ArrayInput = defineAsyncComponent(() => import('../derived/ArrayInput.vue'))

const props = defineProps<{
  ui: SingleStepForm
  fn?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  getValue: (path: string) => unknown
  deleteValue: (key: string) => void
}>()

const schema = inject('schema')
const initialValue = inject('initialValue')

//single step form level data fetching
const isSSFetching = ref(false)
let componentData: Record<string, unknown> = { multi: toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props.ui.loader) return
  try {
    isSSFetching.value = true
    const fName = props.ui.loader
    componentData.single = await props.fn[fName]()
  } catch (error) {
    console.error(error)
  }
  isSSFetching.value = false
}
fetchData()

//check condition
const checkIf = (el: IfType | undefined) => {
  if (!el) return true
  if (el.type === 'computed') {
    return props.fn[el.name].value
  } else {
    return props.fn[el.name]()
  }
}
</script>

<template>
  <div>
    <div v-if="isSSFetching">
      <h1>Single Step Form Loading</h1>
    </div>
    <div v-else class="flex flex-col space-y-4">
      <p class="font-semibold text-xl text-center">{{ ui.label }}</p>
      <template v-for="el in ui.elements" :key="el.label">
        <TheInput
          v-if="el.type === 'input' && checkIf(el.if)"
          :element="el"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :get-value="getValue"
          :delete-value="deleteValue"
        />
        <SelectSingle
          v-else-if="el.type === 'select' && checkIf(el.if)"
          :element="el"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio' && checkIf(el.if)"
          :element="el"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheSwitch
          v-else-if="el.type === 'switch' && checkIf(el.if)"
          :element="el"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <CheckBox
          v-else-if="el.type === 'checkbox' && checkIf(el.if)"
          :element="el"
          :parent-data="componentData"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />

        <TheAnchor
          v-else-if="el.type === 'anchor' && checkIf(el.if)"
          :element="el"
          :parent-data="componentData"
          :func="fn"
        />

        <TextArea
          v-else-if="el.type === 'textarea' && checkIf(el.if)"
          :element="el"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />

        <ArrayInput
          v-if="el.type === 'array-object-form'"
          :ui="el"
          :initial-value="initialValue"
          :schema="schema"
          :func="fn"
          :parent-data="componentData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
      </template>
    </div>
  </div>
</template>
