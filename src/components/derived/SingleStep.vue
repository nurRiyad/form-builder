<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import TheInput from '../base/TheInput.vue'
import SelectSingle from '../base/SelectSingle.vue'

defineProps<{
  elements: Array<BaseElement>
}>()
</script>

<template>
  <div v-for="el in elements" :key="el.label">
    <TheInput v-if="el.type === 'input'" :element="el" />
    <SelectSingle v-else-if="el.type === 'select'" :element="el" />
  </div>
</template>
