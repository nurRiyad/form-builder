<script lang="ts" setup>
import { useLoader } from '@/composables/loader'
import type { IfType, SingleStepForm } from '@/types/schema'
import { computed, inject, ref, toRaw, unref, watch } from 'vue'

import AllElement from './helper/AllElement.vue'

const props = defineProps<{
  ui: SingleStepForm
  isActive: boolean
  parentData?: any
  parentErr: (val: number) => void
}>()

const fn = inject<any>('func')

const { data, isLoading, loadData } = useLoader()
loadData(props.ui.loader)
const cData = computed(() => {
  return {
    multi: toRaw(unref(props.parentData)),
    single: toRaw(unref(data))
  }
})

//check condition
const checkIf = (el: IfType | undefined) => {
  if (!el || !fn) return true
  if (el.type === 'computed') {
    return fn[el.name].value
  } else {
    const split = el.name.split('|')
    const fName = split[0]
    return fn[fName]({ cdata: cData.value, params: split })
  }
}

const cntErr = ref(0)
const updateError = (val: number) => {
  cntErr.value += val
}
watch(
  () => props.isActive,
  (n) => {
    if (n) props.parentErr(cntErr.value)
  },
  { immediate: true }
)

watch(cntErr, (n, o) => {
  if (!props.isActive) return
  if (n == 0 && o > 0) props.parentErr(-1)
  if (n > 0 && o == 0) props.parentErr(1)
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      <h1>Single Step Form Loading</h1>
    </div>
    <div v-else class="is-flex is-flex-direction-column gap-8">
      <h6 class="font-semibold text-xl text-center">{{ ui.label }}</h6>
      <template v-for="el in ui.elements" :key="el.label">
        <AllElement :c-data="cData" :el="el" v-if="checkIf(el.if)" :parent-err="updateError" />
      </template>
    </div>
  </div>
</template>
