<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import { defineAsyncComponent, provide, ref, toRaw, unref } from 'vue'
import { set } from '@/utils/lodash'
import { useGlobalModel } from '@/composables/global/model'
import { useBlockValidity } from '@/composables/validation'
import { useGlobalEvent } from '@/composables/global/event'

const SingleStep = defineAsyncComponent(() => import('./root/SingleStep.vue'))
const MultiStep = defineAsyncComponent(() => import('./root/MultiStep.vue'))

const props = withDefaults(
  defineProps<{
    ui: FormType
    schema: any
    initialValue: any
    logic?: any
    isLoading?: boolean
    hideFormAction?: boolean
  }>(),
  {
    schema: {},
    initialValue: {},
    logic: null,
    isLoading: false,
    hideFormAction: false
  }
)

const emits = defineEmits(['onSubmit'])

// generate model value
const { model, clearModel } = useGlobalModel()
clearModel()

const fn = props?.logic ? props.logic(model) : null

// provide schema & initial value & functions
provide('func', fn)
provide('schema', props.schema)
provide('initialValue', props.initialValue)

// generate submitted form form
const generateFinalForm = () => {
  const raw = toRaw(unref(model))
  const generatedObj = {}
  Object.keys(raw).forEach((key) => {
    const fKey = key.replaceAll('/', '.')
    set(generatedObj, fKey, raw[key])
  })
  return generatedObj
}

// validation
const { validateEvent, pageChangeEvent } = useGlobalEvent()
const { updateErr, isValid } = useBlockValidity()

// form submit
const handleSubmit = () => {
  // validations
  validateEvent.trigger()
  if (!isValid()) return

  // form data
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

  // validations
  validateEvent.trigger()
  if (!isValid()) return

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

  //page change event
  pageChangeEvent.trigger()
}

// expose this value to parent
defineExpose({
  handleSubmit,
  handleCancel,
  handleStep,
  model
})
</script>

<template>
  <div class="mt-70">
    <div class="container" v-if="isLoading">
      <div class="columns">
        <div class="column is-8">
          <h1>Form file loading</h1>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="columns is-centered">
        <div class="column is-8">
          <SingleStep
            v-if="ui.type === 'single-step-from'"
            :is-active="true"
            :ui="ui"
            :parent-err="updateErr"
          />
          <MultiStep
            v-else-if="ui.type === 'multi-step-form'"
            :active-step="activeStep"
            :ui="ui"
            :parent-err="updateErr"
          />
          <h1 v-else>No Proper Form type found</h1>
          <slot name="custom-form" />
          <template v-if="!hideFormAction">
            <div
              class="is-flex is-justify-content-space-between my-4"
              v-if="ui.type === 'single-step-from'"
            >
              <button @click="handleCancel" class="button ac-button">Cancel</button>
              <button @click="handleSubmit" class="button ac-button is-primary">Submit</button>
            </div>
            <div class="is-flex is-justify-content-space-between my-4" v-else>
              <button @click="handleStep('Prev')" class="button ac-button">
                {{ activeStep <= 0 ? 'Cancel' : 'Previous' }}
              </button>
              <button @click="handleStep('Next')" class="button ac-button is-primary">
                {{ activeStep + 1 >= totalStep ? 'Submit' : 'Next' }}
              </button>
            </div>
          </template>
          <pre class="p-4 bg-gray-300 mt-4">{{ model }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
