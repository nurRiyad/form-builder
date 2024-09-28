<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav
    class="is-flex is-justify-content-center gap-8 b-b-1 is-fixed is-fullwidth has-background-white py-4"
    style="z-index: 99; top: 0"
  >
    <RouterLink
      exactActiveClass="has-text-primary has-background-light"
      to="/"
      class="navbar-item has-text-dark has-text-weight-medium"
    >
      Home
    </RouterLink>
    <RouterLink
      exactActiveClass="has-text-primary has-background-light"
      to="/forms"
      class="navbar-item has-text-dark has-text-weight-medium"
    >
      Forms
    </RouterLink>
    <RouterLink
      exactActiveClass="has-text-primary has-background-light"
      to="/about"
      class="navbar-item has-text-dark has-text-weight-medium"
    >
      About
    </RouterLink>
  </nav>
  <div>
    <RouterView />
  </div>
</template>
