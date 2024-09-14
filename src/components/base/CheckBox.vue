<script lang="ts" setup>
import type { CheckBox } from '@/types/schema'
import { inject, onUnmounted, ref, toRaw, unref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: CheckBox
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any) => void
  deleteValue?: (key: string) => void
}>()

const schema = inject('schema')
const initialValue = inject('initialValue')

const getValueFromModel = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties', '')
  path = path.replace('schema/', '')
  path = path.replaceAll('/', '.')

  if (path.includes('items')) {
    path = path.replace('.items', `[${props.items}]`)
  }
  const value = lodash.get(initialValue, path)
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

const checked = ref(calculateInitValue())

watch(
  checked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

//element level data fetching
const isCheckboxFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isCheckboxFetching.value = true
    const fName = props.element.loader
    componentData.checkbox = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  isCheckboxFetching.value = false
}
fetchData()

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isCheckboxFetching">
    <p>Check is fetching</p>
  </div>
  <div v-else class="flex items-center space-x-3">
    <input type="checkbox" :id="element.label" :name="element.label" v-model="checked" />
    <label :for="element.label">{{ element.label }}</label>
  </div>
</template>
