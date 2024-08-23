<script lang="ts" setup>
import type { Radio } from '@/types/schema'

defineProps<{
  element: Radio
}>()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <p>{{ element.label }}</p>
    <div v-for="op in element.options" :key="op" class="space-x-2">
      <input type="radio" :id="op" :name="element.label" :value="op" />
      <label :for="op">{{ op }}</label>
    </div>
  </div>
</template>
