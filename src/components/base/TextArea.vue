<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useValidate } from '@/composables/validation'

const props = defineProps<{
  element: TextArea
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
const value = ref(initValue)

//validation
const { calValidation, showGblError } = useValidate()
const errMsg = ref('')
const showErr = ref(false)

// update model value
watchDebounced(
  value,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)

    // validation fire
    calValidation(props.element, n, errMsg)
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
    <p v-if="(showGblError || showErr) && errMsg" class="text-red-600 pb-3">{{ errMsg }}</p>
  </div>
</template>
