<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from './supabase'
import { useCommonsStore } from './stores/commons'
import { useUserStore } from './stores/userModule'
import { useAuthStore } from './stores/auth'
import AuthView from './views/AuthView.vue'
import WaitingView from './views/WaitingView.vue'

const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)

const userStore = useUserStore()
const authStore = useAuthStore()
const user = computed(() => userStore.user )
const session = computed(() => authStore.session )

onMounted(async () => {
  await supabase.auth.getSession().then(({ data }) => {
    authStore.session = data.session
  })

  await supabase.auth.onAuthStateChange((_, _session) => {
    authStore.session = _session
  })

  if (session.value) userStore.setUser(session.value.user.id)
})
</script>

<template>
  <div class="overlay" :class="[overlay ? 'active' : 'inactive']"></div>
  <AuthView v-if="!session" />
  <RouterView v-if="session && user?.status == 'active'" />
  <WaitingView v-if="session && user?.status == 'waiting'" />
</template>

<style scoped lang="scss">
</style>
./stores/userModule