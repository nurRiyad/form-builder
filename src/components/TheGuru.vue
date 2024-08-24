<script lang="ts" setup>
import type { FormType } from '@/types/schema'
import SingleStep from './derived/SingleStep.vue'

withDefaults(
  defineProps<{
    ui: FormType
    initialValue: any
    logic: any
    language: any
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
    initialValue: {},
    logic: {},
    language: {}
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
      :initial-value="initialValue"
      :logic="logic"
      :language="language"
      :show-submit="true"
    />
    <h1 v-else>No Proper Form type found</h1>
  </template>
</template>
