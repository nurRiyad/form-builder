<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { computed, onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Input
  initialValue: any
  wholeSchema: any
  func?: any
  setValue: (path: string, val: any) => void
  deleteValue: (key: string) => void
}>()

const calculateInitValue = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties/', '.')
  path = path.replace('schema.', '')
  const value = lodash.get(props.initialValue, path)
  return value
}

const value = ref(calculateInitValue())

watch(
  value,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

//element level data fetching
const inInputFetching = ref(false)
const fetchData = async () => {
  if (!props?.element?.fetch) return
  try {
    inInputFetching.value = true
    await props.func[props.element.fetch]()
  } catch (error) {
    console.error(error)
  }
  inInputFetching.value = false
}
fetchData()

onUnmounted(() => {
  props.deleteValue(props.element.schema)
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
  <div class="single-input relative mt-4">
    <label
      :for="element.label"
      class="absolute top-2 left-3 pointer-events-none text-sm text-gray-500 transition ease-in-out duration-300 px-1 text-grey-darker"
      :class="[value ? ' -translate-y-4 text-xs bg-white' : '']"
      >{{ element.label }}</label
    >
    <input
      :id="element.label"
      :name="element.label"
      :type="calculateInputType"
      v-model="value"
      class="block w-full bg-white border h-9 border-gray-300 rounded py-2 px-4 appearance-none leading-none focus:outline-none focus:shadow-outline focus:border-none focus:shadow-none"
    />
  </div>
</template>

<style>
.single-input:focus-within label,
.single-input input:not(:placeholder-shown) + label {
  @apply -translate-y-4 text-xs bg-white;
}
</style>
