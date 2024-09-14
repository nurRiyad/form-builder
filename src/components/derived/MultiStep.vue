<script lang="ts" setup>
import type { MultiStepForm } from '@/types/schema'
import { defineAsyncComponent, ref } from 'vue'

const SingleStep = defineAsyncComponent(() => import('./SingleStep.vue'))

const props = defineProps<{
  activeStep: number
  ui: MultiStepForm
  fn?: any
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
      <SingleStep v-show="idx === activeStep" :ui="item" :fn="fn" :parent-data="componentData" />
    </template>
  </div>
</template>
