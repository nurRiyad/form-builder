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
  <div v-if="ui.showLabels" class="border-2 border-black">
    <div class="flex justify-between p-4 bg-gray-400">
      <p @click="show = !show">{{ ui.label }}</p>
      <p>{{ ui.description }}</p>
    </div>
    <div v-show="show" class="p-2">
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
