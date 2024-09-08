<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import { defineAsyncComponent, ref, unref } from 'vue'
import lodash from 'lodash'

const SingleStep = defineAsyncComponent(() => import('./derived/SingleStep.vue'))
const MultiStep = defineAsyncComponent(() => import('./derived/MultiStep.vue'))

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
const requiredValue = ref(false)

// generate model value
const model = ref<Record<string, unknown>>({})
const setValue = (key: string, val: any) => {
  const fKey = key.replaceAll('/properties', '')
  model.value[fKey] = val
}
const deleteValue = (key: string) => {
  const fKey = key.replaceAll('/properties', '')
  delete model.value[fKey]
}

// generate function
const { fn, validate } = props?.logic ? props.logic(model) : null

// generate submitted form form
const generateFinalForm = () => {
  Object.keys(model.value).forEach((key, idx) => {
    console.log(props.ui.elements[idx].schema, model.value[key])
    if (props.ui.elements[idx].required && !model.value[key]) {
      requiredValue.value = true
    }
  })
  const raw = unref(model)
  const generatedObj = {}
  Object.keys(raw).forEach((key, idx) => {
    const fKey = key.replaceAll('/', '.')
    lodash.set(generatedObj, fKey, raw[key])
  })

  return generatedObj
}

// form submit
const handleSubmit = () => {
  requiredValue.value = false
  const value = generateFinalForm()

  if (!requiredValue.value) emits('onSubmit', value)
}

// form cancel
const handleCancel = () => {
  console.log('Form cancel clicked')
}

// step handle
const activeStep = ref(0)
const totalStep = props.ui.type === 'single' ? 0 : props.ui.step.length
const handleStep = (type: 'Next' | 'Prev') => {
  if (props.ui.type === 'single') return
  if (type === 'Next') {
    if (activeStep.value + 1 >= totalStep) {
      handleSubmit()
    } else {
      activeStep.value += 1
    }
  } else {
    if (activeStep.value <= 0) {
      handleCancel()
    } else {
      activeStep.value -= 1
    }
  }
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
      :requiredField="requiredValue"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
    <MultiStep
      v-else-if="ui.type === 'multi'"
      :active-step="activeStep"
      :ui="ui"
      :schema="schema"
      :initial-value="initialValue"
      :fn="fn"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
    <h1 v-else>No Proper Form type found</h1>
    <div class="flex justify-between" v-if="ui.type === 'single'">
      <button @click="handleCancel" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm">Cancel</button>
      <button @click="handleSubmit" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm">Submit</button>
    </div>
    <div class="flex justify-between" v-else>
      <button @click="handleStep('Prev')" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm">
        {{ activeStep <= 0 ? 'Cancel' : 'Previous' }}
      </button>
      <button @click="handleStep('Next')" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm">
        {{ activeStep + 1 >= totalStep ? 'Submit' : 'Next' }}
      </button>
    </div>
    <pre class="p-4 bg-gray-300 mt-4">{{ model }}</pre>
  </div>
</template>
