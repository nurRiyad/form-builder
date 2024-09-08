<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

const InputText = defineAsyncComponent(() => import('../base/InputText.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))

const props = defineProps<{
  elements: Array<BaseElement>
  schema: any
  initialValue: any
  fn?: any
  items?: string
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
}>()

const handleDelete = () => {
  if (props.items) props.deleteValue(props.items)
}

const test = (key: string) => {
  console.log(key)
}
</script>

<template>
  <div class="border p-4 space-y-2">
    <div class="flex flex-col space-y-4">
      <template v-for="el in elements" :key="el.label">
        <InputText
          v-if="el.type === 'input'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :items="items"
          :set-value="setValue"
          :delete-value="test"
        />
        <SelectSingle
          v-else-if="el.type === 'simple-select'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
        />
        <CheckBox
          v-else-if="el.type === 'check-box'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
        />
        <TextArea
          v-else-if="el.type === 'textarea'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :set-value="setValue"
        />
      </template>
    </div>
    <button @click="handleDelete" class="bg-red-300 mt-5 py-2 px-3 rounded-sm">Delete</button>
  </div>
</template>
