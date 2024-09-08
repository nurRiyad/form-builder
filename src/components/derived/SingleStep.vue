<script lang="ts" setup>
import type { IfType, SingleStepForm } from '@/types/schema'
import { defineAsyncComponent, ref } from 'vue'

const InputText = defineAsyncComponent(() => import('../base/InputText.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))
const ArrayInput = defineAsyncComponent(() => import('../derived/ArrayInput.vue'))

const props = defineProps<{
  ui: SingleStepForm
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
}>()

//single step form level data fetching
const isSSFetching = ref(false)
const fetchData = async () => {
  if (!props.ui.fetchFn) return
  try {
    isSSFetching.value = true
    await props.fn[props.ui.fetchFn]()
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
        <InputText
          v-if="el.type === 'input' && checkIf(el.if)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <SelectSingle
          v-else-if="el.type === 'simple-select' && checkIf(el.if)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio' && checkIf(el.if)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <CheckBox
          v-else-if="el.type === 'check-box' && checkIf(el.if)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TextArea
          v-else-if="el.type === 'textarea' && checkIf(el.if)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />

        <ArrayInput
          v-if="el.type === 'array-input'"
          :ui="el"
          :initial-value="initialValue"
          :schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
      </template>
    </div>
  </div>
</template>
