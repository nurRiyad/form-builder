<script lang="ts" setup>
import type { Select } from '@/types/schema'

defineProps<{
  element: Select
}>()
</script>

<template>
  <label :for="element.label">{{ element.label }}</label>

  <select :name="element.label" :id="element.label">
    <option v-for="val in element.options" :key="String(val)" :value="val">{{ val }}</option>
  </select>
</template>
