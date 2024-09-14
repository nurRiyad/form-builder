<script lang="ts" setup>
import type { Radio } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  element: Radio
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
}>()

//element level data fetching
const { data, isLoading, loadData } = useLoader()
loadData(props.element.loader)
const cData = computed(() => {
  return {
    ...toRaw(unref(props.parentData)),
    input: toRaw(unref(data))
  }
})

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(props.element, cData.value, props.items)
const picked = ref(initValue)

// update model value
watchDebounced(
  picked,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)
  },
  { immediate: true, debounce: 0 }
)

// clean on unmounted
onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
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
  <div v-if="isLoading">
    <p>Is Radio data fetching</p>
  </div>
  <div v-else class="flex flex-col space-y-2">
    <p>{{ element.label }}</p>
    <div v-for="op in fOptions" :key="op.value" class="space-x-2">
      <input type="radio" :id="op.value" :name="element.label" :value="op" v-model="picked" />
      <label :for="op.value">{{ op.name }}</label>
    </div>
  </div>
</template>
