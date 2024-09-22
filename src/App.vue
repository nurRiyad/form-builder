<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex justify-center p-5 space-x-5 mb-2 border-b border-black">
    <RouterLink exactActiveClass="underline" to="/">Home</RouterLink>
    <RouterLink exactActiveClass="underline" to="/docs">Docs</RouterLink>
    <RouterLink exactActiveClass="underline" to="/about">About</RouterLink>
    <RouterLink exactActiveClass="underline" to="/create">Create</RouterLink>
  </div>
  <RouterView />
</template>
