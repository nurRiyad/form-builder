<script lang="ts" setup>
import type { ArrayItem } from '@/types'
import EachItem from './helper/EachItem.vue'
import { useLoader } from '@/composables/loader'
import { computed, ref, toRaw, unref, watch } from 'vue'
import { useInitial } from '@/composables/initial'
import { useGlobalModel } from '@/composables/global/model'

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
const deleteValueTemp = (idx: string) => {
  tempMode.value.splice(parseInt(idx), 1)
  shadowList.value.splice(parseInt(idx))
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
let shadowList = ref<Array<number>>([])
let counter = ref(1)
const addNew = () => {
  shadowList.value.push(++counter.value)
  tempMode.value.push('')
}
</script>

<template>
  <div>
    <template v-if="isLoading">
      <div>
        <p>Array object form loading</p>
      </div>
    </template>
    <template v-else>
      <div class="is-flex is-justify-content-space-between my-2">
        <h4>{{ ui.label }}</h4>
        <button @click="addNew" class="button ac-button is-primary">Add new</button>
      </div>
      <div class="is-flex is-flex-direction-column gap-8">
        <EachItem
          v-for="(val, idx) in tempMode"
          :key="String(idx) + String(shadowList[idx])"
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
