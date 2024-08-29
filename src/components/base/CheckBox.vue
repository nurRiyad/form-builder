<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: CheckBox
  initialValue: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const init = lodash.get(props.initialValue, props.element.schema)
const checked = ref(init)

watch(
  checked,
  (n) => {
    console.log(n)
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

onUnmounted(() => {
  props.deleteValue(props.element.schema)
})
</script>

<template>
  <div class="flex items-center space-x-3">
    <input type="checkbox" :id="element.label" :name="element.label" v-model="checked" />
    <label :for="element.label">{{ element.label }}</label>
  </div>
</template>
