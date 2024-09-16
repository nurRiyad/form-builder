<script lang="ts" setup>
import lodash from 'lodash'
import type { Input } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { useWatchers } from '@/composables/watcher'

const props = defineProps<{
  element: Input
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
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

const calculateInputType = computed(() => {
  let path = props.element.schema
  path = `${path.replace('schema/', '')}`
  path = path.replaceAll('/', '.')
  const typePath = `${path}.type`
  const formatPath = `${path}.format`
  const type = lodash.get(wholeSchema, typePath)
  const format = lodash.get(wholeSchema, formatPath)
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
  <div class="flex flex-col space-y-2" :class="$attrs.class">
    <label :for="element.label">{{ element.label }}</label>
    <input
      :id="element.label"
      :name="element.label"
      :type="calculateInputType"
      v-model="value"
      class="border border-black"
    />
  </div>
</template>
