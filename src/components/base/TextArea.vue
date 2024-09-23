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
  showStar?: boolean
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
const isLabelHoisted = ref(false)

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

    //update labels
    isLabelHoisted.value = true
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
  <div v-else class="ac-single-input">
    <label
      :for="element.label"
      @click="isLabelHoisted = true"
      class="ac-label"
      :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
    >
      <span>{{ element.label }}</span>
      <span v-if="showStar" class="is-required"> * </span>
    </label>
    <textarea
      :id="element.label"
      :name="element.label"
      rows="4"
      cols="50"
      v-model="value"
      ef="acInput"
      data-testid="ac-input-text"
      class="ac-input"
      @input="showErr = true"
      @focus="isLabelHoisted = true"
      @focusout="isLabelHoisted = false"
    ></textarea>
    <p v-if="(showGblError || showErr) && errMsg" class="has-text-danger">{{ errMsg }}</p>
  </div>
</template>
