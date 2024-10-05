<script lang="ts" setup>
import TheTrash from '@/components/icons/TheTrash.vue'
import { useLabel } from '@/composables/labelInput'
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
  //update labels
})

watch(key, (n, o) => {
  props.deleteValue(o)
  props.setValue(n, value.value)
})

// input label
const { isLabelHoisted: isKeyHoist, hoist: keyHoist, unHoist: keyUnHoist } = useLabel(key)
const { isLabelHoisted: isValueHoist, hoist: valueHoist, unHoist: valueUnHoist } = useLabel(value)
</script>

<template>
  <div class="is-flex is-fullwidth items-baseline gap-16">
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label
        for="key"
        class="ac-label"
        :class="{ 'show-label': isKeyHoist }"
        @click="isKeyHoist = true"
      >
        Key
      </label>
      <input
        v-model="key"
        type="text"
        name="key"
        id="key"
        class="border border-black"
        @focus="keyHoist"
        @focusout="keyUnHoist"
      />
    </div>
    <div class="ac-single-input is-extra-small is-fullwidth">
      <label
        class="ac-label"
        for="value"
        :class="{ 'show-label': isValueHoist }"
        @click="isValueHoist = true"
      >
        Value
      </label>
      <input
        v-model="value"
        type="text"
        name="value"
        id="value"
        class="border border-black"
        @focusout="valueUnHoist"
        @focus="valueHoist"
      />
    </div>
    <button @click="handleDelete" class="button ac-button is-danger is-light">
      <span class="icon is-small">
        <TheTrash />
      </span>
    </button>
  </div>
</template>
