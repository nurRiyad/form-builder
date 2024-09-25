<script lang="ts" setup>
import { useLoader } from '@/composables/loader'
import type { IfType, SingleStepForm } from '@/types/schema'
import { computed, inject, toRaw, unref } from 'vue'

import AllElement from './helper/AllElement.vue'

const props = defineProps<{
  ui: SingleStepForm
  parentData?: any
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
</script>

<template>
  <div>
    <div v-if="isLoading">
      <h1>Single Step Form Loading</h1>
    </div>
    <div v-else class="flex flex-col space-y-4">
      <p v-if="ui.label" class="font-semibold text-xl text-center">{{ ui.label }}</p>
      <template v-for="el in ui.elements" :key="el.label">
        <AllElement :c-data="cData" :el="el" v-if="checkIf(el.if)" />
      </template>
    </div>
  </div>
</template>
