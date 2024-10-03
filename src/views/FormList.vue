<script setup lang="ts">
import { allForms } from '@/forms'
import TheArrow from './../components/icons/TheArrow.vue'
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body is-flex is-flex-direction-column is-justify-content-center">
      <h5>All Available Form</h5>
      <div>
        <RouterLink
          class="link is-flex is-align-items-center gap-4 p-4"
          v-for="f in allForms"
          :key="f"
          :to="`/form/${f}`"
        >
          <span>{{ f }}</span>
          <span class="width-12 height-12">
            <TheArrow style="transform: rotate(-90deg)" />
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.link {
  display: block;
}
</style>
