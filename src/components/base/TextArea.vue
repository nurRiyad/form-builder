<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  element: TextArea
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
const value = ref(initValue)

// update model value
watchDebounced(
  value,
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
</script>

<template>
  <div v-if="isLoading">
    <p>Textarea data fetching</p>
  </div>
  <div v-else class="flex flex-col space-y-2">
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
