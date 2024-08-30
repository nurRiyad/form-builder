<script lang="ts" setup>
import type { SingleStepForm } from '@/types/schema'
import InputText from '../base/InputText.vue'
import SelectSingle from '../base/SelectSingle.vue'
import TheRadio from '../base/TheRadio.vue'
import TextArea from '../base/TextArea.vue'
import { ref, unref } from 'vue'
import lodash from 'lodash'
import CheckBox from '../base/CheckBox.vue'

const props = defineProps<{
  ui: SingleStepForm
  schema: any
  initialValue: any
  logic?: any
  showSubmit: boolean
}>()

// generate model value
const model = ref<Record<string, unknown>>({})
const setValue = (key: string, val: any) => {
  model.value[key] = val
}
const deleteValue = (key: string) => {
  delete model.value[key]
}

// generate function
const fn = props?.logic ? props.logic(model) : null

// generate submitted form form
const generateFinalForm = () => {
  const raw = unref(model)
  const generatedObj = {}
  Object.keys(raw).forEach((key) => {
    lodash.set(generatedObj, key, raw[key])
  })

  return generatedObj
}

// form submit
const handleSubmit = () => {
  const value = generateFinalForm()
  console.log(value)
}

//single step form level data fetching
const isSSFetching = ref(false)
const fetchData = async () => {
  if (!props.ui.fetchFn) return
  try {
    isSSFetching.value = true
    await fn[props.ui.fetchFn]()
  } catch (error) {
    console.error(error)
  }
  isSSFetching.value = false
}
fetchData()
</script>

<template>
  <div v-if="isSSFetching">
    <h1>Single Step Form Loading</h1>
  </div>
  <div v-else class="flex flex-col max-w-3xl mx-auto space-y-4">
    <p class="font-semibold text-xl pb-5">{{ ui.label }}</p>
    <template v-for="el in ui.elements" :key="el.label">
      <InputText
        v-if="el.type === 'input-text' && (el.if ? fn[el.if].value : true)"
        :element="el"
        :set-value="setValue"
        :delete-value="deleteValue"
        :initial-value="initialValue"
        :func="fn"
      />
      <SelectSingle
        v-else-if="el.type === 'simple-select' && (el.if ? fn[el.if].value : true)"
        :element="el"
        :set-value="setValue"
        :delete-value="deleteValue"
        :initial-value="initialValue"
      />
      <TheRadio
        v-else-if="el.type === 'radio' && (el.if ? fn[el.if].value : true)"
        :element="el"
        :set-value="setValue"
        :delete-value="deleteValue"
        :initial-value="initialValue"
      />
      <CheckBox
        v-else-if="el.type === 'check-box' && (el.if ? fn[el.if].value : true)"
        :element="el"
        :set-value="setValue"
        :delete-value="deleteValue"
        :initial-value="initialValue"
      />
      <TextArea
        v-else-if="el.type === 'textarea' && (el.if ? fn[el.if].value : true)"
        :element="el"
        :set-value="setValue"
        :delete-value="deleteValue"
        :initial-value="initialValue"
      />
    </template>
    <button
      @click="handleSubmit"
      v-if="showSubmit"
      class="bg-sky-500 mt-5 py-2 px-3 rounded-sm disabled:bg-gray-400"
    >
      Submit
    </button>

    <pre>{{ model }}</pre>
  </div>
</template>
