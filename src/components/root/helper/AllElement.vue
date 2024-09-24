<script lang="ts" setup>
import { useGlobalModel } from '@/composables/model'
import type { AllElement } from '@/types'
import { defineAsyncComponent } from 'vue'

const TheInput = defineAsyncComponent(() => import('../../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../../base/SelectSingle.vue'))
const MultiSelect = defineAsyncComponent(() => import('../../base/SelectMultiple.vue'))
const TextArea = defineAsyncComponent(() => import('../../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../../base/TheRadio.vue'))
const TheSwitch = defineAsyncComponent(() => import('../../base/TheSwitch.vue'))
const TheAnchor = defineAsyncComponent(() => import('../../base/TheAnchor.vue'))
const ArrayObject = defineAsyncComponent(() => import('../../derived/ArrayObject.vue'))
const ArrayItem = defineAsyncComponent(() => import('../../derived/ArrayItem.vue'))
const TheObject = defineAsyncComponent(() => import('../../derived/TheObject.vue'))
const BlockLayout = defineAsyncComponent(() => import('../../layout/TheBlock.vue'))
const HorizontalLayout = defineAsyncComponent(() => import('../../layout/HorizonTal.vue'))

defineProps<{
  el: AllElement
  cData: any
}>()

const { setValue, deleteValue } = useGlobalModel()
</script>

<template>
  <!-- Layouts -->
  <BlockLayout v-if="el.type === 'block-layout'" :ui="el" :c-data="cData" />
  <HorizontalLayout v-else-if="el.type === 'horizontal-layout'" :ui="el" :c-data="cData" />

  <!-- Simple Element -->
  <TheInput
    v-else-if="el.type === 'input'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />
  <SelectSingle
    v-else-if="el.type === 'select'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />
  <MultiSelect
    v-else-if="el.type === 'multi-select'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />
  <TheRadio
    v-else-if="el.type === 'radio'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />
  <TheSwitch
    v-else-if="el.type === 'switch'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />
  <CheckBox
    v-else-if="el.type === 'checkbox'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />

  <TheAnchor v-else-if="el.type === 'anchor'" :element="el" :parent-data="cData" />

  <TextArea
    v-else-if="el.type === 'textarea'"
    :element="el"
    :parent-data="cData"
    :set-value="setValue"
    :delete-value="deleteValue"
  />

  <!-- Array / Object Element -->
  <ArrayObject v-else-if="el.type === 'array-object-form'" :ui="el" :parent-data="cData" />
  <ArrayItem v-else-if="el.type === 'array-item-form'" :ui="el" :parent-data="cData" />
  <TheObject v-else-if="el.type === 'object-item'" :ui="el" :parent-data="cData" />

  <!-- Default empty element -->
  <p v-else>Element type not found</p>
</template>
