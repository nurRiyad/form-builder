<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'up' | 'down' }>(), {
  direction: 'up'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
    :style="direction === 'up' ? 'transform: rotate(0deg)' : 'transform: rotate(-180deg)'"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
</template>
