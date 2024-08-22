<script lang="ts" setup>
import type { Radio } from '@/types/schema'

defineProps<{
  element: Radio
}>()
</script>

<template>
  <p>{{ element.label }}</p>
  <template v-for="op in element.options" :key="op">
    <input type="radio" :id="op" :name="element.label" :value="op" />
    <label :for="op">{{ op }}</label>
  </template>
</template>
