<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

const TheInput = defineAsyncComponent(() => import('../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))

const props = defineProps<{
  elements: Array<BaseElement>
  fn?: any
  items?: string
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
}>()

const handleDelete = () => {
  if (props.items) props.deleteValue(props.items)
}
</script>

<template>
  <div class="border p-4 space-y-2">
    <div class="flex flex-col space-y-4">
      <template v-for="el in elements" :key="el.label">
        <TheInput
          v-if="el.type === 'input'"
          :element="el"
          :func="fn"
          :items="items"
          :set-value="setValue"
        />
        <SelectSingle
          v-else-if="el.type === 'select'"
          :element="el"
          :func="fn"
          :set-value="setValue"
        />
        <TheRadio v-else-if="el.type === 'radio'" :element="el" :func="fn" :set-value="setValue" />
        <CheckBox
          v-else-if="el.type === 'checkbox'"
          :element="el"
          :func="fn"
          :set-value="setValue"
        />
        <TextArea
          v-else-if="el.type === 'textarea'"
          :element="el"
          :func="fn"
          :set-value="setValue"
        />
      </template>
    </div>
    <button @click="handleDelete" class="bg-red-300 mt-5 py-2 px-3 rounded-sm">Delete</button>
  </div>
</template>
