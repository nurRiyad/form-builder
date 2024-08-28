<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Input
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

//element level data fetching
const inInputFetching = ref(false)
const fetchData = async () => {
  if (!props?.element?.fetch) return
  try {
    inInputFetching.value = true
    await props.func[props.element.fetch]()
  } catch (error) {
    console.error(error)
  }
  inInputFetching.value = false
}
fetchData()

onUnmounted(() => {
  props.deleteValue(props.element.schema)
})
</script>

<template>
  <div v-if="inInputFetching">
    <h1>This input element is loading...</h1>
  </div>
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
