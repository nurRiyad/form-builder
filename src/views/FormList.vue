<script setup lang="ts">
import { allForms } from '@/forms'
</script>

<template>
  <div class="pt-60 list">
    <p>All Available Form</p>
    <div>
      <RouterLink class="link" v-for="f in allForms" :key="f" :to="`/form/${f}`">
        {{ f }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
.link {
  display: block;
}
</style>
