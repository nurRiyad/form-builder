<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import SingleStep from './derived/SingleStep.vue'
import { ref, unref } from 'vue'
import lodash from 'lodash'

const props = withDefaults(
  defineProps<{
    ui: FormType
    schema: any
    initialValue: any
    logic?: any
    isLoading?: boolean
  }>(),
  {
    schema: {},
    initialValue: {},
    logic: null,
    isLoading: false
  }
)

const emits = defineEmits(['onSubmit'])

// generate model value
const model = ref<Record<string, unknown>>({})
const setValue = (key: string, val: any) => {
  const fKey = key.replaceAll('/properties', '')
  model.value[fKey] = val
}
const deleteValue = (key: string) => {
  const fKey = key.replaceAll('/properties', '')
  console.log(fKey)
  console.log(key)
  delete model.value[fKey]
}

// generate function
const fn = props?.logic ? props.logic(model) : null

// generate submitted form form
const generateFinalForm = () => {
  const raw = unref(model)
  const generatedObj = {}
  Object.keys(raw).forEach((key) => {
    const fKey = key.replaceAll('/', '.')
    lodash.set(generatedObj, fKey, raw[key])
  })

  return generatedObj
}

// form submit
const handleSubmit = () => {
  const value = generateFinalForm()
  emits('onSubmit', value)
}
</script>

<template>
  <div v-if="isLoading">
    <h1>Form file loading</h1>
  </div>
  <div class="max-w-3xl mx-auto" v-else>
    <SingleStep
      v-if="ui.type === 'single'"
      :ui="ui"
      :schema="schema"
      :initial-value="initialValue"
      :fn="fn"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
    <h1 v-else>No Proper Form type found</h1>
    <button @click="handleSubmit" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm disabled:bg-gray-400">
      Submit
    </button>
  </div>
</template>
