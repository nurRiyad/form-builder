<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="is-flex is-justify-content-center p-16 gap-8 mb-8 b-b-1">
    <RouterLink exactActiveClass="underline" to="/">Home</RouterLink>
    <RouterLink exactActiveClass="underline" to="/docs">Docs</RouterLink>
    <RouterLink exactActiveClass="underline" to="/about">About</RouterLink>
    <RouterLink exactActiveClass="underline" to="/create">Create</RouterLink>
  </div>
  <RouterView />
</template>
