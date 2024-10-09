<script lang="ts" setup>
import type { TextArea } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useBaseValidity } from '@/composables/validation'
import { useLabel } from '@/composables/labelInput'

import ExclamationTriangle from '../icons/ExclamationTriangle.vue'

const props = defineProps<{
  element: TextArea
  func?: any
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
  showStar?: boolean
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

// input label
const { isLabelHoisted, isDisable, hoist, unHoist } = useLabel(value, props.element)

//validation
const { err, showStar, showLocalErr } = useBaseValidity(props.element, value, props.parentErr)

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
  <div v-else class="ac-single-input" :class="[{ 'is-disabled': isDisable }, $attrs.class]">
    <label
      class="ac-label"
      :for="element.label"
      :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
      @click="isLabelHoisted = true"
    >
      <span>{{ element.label }}</span>
      <span v-if="showStar" class="is-required"> * </span>
    </label>
    <textarea
      v-model="value"
      class="ac-input"
      rows="4"
      cols="50"
      data-testid="textarea"
      :id="element.label"
      :name="element.label"
      :disabled="isDisable"
      @input="showLocalErr = true"
      @focus="hoist"
      @focusout="unHoist"
    ></textarea>
    <p v-if="err" class="has-text-danger is-flex gap-4 mt-2">
      <span class="width-16 is-flex"> <ExclamationTriangle /></span>
      <span>{{ err }}</span>
    </p>
  </div>
</template>
