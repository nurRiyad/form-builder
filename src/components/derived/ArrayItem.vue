<script lang="ts" setup>
import type { ArrayItem } from '@/types'
import EachItem from './helper/EachItem.vue'
import { useLoader } from '@/composables/loader'
import { computed, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'
import { useGlobalModel } from '@/composables/model'

const props = defineProps<{
  ui: ArrayItem
  parentData?: any
}>()

//element level data fetching
const { data, isLoading, loadData } = useLoader()
loadData(props.ui.loader)
const cData = computed(() => {
  return {
    ...toRaw(unref(props.parentData)),
    input: toRaw(unref(data))
  }
})

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue = calculateInitValue(props.ui, cData.value) || []

// temporary model value
const tempMode = ref(initValue)
const setValueTemp = (path: string, val: any, items?: string) => {
  if (items) {
    tempMode.value[parseInt(items)] = val
  }
}
const getValueTemp = (items: string) => {
  return tempMode.value[parseInt(items)]
}
const deleteValueTemp = (key: string) => {
  tempMode.value.splice(parseInt(key), 1)
}

// update real model value
const { setValue } = useGlobalModel()
watch(
  tempMode,
  (n) => {
    setValue(props.ui.schema, toRaw(n))
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <template v-if="isLoading">
      <div>
        <p>Array object form loading</p>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-between my-2">
        <h1>{{ ui.label }}</h1>
        <button @click="tempMode.push('')" class="px-2 py-1 bg-blue-400">Add new</button>
      </div>
      <div class="flex flex-col space-y-2">
        <EachItem
          v-for="(val, idx) in tempMode"
          :key="String(idx) + String(tempMode.length)"
          :element="ui.element"
          :items="String(idx)"
          :set-value="setValueTemp"
          :get-value="getValueTemp"
          :delete-value="deleteValueTemp"
        />
      </div>
    </template>
  </div>
</template>
