<script lang="ts" setup>
import type { BaseElement } from '@/types/schema'
import TheInput from '../base/TheInput.vue'
import SelectSingle from '../base/SelectSingle.vue'
import TheRadio from '../base/TheRadio.vue'
import TextArea from '../base/TextArea.vue'

defineProps<{
  elements: Array<BaseElement>
  showSubmit: boolean
}>()
</script>

<template>
  <div class="flex flex-col max-w-3xl mx-auto space-y-10">
    <template v-for="el in elements" :key="el.label">
      <TheInput v-if="el.type === 'input'" :element="el" />
      <SelectSingle v-else-if="el.type === 'select'" :element="el" />
      <TheRadio v-else-if="el.type === 'radio'" :element="el" />
      <TextArea v-else-if="el.type === 'textarea'" :element="el" />
    </template>
    <button v-if="showSubmit" class="bg-sky-500 mt-5 py-2 px-3 rounded-sm disabled:bg-gray-400">
      Submit
    </button>
  </div>
</template>
