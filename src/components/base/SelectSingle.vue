<script lang="ts" setup>
import type { Select } from '@/types/schema'
import { computed, onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Select
  initialValue: any
  wholeSchema: any
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

const fOptions = computed(() => {
  let ops = []
  if (props.element.options) {
    ops = props.element.options
  } else {
    let path = props.element.schema
    path = `${path.replace('schema/', '')}`
    path = path.replaceAll('/', '.')
    const enumPath = `${path}.enum`
    ops = (lodash.get(props.wholeSchema, enumPath) || []) as Array<string>
  }
  return ops.map((op) => {
    if (typeof op === 'string') {
      return { name: op, value: op }
    } else return op
  })
})
</script>

<template>
  <label :for="element.label">{{ element.label }}</label>
  <select :name="element.label" :id="element.label" v-model="value">
    <option v-for="val in fOptions" :key="val.value" :value="val.value">
      {{ val.name }}
    </option>
  </select>
</template>
