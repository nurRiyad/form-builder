<script lang="ts" setup>
import type { Select } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Select
  initialValue: any
  func?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const init = lodash.get(props.initialValue, props.element.schema)
const value = ref(init)

watch(
  value,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

onUnmounted(() => {
  props.deleteValue(props.element.schema)
})
</script>

<template>
  <label :for="element.label">{{ element.label }}</label>
  <select :name="element.label" :id="element.label" v-model="value">
    <option v-for="val in element.options" :key="String(val)" :value="val">{{ val }}</option>
  </select>
</template>
