<script setup lang="ts">
withDefaults(defineProps<{ direction: 'up' | 'down' }>(), {
  direction: 'up'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-4"
    width="16"
    height="16"
    :style="direction === 'up' ? 'transform: rotate(0deg)' : 'transform: rotate(-180deg)'"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
  </svg>
</template>
