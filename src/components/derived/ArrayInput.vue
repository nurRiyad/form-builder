<script lang="ts" setup>
import type { ArrayInput } from '@/types/schema'
import { computed, defineAsyncComponent } from 'vue'
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

const itemValues = computed(() => {
  let path = props.ui.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const vl = lodash.get(props.initialValue, path)
  return vl
})
</script>

<template>
  <div>
    <div class="flex justify-between my-2">
      <h1>{{ ui.label }}</h1>
      <button class="px-2 py-1 bg-blue-400">Add new</button>
    </div>
    <div class="my-2 p-4 border flex flex-col space-y-2">
      <ArrayItem
        v-for="(val, idx) in itemValues"
        :key="val.name"
        :elements="ui.elements"
        :schema="schema"
        :initial-value="initialValue"
        :fn="func"
        :items="String(idx)"
        :set-value="setValue"
        :delete-value="deleteValue"
      />
    </div>
  </div>
</template>
