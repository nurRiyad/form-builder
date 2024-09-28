<script lang="ts" setup>
import type { MultiSelect } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import get from 'lodash.get'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useBaseValidity } from '@/composables/validation'
import { useLabel } from '@/composables/label'

const props = defineProps<{
  element: MultiSelect
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
  parentErr?: (val: number) => void
}>()

const wholeSchema = inject('schema')

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
const value = ref(initValue || [])

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
const { isLabelHoisted, hoist, unHoist } = useLabel(value)

//validation
const { err, showStar } = useBaseValidity(props.element, value, props.parentErr)

const fOptions = computed(() => {
  let ops = []
  if (props.element.options) {
    ops = props.element.options
  } else {
    let path = props.element.schema
    path = `${path.replace('schema/', '')}`
    path = path.replaceAll('/', '.')
    const enumPath = `${path}.enum`
    ops = (get(wholeSchema, enumPath) || []) as Array<string>
  }
  return ops.map((op) => {
    if (typeof op === 'string') {
      return { name: op, value: op }
    } else return op
  })
})

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isLoading">
    <p>Data fetching</p>
  </div>
  <div v-else class="is-flex is-flex-direction-column gap-8">
    <label :for="element.label" class="ac-label" :class="{ 'show-label': isLabelHoisted }">
      {{ element.label }}<span v-if="showStar" class="is-required"> * </span>
    </label>
    <select
      v-model="value"
      :name="element.label"
      :id="element.label"
      @focusout="unHoist"
      @focus="hoist"
      multiple
    >
      <option v-for="val in fOptions" :key="val.value" :value="val.value">
        {{ val.name }}
      </option>
    </select>
    <p v-if="err" class="has-text-danger">{{ err }}</p>
  </div>
</template>
