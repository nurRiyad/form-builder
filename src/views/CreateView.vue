<script lang="ts" setup>
import FormBuilder from '@/components/FormBuilder.vue'
import ui from '../form/cred-form/create-ui.json'
import values from '../form/cred-form/values.json'
import schema from '../form/cred-form/schema.json'
import type { FormType } from '@/types'

const uiData = ui as FormType
</script>

<template>
  <FormBuilder :ui="uiData" :initial-value="values" :schema="schema" />
</template>
