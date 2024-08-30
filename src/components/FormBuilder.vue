<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import SingleStep from './derived/SingleStep.vue'

withDefaults(
  defineProps<{
    ui: FormType
    schema: any
    initialValue: any
    logic?: any
    isLoading?: boolean
  }>(),
  {
    schema: {},
    initialValue: {},
    logic: null,
    isLoading: false
  }
)
</script>

<template>
  <template v-if="isLoading">
    <h1>Form file loading</h1>
  </template>
  <template v-else>
    <SingleStep
      v-if="ui.type === 'single'"
      :ui="ui"
      :schema="schema"
      :initial-value="initialValue"
      :logic="logic"
      :show-submit="true"
    />
    <h1 v-else>No Proper Form type found</h1>
  </template>
</template>
