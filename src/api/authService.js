import { supabase } from '@/supabase'
import { useCommonsStore } from '../stores/commons'
// const commonsStore = useCommonsStore()

export async function loginWithGoogle() {
  try {
    // commonsStore.loading = true
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  } finally {
    // commonsStore.loading = false
  }
}

export async function loginWithEmail(email) {
  try {
    // commonsStore.loading = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  } finally {
    // commonsStore.loading = false
  }
}

export async function logout () {
  try {
    // commonsStore.loading = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return null
  } catch(error) {
    console.error(error)
  } finally {
    // commonsStore.loading = false
  }
}