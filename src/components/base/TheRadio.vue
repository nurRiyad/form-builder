<script lang="ts" setup>
import type { Radio } from '@/types/schema'
import { computed, onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Radio
  initialValue: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const init = lodash.get(props.initialValue, props.element.schema)
const picked = ref(init)

watch(
  picked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

onUnmounted(() => {
  props.deleteValue(props.element.schema)
})

const fOptions = computed(() => {
  const ops = props.element.options || []
  return ops.map((op) => {
    if (typeof op === 'string') {
      return { name: op, value: op }
    } else return op
  })
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <p>{{ element.label }}</p>
    <div v-for="op in fOptions" :key="op.value" class="space-x-2">
      <input type="radio" :id="op.value" :name="element.label" :value="op" v-model="picked" />
      <label :for="op.value">{{ op.name }}</label>
    </div>
  </div>
</template>
