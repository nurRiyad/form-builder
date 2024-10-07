<script lang="ts" setup>
import { get } from '@/utils/lodash'
import type { Input } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { useWatchers } from '@/composables/watcher'
import { useBaseValidity } from '@/composables/validation'
import { useLabel } from '@/composables/labelInput'
import TheEye from '../icons/TheEye.vue'
import EyeSlash from '../icons/EyeSlash.vue'
import ExclamationTriangle from '../icons/ExclamationTriangle.vue'

const props = defineProps<{
  element: Input
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

// fire when watch dependency changes
useWatchers(props.element.watcher, cData, value)

// input label
const { isLabelHoisted, isDisable, hoist, unHoist } = useLabel(value, props.element)
const showPassword = ref(false)

//validation
const { err, showStar, showLocalErr } = useBaseValidity(props.element, value, props.parentErr)

const inputType = computed(() => {
  let path = props.element.schema
  path = `${path.replace('schema/', '')}`
  path = path.replaceAll('/', '.')
  const typePath = `${path}.type`
  const formatPath = `${path}.format`
  const type = get(wholeSchema, typePath)
  const format = get(wholeSchema, formatPath)
  if (type === 'integer') return 'number'
  else if (type === 'string' && format === 'password') return 'password'
  return 'text'
})

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isLoading">
    <h1>This input element is loading...</h1>
  </div>
  <div
    v-else
    class="ac-single-input is-small is-fullwidth"
    :class="[{ 'is-disabled': isDisable }, $attrs.class]"
  >
    <label
      class="ac-label"
      :class="{ 'show-label': isLabelHoisted }"
      :for="element.label"
      @click="hoist"
    >
      {{ element.label }} <span v-if="showStar" class="is-required"> * </span>
    </label>
    <input
      v-model="value"
      class="ac-input"
      :id="element.label"
      :name="element.label"
      :type="showPassword ? 'text' : inputType"
      :disabled="isDisable"
      @input="showLocalErr = true"
      @focus="hoist"
      @focusout="unHoist"
    />
    <span v-if="inputType === 'password'" class="eye" data-testid="ac-input-text-hide-value">
      <i v-if="showPassword" @click="showPassword = false" class="fa is-flex"><EyeSlash /></i>
      <i v-else class="fa is-flex" @click="showPassword = true"><TheEye /></i>
    </span>
    <p v-if="err" class="has-text-danger shake is-flex gap-4 mt-2">
      <span class="width-16 is-flex"> <ExclamationTriangle /></span>
      <span>{{ err }}</span>
    </p>
  </div>
</template>
