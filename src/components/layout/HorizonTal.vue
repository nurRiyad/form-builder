<script lang="ts" setup>
import type { HorizontalLayout } from '@/types'
import AllElement from '../root/helper/AllElement.vue'
import { ref } from 'vue'

defineProps<{
  ui: HorizontalLayout
  parentData?: any
}>()

const show = ref(true)
</script>

<template>
  <div v-if="ui.showLabels">
    <div class="is-flex is-justify-content-space-between p-4 bg-gray-400">
      <p @click="show = !show">{{ ui.label }}</p>
      <p>{{ ui.description }}</p>
    </div>
    <div v-show="show" class="flex space-x-3 is-fullwidth">
      <template v-for="el in ui.elements" :key="el.label">
        <AllElement :el="el" :c-data="parentData" />
      </template>
    </div>
  </div>
  <div v-else>
    <div class="flex space-x-3 w-full">
      <AllElement v-for="el in ui.elements" :key="el.label" :el="el" :c-data="parentData" />
    </div>
  </div>
</template>
