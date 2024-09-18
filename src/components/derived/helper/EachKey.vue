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

watch(value, (n) => {
  props.setValue(key.value, n)
})

watch(key, (n, o) => {
  props.deleteValue(o)
  props.setValue(n, value.value)
})
</script>

<template>
  <div class="flex w-full items-baseline space-x-4">
    <div class="flex items-center space-x-2">
      <label for="key">Key</label>
      <input v-model="key" type="text" name="key" id="key" class="border border-black" />
    </div>
    <div class="flex items-center space-x-2">
      <label for="value">Value</label>
      <input v-model="value" type="text" name="value" id="value" class="border border-black" />
    </div>
    <button @click="handleDelete" class="bg-red-300 mt-5 py-1 px-2 rounded-sm">Delete</button>
  </div>
</template>
