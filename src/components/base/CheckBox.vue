<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { onUnmounted, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: CheckBox
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

const checked = ref(initValue)

watch(
  checked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

//element level data fetching
const isCheckboxFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isCheckboxFetching.value = true
    const fName = props.element.loader
    componentData.checkbox = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  isCheckboxFetching.value = false
}
fetchData()

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isCheckboxFetching">
    <p>Check is fetching</p>
  </div>
  <div v-else class="flex items-center space-x-3">
    <input type="checkbox" :id="element.label" :name="element.label" v-model="checked" />
    <label :for="element.label">{{ element.label }}</label>
  </div>
</template>
