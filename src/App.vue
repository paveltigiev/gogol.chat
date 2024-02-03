<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from './supabase'
import { useCommonsStore } from './stores/commons'
import { useUserStore } from './stores/user'
import AuthView from './views/AuthView.vue'
import WaitingView from './views/WaitingView.vue'

const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)

const userStore = useUserStore()
const user = computed(() => userStore.user )
const status = ref('')

onMounted(async () => {
  await supabase.auth.getSession().then(({ data }) => {
    userStore.user = data.session? data.session.user : null
  })

  await supabase.auth.onAuthStateChange((_, _session) => {
    userStore.user = _session? _session.user : null
  })

  if (user.value) {
    try {
      const { data: user_profile } = await supabase
        .from('user_profiles')
        .select('status')
        .eq('user_id', user.value.id)
        .single()
      status.value = user_profile.status
    } catch (error) {
      alert(error.message)
    }
  }
})
</script>

<template>
  <div class="overlay" :class="[overlay ? 'active' : 'inactive']"></div>
  <RouterView v-if="user && status.charAt(0) == 'a'" />
  <WaitingView v-if="user && status.charAt(0) == 'w'" />
  <AuthView v-else />
</template>

<style scoped lang="scss">
</style>
