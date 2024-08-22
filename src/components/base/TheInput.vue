<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { ref } from 'vue'

defineProps<{ element: Input }>()

const value = ref('')
</script>

<template>
  <label :for="element.label">{{ element.label }}</label>
  <input
    :id="element.label"
    :name="element.label"
    type="text"
    v-model="value"
    class="border border-black"
  />
</template>
