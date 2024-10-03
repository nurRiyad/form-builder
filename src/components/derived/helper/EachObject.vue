<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

import TheTrash from '@/components/icons/TheTrash.vue'

const TheInput = defineAsyncComponent(() => import('../../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../../base/TheRadio.vue'))

const props = defineProps<{
  elements: Array<BaseElement>
  items: string
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
  getValue: (key: string, items: string) => any
}>()

const handleDelete = () => {
  if (props.items) props.deleteValue(props.items)
}

const tempData = (path: string) => {
  return props.getValue(path, props.items)
}
</script>

<template>
  <div class="b-1 p-16 is-flex gap-8 is-rounded-4">
    <div class="is-flex gap-8 is-fullwidth">
      <template v-for="el in elements" :key="el">
        <TheInput
          v-if="el.type === 'input'"
          :element="el"
          :items="items"
          :temp-value="tempData(el.schema)"
          :set-value="setValue"
          class="mb-0"
        />
        <SelectSingle
          v-else-if="el.type === 'select'"
          :element="el"
          :items="items"
          :temp-value="tempData(el.schema)"
          :set-value="setValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio'"
          :element="el"
          :items="items"
          :temp-value="tempData(el.schema)"
          :set-value="setValue"
        />
        <CheckBox v-else-if="el.type === 'checkbox'" :element="el" :set-value="setValue" />
        <TextArea
          v-else-if="el.type === 'textarea'"
          :element="el"
          :items="items"
          :temp-value="tempData(el.schema)"
          :set-value="setValue"
        />
      </template>
    </div>
    <button @click="handleDelete" class="button ac-button is-danger is-light"><TheTrash /></button>
  </div>
</template>
