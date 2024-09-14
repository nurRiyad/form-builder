<script lang="ts" setup>
import type { Radio } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'

const props = defineProps<{
  element: Radio
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any) => void
  deleteValue?: (key: string) => void
}>()

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(
  props.element.init,
  props.element.schema,
  props.func,
  props.items
)

const picked = ref(initValue)

watch(
  picked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

//element level data fetching
const isDataFetching = ref(false)
const componentData = { ...toRaw(unref(props.parentData)) }
const fetchData = async () => {
  if (!props?.element?.loader) return
  try {
    isDataFetching.value = true
    const fName = props.element.loader
    componentData.radio = await props.func[fName]()
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

const fOptions = computed(() => {
  const ops = props.element.options || []
  return ops.map((op) => {
    if (typeof op === 'string') {
      return { name: op, value: op }
    } else return op
  })
})
</script>

<template>
  <div v-if="isDataFetching">
    <p>Is Radio data fetching</p>
  </div>
  <div v-else class="flex flex-col space-y-2">
    <p>{{ element.label }}</p>
    <div v-for="op in fOptions" :key="op.value" class="space-x-2">
      <input type="radio" :id="op.value" :name="element.label" :value="op" v-model="picked" />
      <label :for="op.value">{{ op.name }}</label>
    </div>
  </div>
</template>
