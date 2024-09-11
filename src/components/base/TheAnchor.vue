<script lang="ts" setup>
import type { Anchor } from '@/types/schema'
import { ref } from 'vue'
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
</script>

<template>
  <div>
    <a class="p-2 block underline" :href="value">{{ element.label }}</a>
  </div>
</template>
