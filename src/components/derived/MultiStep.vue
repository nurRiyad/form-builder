<script lang="ts" setup>
import type { MultiStepForm } from '@/types/schema'
import { defineAsyncComponent, ref } from 'vue'

const SingleStep = defineAsyncComponent(() => import('./SingleStep.vue'))

const props = defineProps<{
  activeStep: number
  ui: MultiStepForm
  schema: any
  initialValue: any
  fn?: any
  setValue: (path: string, val: any, items?: string) => void
  getValue: (path: string) => unknown
  deleteValue: (key: string) => void
}>()

//single step form level data fetching
const isMSFetching = ref(false)
let componentData: Record<string, unknown> = {}
const fetchData = async () => {
  if (!props.ui.loader) return
  try {
    isMSFetching.value = true
    const fnName = props.ui.loader
    componentData = await props.fn[fnName]()
  } catch (error) {
    console.error(error)
  }
  isMSFetching.value = false
}
fetchData()
</script>

<template>
  <div v-if="isMSFetching">
    <h1>MultiStepForm data fetching</h1>
  </div>
  <div v-else>
    <template v-for="(item, idx) in ui.step" :key="idx + item.label">
      <SingleStep
        v-show="idx === activeStep"
        :ui="item"
        :schema="schema"
        :initial-value="initialValue"
        :fn="fn"
        :parent-data="componentData"
        :set-value="setValue"
        :get-value="getValue"
        :delete-value="deleteValue"
      />
    </template>
  </div>
</template>
