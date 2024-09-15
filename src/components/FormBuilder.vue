<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import { defineAsyncComponent, provide, ref, toRaw, unref } from 'vue'
import lodash from 'lodash'
import { useGlobalModel } from '@/composables/model'

const SingleStep = defineAsyncComponent(() => import('./root/SingleStep.vue'))
const MultiStep = defineAsyncComponent(() => import('./root/MultiStep.vue'))

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
const { model } = useGlobalModel()

const fn = props?.logic ? props.logic(model) : null

// provide schema & initial value & functions
provide('func', fn)
provide('schema', props.schema)
provide('initialValue', props.initialValue)

// generate function

// generate submitted form form
const generateFinalForm = () => {
  const raw = toRaw(unref(model))
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

// form cancel
const handleCancel = () => {
  console.log('Form cancel clicked')
}

// step handle
const activeStep = ref(0)
const totalStep = props.ui.type === 'single-step-from' ? 0 : props.ui.step.length
const handleStep = (type: 'Next' | 'Prev') => {
  if (props.ui.type === 'single-step-from') return
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
    <SingleStep v-if="ui.type === 'single-step-from'" :ui="ui" />
    <MultiStep v-else-if="ui.type === 'multi-step-form'" :active-step="activeStep" :ui="ui" />
    <h1 v-else>No Proper Form type found</h1>
    <div class="flex justify-between" v-if="ui.type === 'single-step-from'">
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
