<script lang="ts" setup>
import type { Select } from '@/types/schema'
import { computed, inject, onUnmounted, ref, toRaw, unref, watch } from 'vue'
import lodash from 'lodash'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: Select

  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any) => void
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

watch(
  value,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
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

//element level data fetching
const isDataFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isDataFetching.value = true
    const fName = props.element.loader
    componentData.select = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  isDataFetching.value = false
}
fetchData()

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isDataFetching">
    <p>Data fetching</p>
  </div>
  <div v-else class="flex flex-col space-y-2">
    <label :for="element.label">{{ element.label }}</label>
    <select :name="element.label" :id="element.label" v-model="value">
      <option v-for="val in fOptions" :key="val.value" :value="val.value">
        {{ val.name }}
      </option>
    </select>
  </div>
</template>
