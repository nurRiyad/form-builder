<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import TheInput from '../base/TheInput.vue'
import SelectSingle from '../base/SelectSingle.vue'
import TheRadio from '../base/TheRadio.vue'
import TextArea from '../base/TextArea.vue'
import { reactive, toRaw } from 'vue'
import lodash from 'lodash'

defineProps<{
  elements: Array<BaseElement>
  initialValue: any
  showSubmit: boolean
}>()

// generate model value
const model = reactive<Record<string, unknown>>({})
const setValue = (key: string, val: any) => {
  model[key] = val
}

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
</script>

<template>
  <div class="flex flex-col max-w-3xl mx-auto space-y-10">
    <template v-for="el in elements" :key="el.label">
      <TheInput
        v-if="el.type === 'input'"
        :element="el"
        :set-value="setValue"
        :initial-value="initialValue"
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
