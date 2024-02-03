import { supabase } from '@/supabase'

export async function getUser(id) {
  try {
    const { data: user_profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', id)
      .single()
    return user_profile
  } catch (error) {
    console.error(error.message)
  }
}
