<script lang="ts" setup>
import type { ArrayInput } from '@/types/schema'
import { defineAsyncComponent, ref } from 'vue'

const ArrayItem = defineAsyncComponent(() => import('../derived/ArrayItem.vue'))

defineProps<{
  ui: ArrayInput
  schema: any
  initialValue: any
  func?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const showForm = ref(false)
</script>

<template>
  <div>
    <div class="flex justify-between my-2">
      <h1>{{ ui.label }}</h1>
      <button @click="showForm = true" class="px-2 py-1 bg-blue-400">Add new</button>
    </div>
    <div>
      <h1>List 1</h1>
      <h1>List 2</h1>
    </div>
    <div class="my-2 p-4 border flex flex-col space-y-2" v-if="showForm">
      <ArrayItem
        :elements="ui.elements"
        :schema="schema"
        :initial-value="initialValue"
        :fn="func"
        :set-value="setValue"
        :delete-value="deleteValue"
      />
      <button @click="showForm = false" class="px-2 py-1 bg-blue-400">Save</button>
    </div>
  </div>
</template>
