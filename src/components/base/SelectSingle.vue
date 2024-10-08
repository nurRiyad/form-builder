<script lang="ts" setup>
import type { Select } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { get } from '@/utils/lodash'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useBaseValidity } from '@/composables/validation'
import { useLabel } from '@/composables/labelSelect'
import CrossIcon from '../icons/TheCross.vue'
import ArrowIcon from '../icons/TheArrow.vue'
import ExclamationTriangle from '../icons/ExclamationTriangle.vue'

const props = defineProps<{
  element: Select
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

//validation
const { err, showStar } = useBaseValidity(props.element, value, props.parentErr)

const {
  isOpen,
  isLabelHoisted,
  isDisable,
  searchText,
  searchInput,
  selectBox,
  onLabelClick,
  selectClick,
  handleClear
} = useLabel(value, props.element)

const options = computed(() => {
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

// filter options based on search text
const filteredOptions = computed(() => {
  if (searchText.value) {
    return options.value.filter((op) => op.name.includes(searchText.value))
  } else return options.value || []
})

// selected value name
const selectedValueName = computed(() => options.value.find((op) => op.value === value.value))

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
  <template v-else>
    <div
      ref="selectBox"
      class="ac-single-input is-small is-selectbox"
      :class="{ 'is-open': isOpen, 'is-disabled': isDisable }"
      :style="[isOpen ? { 'z-index': 99 } : '']"
    >
      <label
        for="custom-select"
        class="ac-label"
        :class="{ 'show-label': isLabelHoisted || isOpen }"
        @click="selectClick"
      >
        {{ element.label }} <span v-if="showStar" class="is-required"> * </span>
      </label>

      <input
        v-if="isOpen"
        v-model="searchText"
        type="text"
        ref="searchInput"
        placeholder="Select One"
        @click="selectClick"
      />

      <p v-else class="custom-select-placeholder" @click="selectClick">
        <span class="is-ellipsis-1">{{ selectedValueName?.name }}</span>
      </p>

      <!-- Select box actions -->
      <div class="buttons">
        <button class="button ac-button is-white" @click="handleClear">
          <CrossIcon />
        </button>
        <button class="button ac-button is-white" @click="isOpen = !isOpen">
          <ArrowIcon :direction="isOpen ? 'down' : 'up'" />
        </button>
      </div>

      <!-- Options -->
      <ul class="options">
        <template v-for="op in filteredOptions" :key="op.value">
          <li @click="onLabelClick(op.value)" :class="{ 'is-active': value === op.value }">
            <label for="opt-one">{{ op.name }}</label>
          </li>
        </template>
        <li v-if="filteredOptions.length <= 0" class="is-disabled">
          <label>No element found. Consider changing the search text</label>
        </li>
      </ul>
      <p v-if="err" class="has-text-danger is-flex gap-4 mt-2">
        <span class="width-16 is-flex"> <ExclamationTriangle /></span>
        <span>{{ err }}</span>
      </p>
    </div>
  </template>
</template>
