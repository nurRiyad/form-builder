<script lang="ts" setup>
import type { Radio } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useValidate } from '@/composables/validation'

const props = defineProps<{
  element: Radio
  func?: any
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
}>()

//element level data fetching
const { data, isLoading, loadData } = useLoader()
loadData(props.element.loader)
const cData = computed(() => {
  return {
    ...toRaw(unref(props.parentData)),
    input: toRaw(unref(data))
  }
})

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue =
  props.items === undefined ? calculateInitValue(props.element, cData.value) : props.tempValue
const picked = ref(initValue)

//validation
const { calValidation, showGblError } = useValidate()
const errMsg = ref('')
const showErr = ref(false)

// update model value
watchDebounced(
  picked,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)

    // validation fire
    calValidation(props.element, n, errMsg)
  },
  { immediate: true, debounce: 0 }
)

// clean on unmounted
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
  <div v-if="isLoading">
    <p>Is Radio data fetching</p>
  </div>
  <div v-else class="mb-8">
    <h6>{{ element.label }}</h6>
    <div v-for="op in fOptions" :key="op.value" class="field">
      <input
        type="radio"
        class="is-checkradio"
        :id="String(op.value) + String(items)"
        :name="element.label"
        :value="op.value"
        v-model="picked"
      />
      <label :for="String(op.value) + String(items)">{{ op.name }}</label>
    </div>
    <p v-if="(showGblError || showErr) && errMsg" class="is-danger">{{ errMsg }}</p>
  </div>
</template>
