<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body is-flex is-justify-content-center">
      <h1 class="font-bold text-3xl text-center">{{ msg }}</h1>
    </div>
  </div>
</template>
