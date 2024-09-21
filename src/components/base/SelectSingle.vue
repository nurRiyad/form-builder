<script lang="ts" setup>
import type { Select } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref } from 'vue'
import lodash from 'lodash'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useValidate } from '@/composables/validation'

const props = defineProps<{
  element: Select
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

const fOptions = computed(() => {
  let ops = []
  if (props.element.options) {
    ops = props.element.options
  } else {
    let path = props.element.schema
    path = `${path.replace('schema/', '')}`
    path = path.replaceAll('/', '.')
    const enumPath = `${path}.enum`
    ops = (lodash.get(wholeSchema, enumPath) || []) as Array<string>
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
  <div v-else class="flex flex-col space-y-2">
    <label :for="element.label">{{ element.label }}</label>
    <select :name="element.label" :id="element.label" v-model="value">
      <option v-for="val in fOptions" :key="val.value" :value="val.value">
        {{ val.name }}
      </option>
    </select>
    <p v-if="(showGblError || showErr) && errMsg" class="text-red-600 pb-3">{{ errMsg }}</p>
  </div>
</template>
