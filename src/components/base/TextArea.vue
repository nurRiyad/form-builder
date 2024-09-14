<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { onUnmounted, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: TextArea
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any) => void
  deleteValue?: (key: string) => void
}>()

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(
  props.element.init,
  props.element.schema,
  props.func,
  props.items
)

const value = ref(initValue)

watch(
  value,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

//element level data fetching
const isDataFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isDataFetching.value = true
    const fName = props.element.loader
    componentData.textarea = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  isDataFetching.value = false
}
fetchData()

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isDataFetching">
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
