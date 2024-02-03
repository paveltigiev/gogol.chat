import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginWithGoogle, loginWithEmail, logout } from '../api/authService.js'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(null)

  const loginWithGoogleAndSetUser = async () => {
    session.value = await loginWithGoogle()
  }

  const loginWithEmailAndSetUser = async (email) => {
    session.value = await loginWithEmail(email)
  }

  const setLogout = async () => {
    session.value = await logout()
  }

  return { session, loginWithGoogleAndSetUser, loginWithEmailAndSetUser, setLogout }
})
