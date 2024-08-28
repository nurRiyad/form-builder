<script lang="ts" setup>
import TheGuru from '@/components/FormBuilder.vue'
import { ui, model, language } from '@/form/Sample1'
import { useCheck } from '@/composables/check'
</script>

<template>
  <TheGuru :ui="ui" :initial-value="model" :logic="useCheck" :language="language" />
</template>
