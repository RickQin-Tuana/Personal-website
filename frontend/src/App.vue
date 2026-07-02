<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  // Ensure the page starts at the top on initial load or refresh,
  // even if the URL contains a hash like #works
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
