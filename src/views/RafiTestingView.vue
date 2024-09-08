<script lang="ts" setup>
import FormBuilder from '@/components/FormBuilder.vue'
import mui from '../assets/form/rafi/create-ui.json'
import values from '../assets/form/rafi/values.json'
import schema from '../assets/form/rafi/schema.json'
import type { FormType } from '@/types'
import { useFunc } from '../assets/form/rafi/function'

const muiData = mui as FormType

const handleSubmit = (val: any) => {
  console.log(val)
}
</script>

<template>
  <FormBuilder :ui="muiData" :initial-value="values" :schema="schema" :logic="useFunc" @on-submit="handleSubmit" />
</template>
