<script lang="ts" setup>
import TheGuru from '@/components/TheGuru.vue'
import { ui, model, language } from '@/form/SingleStep'
import { useCheck } from '@/composables/check'
</script>

<template>
  <TheGuru :ui="ui" :initial-value="model" :logic="useCheck" :language="language" />
</template>
