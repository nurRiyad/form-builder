<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onClickOutside, useFocus } from '@vueuse/core'

import RefreshIcon from '../../icons/TheRefresh.vue'
import CrossIcon from '../../icons/TheCross.vue'
import ArrowIcon from '../../icons/TheArrow.vue'

type Option = { name: string; value: string }
interface prop {
  options?: Array<Option>
  isLoading?: boolean
  optionType?: 'simple' | 'group'
  showStar?: boolean
}

const props = withDefaults(defineProps<prop>(), {
  options: () => [],
  isLoading: false,
  optionType: 'simple',
  showStar: false
})

defineEmits(['onRefreshClick'])

const selectedValue = defineModel<string>()
const labelHoisted = ref(false)
const searchText = ref('')
const isOpen = ref(false)

// handle outside box
const selectBox = ref(null)
onClickOutside(selectBox, () => (isOpen.value = false))

// handle input click
const searchInput = ref(null)
const { focused } = useFocus(searchInput, { initialValue: true })

// filter options based on search text
const filteredOptions = computed(() => {
  if (searchText.value) {
    return props.options.filter((op) => op.name.includes(searchText.value))
  } else return props.options || []
})

// selected value name
const selectedValueName = computed(() =>
  props.options.find((op) => op.value === selectedValue.value)
)

// handle selection
const onLabelClick = (op: string) => {
  selectedValue.value = op
  isOpen.value = false
}

// handle label click
const selectClick = () => {
  isOpen.value = true
  focused.value = true
}

// handle clear btn
const handleClear = () => {
  selectedValue.value = undefined
  searchText.value = ''
}

// handle depend on selected data
watch(
  selectedValue,
  (n) => {
    if (n) labelHoisted.value = true
    else labelHoisted.value = false
  },
  { immediate: true }
)

watch(isOpen, (n) => {
  if (n) searchText.value = ''
  else {
    if (!selectedValue.value) labelHoisted.value = false
  }
})
</script>

<template>
  <div
    ref="selectBox"
    class="ac-single-input is-small is-selectbox"
    :class="{ 'is-open': isOpen, 'is-disabled': isLoading }"
    :style="[isOpen ? { 'z-index': 2 } : '']"
  >
    <label
      for="custom-select"
      class="ac-label"
      :class="{ 'show-label': labelHoisted || isOpen }"
      @click="selectClick"
    >
      Select Option <span v-if="showStar" class="is-required"> * </span>
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

    <div class="buttons">
      <button class="button ac-button is-white" @click="handleClear">
        <CrossIcon />
      </button>

      <button class="button ac-button is-white" @click="$emit('onRefreshClick')">
        <RefreshIcon :class="{ 'is-spin': isLoading }" />
      </button>

      <button class="button ac-button is-white" @click="isOpen = !isOpen">
        <ArrowIcon :direction="isOpen ? 'down' : 'up'" />
      </button>
    </div>

    <ul class="options">
      <template v-for="op in filteredOptions" :key="op.value">
        <li @click="onLabelClick(op.value)" :class="{ 'is-active': selectedValue === op.value }">
          <label for="opt-one">{{ op.name }}</label>
        </li>
      </template>
      <li v-if="filteredOptions.length <= 0" class="is-disabled">
        <label>No element found. Consider changing the search text</label>
      </li>
    </ul>
  </div>
</template>
