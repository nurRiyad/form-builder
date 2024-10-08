<script lang="ts" setup>
import { useLoader } from '@/composables/loader'
import type { MultiStepForm } from '@/types/schema'

import SingleStep from './SingleStep.vue'

const props = defineProps<{
  activeStep: number
  ui: MultiStepForm
  parentErr: (val: number) => void
}>()

const { loadData, data, isLoading } = useLoader()
loadData(props.ui.loader)
</script>

<template>
  <div v-if="isLoading">
    <h1>MultiStepForm data fetching</h1>
  </div>
  <div v-else>
    <template v-for="(item, idx) in ui.step" :key="idx + item.label">
      <SingleStep
        v-show="idx === activeStep"
        :ui="item"
        :parent-data="data"
        :is-active="idx === activeStep"
        :parent-err="parentErr"
      />
    </template>
  </div>
</template>
