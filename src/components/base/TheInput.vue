<script lang="ts" setup>
import lodash from 'lodash'
import type { Input } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: Input
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  getValue?: (path: string) => unknown
  deleteValue?: (key: string) => void
}>()

const wholeSchema = inject('schema')

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(
  props.element.init,
  props.element.schema,
  props.func,
  props.items
)
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

// create computed to watch the changes
const watchedValue = computed(() => {
  if (props.element.watcher?.paths) {
    let val = ''
    props.element.watcher.paths.forEach((path) => {
      if (props.getValue) {
        const tmp = props.getValue(path)
        if (tmp) val += String(tmp)
      }
    })
    return val
  } else return ''
})

// fire when watch changes
watch(watchedValue, () => {
  if (props.element.watcher?.func) {
    const fName = props.element.watcher.func
    const val = props.func[fName]()
    value.value += val
  }
})

//element level data fetching
const inInputFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    inInputFetching.value = true
    const fName = props.element.loader
    componentData.input = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  inInputFetching.value = false
}
fetchData()

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
  <div v-if="inInputFetching">
    <h1>This input element is loading...</h1>
  </div>
  <div class="flex flex-col space-y-2">
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
