<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  obKey: string
  obValue: string | number
  setValue: (key: string, value: string | number) => void
  deleteValue: (key: string) => void
  getValue: (key: string) => any
}>()

const handleDelete = () => {
  props.deleteValue(props.obKey)
}

const key = ref(props.obKey)
const value = ref(props.obValue)
const isLabelHoisted = ref(false)

watch(value, (n) => {
  props.setValue(key.value, n)
  //update labels
  isLabelHoisted.value = true
})

watch(key, (n, o) => {
  props.deleteValue(o)
  props.setValue(n, value.value)
})
</script>

<template>
  <div class="flex w-full items-baseline space-x-4">
    <div class="ac-single-input is-extra-small">
      <label
        class="ac-label"
        for="key"
        :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
        >Key</label
      >
      <input v-model="key" type="text" name="key" id="key" class="border border-black" />
    </div>
    <div class="ac-single-input is-extra-small">
      <label
        class="ac-label"
        for="value"
        :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
        >Value</label
      >
      <input v-model="value" type="text" name="value" id="value" class="border border-black" />
    </div>
    <button @click="handleDelete" class="button ac-button is-danger">Delete</button>
  </div>
</template>
