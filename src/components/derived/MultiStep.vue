<script lang="ts" setup>
import type { SingleStepForm } from '@/types/schema'
import SingleStep from './SingleStep.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  elements: Array<SingleStepForm>
}>()

const activeStep = ref(1)

const activeSingleStep = computed(() => {
  if (activeStep.value < 1 || activeStep.value > props.elements.length) return props.elements[0]
  else return props.elements[activeStep.value - 1]
})
</script>

<template>
  <div>
    <div class="flex space-x-4 items-center p-2 mt-5">
      <button
        class="bg-sky-500 py-2 px-3 rounded-sm disabled:bg-gray-400"
        :disabled="activeStep <= 1"
        @click="activeStep -= 1"
      >
        Prev
      </button>
      <p>{{ activeStep }}</p>
      <button
        class="bg-sky-500 py-2 px-3 rounded-sm disabled:bg-gray-400"
        :disabled="activeStep >= elements.length"
        @click="activeStep += 1"
      >
        Next
      </button>
    </div>
  </div>
</template>
