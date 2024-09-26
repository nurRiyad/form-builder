<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import { defineAsyncComponent } from 'vue'

const TheInput = defineAsyncComponent(() => import('../../base/TheInput.vue'))
const SelectSingle = defineAsyncComponent(() => import('../../base/SelectSingle.vue'))
const TextArea = defineAsyncComponent(() => import('../../base/TextArea.vue'))
const CheckBox = defineAsyncComponent(() => import('../../base/CheckBox.vue'))
const TheRadio = defineAsyncComponent(() => import('../../base/TheRadio.vue'))

const props = defineProps<{
  element: BaseElement
  fn?: any
  items: string
  setValue: (val: any, items?: string) => void
  deleteValue: (key: string) => void
  getValue: (items: string) => any
}>()

const handleDelete = () => {
  if (props.items) props.deleteValue(props.items)
}
</script>

<template>
  <div class="is-flex is-fullwidth gap-16">
    <TheInput
      v-if="element.type === 'input'"
      class="is-fullwidth"
      :element="element"
      :items="items"
      :temp-value="getValue(items)"
      :set-value="setValue"
    />
    <SelectSingle
      class="is-fullwidth"
      v-if="element.type === 'select'"
      :element="element"
      :items="items"
      :temp-value="getValue(items)"
      :set-value="setValue"
    />
    <TheRadio
      class="is-fullwidth"
      v-if="element.type === 'radio'"
      :element="element"
      :items="items"
      :temp-value="getValue(items)"
      :set-value="setValue"
    />
    <CheckBox
      class="is-fullwidth"
      v-if="element.type === 'checkbox'"
      :element="element"
      :items="items"
      :temp-value="getValue(items)"
      :set-value="setValue"
    />
    <TextArea
      class="is-fullwidth"
      v-if="element.type === 'textarea'"
      :element="element"
      :items="items"
      :temp-value="getValue(items)"
      :set-value="setValue"
    />
    <button @click="handleDelete" class="button ac-button is-danger is-light" title="Delete">
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
