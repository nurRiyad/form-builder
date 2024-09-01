<script lang="ts" setup>
import type { SingleStepForm } from '@/types/schema'
import InputText from '../base/InputText.vue'
import SelectSingle from '../base/SelectSingle.vue'
import TheRadio from '../base/TheRadio.vue'
import TextArea from '../base/TextArea.vue'
import { ref } from 'vue'
import CheckBox from '../base/CheckBox.vue'

const props = defineProps<{
  ui: SingleStepForm
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any) => void
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
          v-if="el.type === 'input' && (el.if ? fn[el.if].value : true)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <SelectSingle
          v-else-if="el.type === 'simple-select' && (el.if ? fn[el.if].value : true)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio' && (el.if ? fn[el.if].value : true)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <CheckBox
          v-else-if="el.type === 'check-box' && (el.if ? fn[el.if].value : true)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TextArea
          v-else-if="el.type === 'textarea' && (el.if ? fn[el.if].value : true)"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
      </template>
    </div>
  </div>
</template>
