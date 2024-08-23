<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Input
  initialValue: any
  setValue: (path: string, val: any) => void
}>()

const init = lodash.get(props.initialValue, props.element.schema)

const value = ref(init)

/**
 1. Initial Value
    a. It can be hard coded
    b. It can be from init value
    c. It can be from a function call
  2. Update Value
    b. Send data to it's parent properly
 **/

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
