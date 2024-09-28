<script setup lang="ts">
import FormBuilder from '@/components/FormBuilder.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const formId = route.params.formId as string

const uiData = ref<any>({
  ui: {},
  schema: {},
  value: {},
  js: {}
})

const isLoading = ref(false)
const loadData = async () => {
  try {
    isLoading.value = true

    const ui = await import(`../forms/${formId}/create-ui.json`)
    const schema = await import(`../forms/${formId}/schema.json`)
    const value = await import(`../forms/${formId}/values.json`)
    const func = await import(`../forms/${formId}/function.js`)

    uiData.value.ui = ui.default
    uiData.value.schema = schema.default
    uiData.value.value = value.default
    uiData.value.js = func.useFunc
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}

loadData()

const handleSubmit = (val: any) => {
  console.log(val)
}
</script>

<template>
  <div v-if="isLoading">Form Loading</div>
  <FormBuilder
    v-else
    :ui="uiData.ui"
    :initial-value="uiData.value"
    :schema="uiData.schema"
    :logic="uiData.js"
    @on-submit="handleSubmit"
  />
</template>
