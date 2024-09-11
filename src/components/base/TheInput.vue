<script lang="ts" setup>
import lodash from 'lodash'
import type { Input } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  element: Input
  initialValue: any
  wholeSchema: any
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
}>()

const getValueFromModel = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties', '')
  path = path.replace('schema/', '')
  path = path.replaceAll('/', '.')

  if (path.includes('items')) {
    path = path.replace('.items', `[${props.items}]`)
  }
  const value = lodash.get(props.initialValue, path)
  return value
}

const calculateInitValue = () => {
  if (props?.element?.init) {
    const valType = props.element.init?.type
    if (valType === 'static') return props.element.init.value
    else {
      const fName = props.element.init.value
      return props.func[fName]()
    }
  } else {
    return getValueFromModel() || ''
  }
}

const value = ref(calculateInitValue())

watchDebounced(
  value,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)
  },
  { immediate: true, debounce: 300 }
)

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

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
const calculateInputType = computed(() => {
  let path = props.element.schema
  path = `${path.replace('schema/', '')}`
  path = path.replaceAll('/', '.')
  const typePath = `${path}.type`
  const formatPath = `${path}.format`
  const type = lodash.get(props.wholeSchema, typePath)
  const format = lodash.get(props.wholeSchema, formatPath)
  if (type === 'integer') return 'number'
  else if (type === 'string' && format === 'password') return 'password'
  return 'text'
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
