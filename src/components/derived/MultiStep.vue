<script lang="ts" setup>
import type { MultiStepForm } from '@/types/schema'
import SingleStep from './SingleStep.vue'

defineProps<{
  activeStep: number
  ui: MultiStepForm
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()
</script>

<template>
  <template v-for="(item, idx) in ui.step" :key="idx + item.label">
    <SingleStep
      v-show="idx === activeStep"
      :ui="item"
      :schema="schema"
      :initial-value="initialValue"
      :fn="fn"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
  </template>
</template>
