<script lang="ts" setup>
import { useLoader } from '@/composables/loader'
import { useGlobalModel } from '@/composables/model'
import type { IfType, SingleStepForm } from '@/types/schema'
import { computed, defineAsyncComponent, inject, toRaw, unref } from 'vue'

const TheInput = defineAsyncComponent(() => import('../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../base/TheRadio.vue'))
const TheSwitch = defineAsyncComponent(() => import('../base/TheSwitch.vue'))
const TheAnchor = defineAsyncComponent(() => import('../base/TheAnchor.vue'))
const ArrayObject = defineAsyncComponent(() => import('../derived/ArrayObject.vue'))

const props = defineProps<{
  ui: SingleStepForm
  parentData?: any
}>()

const { setValue, deleteValue } = useGlobalModel()

const schema = inject('schema')
const initialValue = inject('initialValue')
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
    return fn[el.name]({ cdata: cData.value })
  }
}
</script>

<template>
  <div>
    <div v-if="isLoading">
      <h1>Single Step Form Loading</h1>
    </div>
    <div v-else class="flex flex-col space-y-4">
      <p class="font-semibold text-xl text-center">{{ ui.label }}</p>
      <template v-for="el in ui.elements" :key="el.label">
        <TheInput
          v-if="el.type === 'input' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <SelectSingle
          v-else-if="el.type === 'select' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheRadio
          v-else-if="el.type === 'radio' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <TheSwitch
          v-else-if="el.type === 'switch' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />
        <CheckBox
          v-else-if="el.type === 'checkbox' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />

        <TheAnchor
          v-else-if="el.type === 'anchor' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
        />

        <TextArea
          v-else-if="el.type === 'textarea' && checkIf(el.if)"
          :element="el"
          :parent-data="cData"
          :set-value="setValue"
          :delete-value="deleteValue"
        />

        <ArrayObject
          v-if="el.type === 'array-object-form'"
          :ui="el"
          :initial-value="initialValue"
          :schema="schema"
          :parent-data="cData"
        />
      </template>
    </div>
  </div>
</template>
