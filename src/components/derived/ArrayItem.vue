<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

const InputText = defineAsyncComponent(() => import('../base/InputText.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))
const ArrayInput = defineAsyncComponent(() => import('../derived/ArrayInput.vue'))

defineProps<{
  elements: Array<BaseElement>
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-col space-y-4">
      <template v-for="el in elements" :key="el.label">
        <InputText
          v-if="el.type === 'input'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :required-field="false"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <SelectSingle
          v-else-if="el.type === 'simple-select'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <CheckBox
          v-else-if="el.type === 'check-box'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TextArea
          v-else-if="el.type === 'textarea'"
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
    <div class="flex justify-between">
      <button class="px-2 py-1 bg-red-400">Cancel</button>
      <button class="px-2 py-1 bg-blue-400">Save</button>
    </div>
  </div>
</template>
