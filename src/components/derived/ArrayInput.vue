<script lang="ts" setup>
import type { ArrayInput } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

const ArrayItem = defineAsyncComponent(() => import('../derived/ArrayItem.vue'))

defineProps<{
  ui: ArrayInput
  schema: any
  initialValue: any
  func?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()
</script>

<template>
  <div>
    <ArrayItem
      :elements="ui.elements"
      :schema="schema"
      :initial-value="initialValue"
      :fn="func"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
  </div>
</template>
