<script lang="ts" setup>
import type { ObjectItem } from '@/types'
import { useLoader } from '@/composables/loader'
import { computed, initCustomFormatter, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'
import { useGlobalModel } from '@/composables/model'
import EachKey from './helper/EachKey.vue'

const props = defineProps<{
  ui: ObjectItem
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
const initValue = calculateInitValue(props.ui, cData.value) || {}

// temporary model value
const tempMode = ref(initValue)
const setValueTemp = (key: string, val: string) => {
  tempMode.value[key] = val
}
const getValueTemp = (path: string) => {
  return tempMode.value[path]
}
const deleteValueTemp = (key: string) => {
  delete tempMode.value[key]
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

// maintain unique key across the dynamic array
const idxx = ref(Object.keys(initCustomFormatter).length || 1)
const addNew = () => {
  idxx.value += 1
  tempMode.value[`temp${idxx.value}`] = ''
}
</script>

<template>
  <div>
    <template v-if="isLoading">
      <div>
        <p>object form loading</p>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-between my-2">
        <h1>{{ ui.label }}</h1>
        <button @click="addNew" class="px-2 py-1 bg-blue-400">Add new</button>
      </div>
      <div class="flex flex-col space-y-2">
        <EachKey
          v-for="(val, idx) in Object.keys(tempMode)"
          :key="String(idx) + String(idxx)"
          :ob-key="val"
          :ob-value="tempMode[val]"
          :set-value="setValueTemp"
          :get-value="getValueTemp"
          :delete-value="deleteValueTemp"
        />
      </div>
    </template>
  </div>
</template>
