<script lang="ts" setup>
import TheTrash from '@/components/icons/TheTrash.vue'
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
  <div class="is-flex is-fullwidth items-baseline gap-16">
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label for="key" class="ac-label">Key </label>
      <input v-model="key" type="text" name="key" id="key" class="border border-black" />
    </div>
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label class="ac-label" for="value"> Value </label>
      <input v-model="value" type="text" name="value" id="value" class="border border-black" />
    </div>
    <button @click="handleDelete" class="button ac-button is-danger is-light">
      <span class="icon is-small">
        <TheTrash />
      </span>
    </button>
  </div>
</template>
