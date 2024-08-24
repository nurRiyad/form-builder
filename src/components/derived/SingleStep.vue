<script lang="ts" setup>
import type { SingleStepForm } from '@/types/schema'
import TheInput from '../base/TheInput.vue'
import SelectSingle from '../base/SelectSingle.vue'
import TheRadio from '../base/TheRadio.vue'
import TextArea from '../base/TextArea.vue'
import { reactive, ref, toRaw } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  ui: SingleStepForm
  initialValue: any
  logic: any
  language: any
  showSubmit: boolean
}>()

// generate model value
const model = reactive<Record<string, unknown>>({})
const setValue = (key: string, val: any) => {
  model[key] = val
}

// generate function
const fn = props.logic(model)

// generate submitted form form
const generateFinalForm = () => {
  const raw = toRaw(model)
  const generatedObj = {}
  Object.keys(raw).forEach((key) => {
    lodash.set(generatedObj, key, raw[key])
  })

  return generatedObj
}
const handleSubmit = () => {
  const value = generateFinalForm()
  console.log(value)
}

//run fetch function
const isSSFetching = ref(false)
const fetchData = async () => {
  console.log(props.ui)
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
  <div v-else class="flex flex-col max-w-3xl mx-auto space-y-10">
    <template v-for="el in ui.elements" :key="el.label">
      <TheInput
        v-if="el.type === 'input'"
        :element="el"
        :set-value="setValue"
        :initial-value="initialValue"
        :func="fn"
      />
      <SelectSingle v-else-if="el.type === 'select'" :element="el" />
      <TheRadio
        v-else-if="el.type === 'radio'"
        :element="el"
        :set-value="setValue"
        :initial-value="initialValue"
      />
      <TextArea v-else-if="el.type === 'textarea'" :element="el" />
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
