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
  <div class="is-flex is-fullwidth items-baseline gap-16">
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label
        class="ac-label"
        for="key"
        :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
        >Key</label
      >
      <input v-model="key" type="text" name="key" id="key" class="border border-black" />
    </div>
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label
        class="ac-label"
        for="value"
        :class="{ 'is-required': showStar, 'show-label': isLabelHoisted }"
        >Value</label
      >
      <input v-model="value" type="text" name="value" id="value" class="border border-black" />
    </div>
    <button @click="handleDelete" class="button ac-button is-danger is-light">
      <span class="icon is-small">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </span>
    </button>
  </div>
</template>
