<script lang="ts" setup>
import type { Input } from '@/types/schema'
import { computed, onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Input
  initialValue: any
  wholeSchema: any
  requiredField: boolean
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
const errorMessage = ref('')

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

watch(
  props,
  () => {
    if (!value.value && props.element.required && props.requiredField) {
      errorMessage.value = 'This Field is Required'
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div v-if="inInputFetching">
    <h1>This input element is loading...</h1>
  </div>

  <div class="flex flex-col space-y-2">
    <label :for="element.label">
      <span v-if="element.required" class="text-red-500">*</span>
      {{ element.label }}
    </label>
    <input
      :id="element.label"
      :name="element.label"
      :type="calculateInputType"
      v-model="value"
      @focusin="errorMessage = ''"
      class="border border-black"
    />
  </div>
  <div
    v-if="(requiredField && !value && element.required) || errorMessage !== ''"
    class="text-red-700 px-4 rounded relative"
    role="alert"
  >
    <span class="block sm:inline">{{ errorMessage }}</span>
  </div>
</template>
