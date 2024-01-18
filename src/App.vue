<script setup>
import { computed } from 'vue'
import { useCommonsStore } from './stores/commons'
const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)
</script>

<template>
  <div class="overlay" :class="[overlay ? 'active' : 'inactive']"></div>
  <RouterView />
</template>

<style scoped lang="scss">
</style>
