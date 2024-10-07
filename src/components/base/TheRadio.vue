<script lang="ts" setup>
import type { Radio } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useBaseValidity } from '@/composables/validation'

import ExclamationTriangle from '../icons/ExclamationTriangle.vue'

const props = defineProps<{
  element: Radio
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

//validation
const { err } = useBaseValidity(props.element, picked, props.parentErr)

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
  <div v-else>
    <h6 class="mb-8">{{ element.label }}</h6>
    <div v-for="op in fOptions" :key="op.value" class="ac-radio">
      <input
        v-model="picked"
        type="radio"
        class="is-checkradio"
        :id="String(op.value) + String(items)"
        :name="element.label"
        :value="op.value"
      />
      <label :for="String(op.value) + String(items)">{{ op.name }}</label>
    </div>
    <p v-if="err" class="has-text-danger shake is-flex gap-4 mt-2">
      <span class="width-16 is-flex"> <ExclamationTriangle /></span>
      <span>{{ err }}</span>
    </p>
  </div>
</template>
