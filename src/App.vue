<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCommonsStore } from './stores/commons'

import Auth from './components/Auth.vue'
import { supabase } from './supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)
</script>

<template>
  <div class="overlay" :class="[overlay ? 'active' : 'inactive']"></div>

  <RouterView v-if="session" :session="session" />
  <Auth v-else />
</template>

<style scoped lang="scss">
</style>
