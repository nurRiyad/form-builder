<script lang="ts" setup>
import { ref } from 'vue'
import type { BlockLayout } from '@/types'

import TheArrow from '../icons/TheArrow.vue'
import AllElement from '../root/helper/AllElement.vue'

defineProps<{
  ui: BlockLayout
  parentData?: any
}>()

const show = ref(true)
</script>

<template>
  <div v-if="ui.showLabels" class="single-accordion-item">
    <div
      class="accordion-heading is-clickable"
      style="border-radius: 4px 4px 0 0"
      @click="show = !show"
    >
      <h5>{{ ui.label }}</h5>
      <div class="accordion-right is-flex is-align-items-center">
        <p>{{ ui.description }}</p>
        <button class="icon">
          <TheArrow :direction="show ? 'up' : 'down'" />
        </button>
      </div>
    </div>
    <div
      v-show="show"
      class="accordion-body pt-16 b-1 p-20 b-t-n"
      style="max-height: 100%; display: block; border-radius: 0 0 4px 4px"
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
