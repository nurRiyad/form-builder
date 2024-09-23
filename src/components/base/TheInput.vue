<script lang="ts" setup>
import get from 'lodash.get'
import type { Input } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { useWatchers } from '@/composables/watcher'
import { useValidate } from '@/composables/validation'

const props = defineProps<{
  element: Input
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
  showStar?: boolean
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

// fire when watch dependency changes
useWatchers(props.element.watcher, cData, value)

const calculateInputType = computed(() => {
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
  <div class="ac-single-input is-small" :class="$attrs.class">
    <label
      @click="isLabelHoisted = true"
      class="ac-label"
      :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
      :for="element.label"
    >
      {{ element.label }} <span v-if="showStar" class="is-required"> * </span>
    </label>
    <input
      :id="element.label"
      :name="element.label"
      :type="calculateInputType"
      v-model="value"
      @input="showErr = true"
      @focus="isLabelHoisted = true"
      @focusout="isLabelHoisted = false"
      class="ac-input"
    />
    <p v-if="(showGblError || showErr) && errMsg" class="text-red-600 pb-3">{{ errMsg }}</p>
  </div>
</template>
