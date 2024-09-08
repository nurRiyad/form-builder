<script lang="ts" setup>
import type { ArrayInput } from '@/types/schema'
import { defineAsyncComponent, ref, toRaw, watch } from 'vue'
import lodash from 'lodash'

const ArrayItem = defineAsyncComponent(() => import('../derived/ArrayItem.vue'))

const props = defineProps<{
  ui: ArrayInput
  schema: any
  initialValue: any
  func?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue: (key: string) => void
}>()

const itemValues = () => {
  let path = props.ui.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const vl = lodash.get(props.initialValue, path)
  return vl
}

const tempMode = ref(itemValues())
const setValueTemp = (key: string, val: any, items?: string) => {
  if (items) {
    tempMode.value[parseInt(items)][key] = val
  }
}
const deleteValueTemp = (key: string) => {
  tempMode.value.splice(parseInt(key), 1)
}

watch(
  tempMode,
  (n) => {
    props.setValue(props.ui.schema, toRaw(n))
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div class="flex justify-between my-2">
      <h1>{{ ui.label }}</h1>
      <button @click="tempMode.push({})" class="px-2 py-1 bg-blue-400">Add new</button>
    </div>
    <div class="flex flex-col space-y-2">
      <ArrayItem
        v-for="(val, idx) in tempMode"
        :key="val"
        :elements="ui.elements"
        :schema="schema"
        :initial-value="val"
        :fn="func"
        :items="String(idx)"
        :set-value="setValueTemp"
        :delete-value="deleteValueTemp"
      />
    </div>
  </div>
</template>
