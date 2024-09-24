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
  <div v-if="ui.showLabels" class="border-2 border-black">
    <div class="flex justify-between p-4 bg-gray-400">
      <p @click="show = !show">{{ ui.label }}</p>
      <p>{{ ui.description }}</p>
    </div>
    <div v-show="show" class="flex space-x-3 w-full">
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
