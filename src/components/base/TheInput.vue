<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Input
  initialValue: any
  setValue: (path: string, val: any) => void
  func: any
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
</script>

<template>
  <div class="flex flex-col space-y-2">
    <label :for="element.label">{{ element.label }}</label>
    <input
      :id="element.label"
      :name="element.label"
      type="text"
      v-model="value"
      class="border border-black"
    />
  </div>
</template>
