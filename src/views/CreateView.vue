<script lang="ts" setup>
import TheGuru from '@/components/TheGuru.vue'
import { ui, model } from '@/form/SingleStep'
</script>

<template>
  <TheGuru :ui="ui" :initial-value="model" />
</template>
