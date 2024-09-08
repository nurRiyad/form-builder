<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent, ref } from 'vue'

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
  items?: string
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
}>()

const showItem = ref(false)

const itemValues = computed(() => {
  let path = props.ui.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const vl = lodash.get(props.initialValue, path)
  return vl
})
</script>

<template>
  <div class="space-y-2">
    <div v-if="showItem" class="flex flex-col space-y-4">
      <template v-for="el in elements" :key="el.label">
        <InputText
          v-if="el.type === 'input'"
          :element="el"
          :initial-value="initialValue"
          :whole-schema="schema"
          :func="fn"
          :items="items"
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
    <div v-else>
      <p>Table data</p>
    </div>
  </div>
</template>
