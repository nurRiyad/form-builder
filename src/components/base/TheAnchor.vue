<script lang="ts" setup>
import type { Anchor } from '@/types/schema'
import { computed, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'

const props = defineProps<{
  element: Anchor
  func?: any
  items?: string
  tempValue?: any
  parentData?: any
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
const value = ref(initValue)
</script>

<template>
  <div v-if="isLoading">
    <p>Anchor data fetching</p>
  </div>
  <div v-else>
    <a class="p-2 block underline" :href="value">{{ element.label }}</a>
  </div>
</template>
