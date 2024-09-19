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
  <div>
    <div class="flex justify-between p-4 bg-gray-400">
      <p @click="show = !show">{{ ui.label }}</p>
      <p>{{ ui.description }}</p>
    </div>
    <div v-show="show">
      <template v-for="el in ui.elements" :key="el.label">
        <AllElement :el="el" :c-data="parentData" />
      </template>
    </div>
  </div>
</template>
