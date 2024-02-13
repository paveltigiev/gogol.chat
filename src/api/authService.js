import { supabase } from '@/supabase'

const getURL = () => {
  console.log('eee')
  let url =
    import.meta.env.VITE_PUBLIC_SITE_URL ??
    import.meta.env.VITE_PUBLIC_DO_URL ??
    'http://localhost:5173/'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export async function loginWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
      },
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function loginWithEmail(email) {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
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