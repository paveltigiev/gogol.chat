import { supabase } from '@/supabase'

export async function getChats() {
  try {
    const { data: chats } = await supabase
      .from('chats')
      .select('*')
    return chats
  } catch (error) {
    console.error(error.message)
  }
}

export async function getChat(id) {
  try {
    const { data: chat } = await supabase
      .from('chats')
      .select('*')
      .eq('id', id)
      .single()
    return chat
  } catch (error) {
    console.error(error.message)
  }
}

export async function createChat(user_id, agent_id, chat) {
  try {
    const { data } = await supabase
      .from('chats')
      .insert([
        {
          user_id,
          agent_id,
          chat
        }
      ])
      .select()
      .single()
    return data
  } catch (error) {
    console.error(error.message)
  }
}
