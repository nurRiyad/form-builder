<script setup lang="ts">
withDefaults(defineProps<{ direction: 'left' | 'right' }>(), {
  direction: 'right'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
    width="16"
    height="16"
    :style="direction === 'right' ? 'transform: rotate(0deg)' : 'transform: rotate(-180deg)'"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
</template>
