<script lang="ts" setup>
import type { Anchor } from '@/types/schema'
import { ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: Anchor
  func?: any
  items?: string
  parentData?: any
}>()

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(
  props.element.init,
  props.element.schema,
  props.func,
  props.items
)

const value = ref(initValue)

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
