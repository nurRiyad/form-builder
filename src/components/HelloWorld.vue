<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="font-bold text-3xl text-center">{{ msg }}</h1>
  </div>
</template>
