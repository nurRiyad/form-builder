<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useBaseValidity } from '@/composables/validation'

import ExclamationTriangle from '../icons/ExclamationTriangle.vue'

const props = defineProps<{
  element: CheckBox
  func?: any
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
  parentErr?: (val: number) => void
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

//validation
const { err, showLocalErr } = useBaseValidity(props.element, checked, props.parentErr)

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
  <div v-else class="is-flex is-flex-direction-column gap-8">
    <label class="ac-checkbox" :for="String(element.label) + String(items)">
      <input
        type="checkbox"
        :id="String(element.label) + String(items)"
        :name="element.label"
        v-model="checked"
        @input="showLocalErr = true"
      />
      <span class="checkmark"></span>
      <span>{{ element.label }}</span>
    </label>

    <p v-if="err" class="has-text-danger shake is-flex gap-4 mt-2">
      <span class="width-16 is-flex"> <ExclamationTriangle /></span>
      <span>{{ err }}</span>
    </p>
  </div>
</template>
