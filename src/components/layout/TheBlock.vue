<script lang="ts" setup>
import type { BlockLayout } from '@/types'
import AllElement from '../root/helper/AllElement.vue'
import { ref } from 'vue'

defineProps<{
  ui: BlockLayout
  parentData?: any
}>()

const show = ref(true)
</script>

<template>
  <div class="single-accordion-item">
    <div class="accordion-heading is-clickable" @click="show = !show">
      <h5>{{ ui.label }}</h5>
      <div class="accordion-right is-flex is-align-items-center">
        <p>{{ ui.description }}</p>
        <button class="icon">
          <svg
            v-if="show"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
            style="transform: rotate(0deg)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
            style="transform: rotate(-180deg)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div
      v-show="show"
      class="accordion-body pt-16 b-1 p-20 b-t-n is-rounded-4"
      style="max-height: 100%; display: block"
    >
      <template v-for="el in ui.elements" :key="el.label">
        <AllElement :el="el" :c-data="parentData" />
      </template>
    </div>
  </div>
  <div v-else>
    <template v-for="el in ui.elements" :key="el.label">
      <AllElement :el="el" :c-data="parentData" />
    </template>
  </div>
</template>
