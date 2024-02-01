<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from './supabase'
import { useCommonsStore } from './stores/commons'
import { useUserStore } from './stores/user'
import AuthView from './views/AuthView.vue'

const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)

const userStore = useUserStore()
const user = computed(() => userStore.user )
const session = ref()

onMounted(async () => {
  await supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  await supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })

  userStore.user = session.value ? session.value.user : null

  try {
    const { data: { user } } = await supabase.auth.getUser()
    console.log('getUser')
    console.log(user)
  } catch (error) {
    alert(error.message)
  }
})
</script>

<template>
  <div class="overlay" :class="[overlay ? 'active' : 'inactive']"></div>
  <RouterView v-if="session" :session="session" />
  <AuthView v-else />
</template>

<style scoped lang="scss">
</style>
