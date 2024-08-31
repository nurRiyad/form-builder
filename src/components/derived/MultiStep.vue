<script lang="ts" setup>
import type { MultiStepForm } from '@/types/schema'
import SingleStep from './SingleStep.vue'
import { computed } from 'vue'

const props = defineProps<{
  activeStep: number
  ui: MultiStepForm
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const activeSingleStep = computed(() => {
  const atv = props.ui.step.find((st, idx) => {
    if (idx === props.activeStep) return st
  })

  if (atv) return atv
  else return props.ui.step.at(0)
})
</script>

<template>
  <template v-if="activeSingleStep">
    <SingleStep
      :ui="activeSingleStep"
      :schema="schema"
      :initial-value="initialValue"
      :fn="fn"
      :set-value="setValue"
      :delete-value="deleteValue"
    />
  </template>
  <div v-else>
    <h1>No Proper Single Step found</h1>
  </div>
</template>
