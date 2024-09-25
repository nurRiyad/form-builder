<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="is-flex is-justify-content-center p-16 gap-8 mb-8 b-b-1">
    <RouterLink exactActiveClass="underline" to="/" class="px-4 py-2">Home</RouterLink>
    <RouterLink exactActiveClass="underline" to="/docs" class="px-4 py-2">Docs</RouterLink>
    <RouterLink exactActiveClass="underline" to="/about" class="px-4 py-2">About</RouterLink>
    <RouterLink exactActiveClass="underline" to="/create" class="px-4 py-2">Create</RouterLink>
  </div>
  <RouterView />
</template>
