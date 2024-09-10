<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: CheckBox
  initialValue: any
  wholeSchema: any
  func?: any
  parentData?: any
  setValue: (path: string, val: any) => void
  deleteValue?: (key: string) => void
}>()

const calculateInitValue = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const value = lodash.get(props.initialValue, path)
  return value
}
const checked = ref(calculateInitValue())

watch(
  checked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div class="flex items-center space-x-3">
    <input type="checkbox" :id="element.label" :name="element.label" v-model="checked" />
    <label :for="element.label">{{ element.label }}</label>
  </div>
</template>
