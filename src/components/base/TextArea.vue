<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { ref } from 'vue'

defineProps<{ element: TextArea }>()

const value = ref('')
</script>

<template>
  <label :for="element.label">{{ element.label }}</label>
  <textarea :id="element.label" :name="element.label" rows="4" cols="50" v-model="value"></textarea>
</template>
