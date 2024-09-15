<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  element: CheckBox
  func?: any
  items?: string
  tempValue?: any
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
const initValue =
  props.items === undefined ? calculateInitValue(props.element, cData.value) : props.tempValue
const checked = ref(initValue)

// update model value
watchDebounced(
  checked,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)
  },
  { immediate: true, debounce: 0 }
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
  <div v-if="isLoading">
    <p>Check is fetching</p>
  </div>
  <div v-else class="flex items-center space-x-3">
    <input type="checkbox" :id="element.label" :name="element.label" v-model="checked" />
    <label :for="element.label">{{ element.label }}</label>
  </div>
</template>
