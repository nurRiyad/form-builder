<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import MultiStep from './derived/MultiStep.vue'
import SingleStep from './derived/SingleStep.vue'

withDefaults(
  defineProps<{
    ui: FormType
    initialValue: any
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
    initialValue: {}
  }
)
</script>

<template>
  <MultiStep v-if="ui.type === 'multi'" :elements="ui.step" />
  <SingleStep
    v-else-if="ui.type === 'single'"
    :elements="ui.elements"
    :show-submit="true"
    :initial-value="initialValue"
  />
  <h1 v-else>No Proper Form type found</h1>
</template>
