<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { ref } from 'vue'

defineProps<{ element: Input }>()

const value = ref('')
</script>

<template>
  <input type="text" v-model="value" class="border border-black" />
</template>
