<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: TextArea
  initialValue: any
  wholeSchema: any
  func?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const calculateInitValue = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const value = lodash.get(props.initialValue, path)
  return value
}
const value = ref(calculateInitValue())

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
  <div class="flex flex-col space-y-2">
    <label :for="element.label">{{ element.label }}</label>
    <textarea
      :id="element.label"
      :name="element.label"
      rows="4"
      cols="50"
      v-model="value"
    ></textarea>
  </div>
</template>
