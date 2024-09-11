<script lang="ts" setup>
import type { Anchor } from '@/types/schema'
import { ref, toRaw, unref } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Anchor
  initialValue: any
  wholeSchema: any
  func?: any
  items?: string
  parentData?: any
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
    return getValueFromModel()
  }
}

const value = ref(calculateInitValue())

//element level data fetching
const isDataFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isDataFetching.value = true
    const fName = props.element.loader
    componentData.anchor = await props.func[fName]()
  } catch (error) {
    console.error(error)
  }
  isDataFetching.value = false
}
fetchData()
</script>

<template>
  <div v-if="isDataFetching">
    <p>Anchor data fetching</p>
  </div>
  <div v-else>
    <a class="p-2 block underline" :href="value">{{ element.label }}</a>
  </div>
</template>
