import axios from 'axios'
import { supabase } from '@/supabase'

export async function getCode(chat_id, callback) {
  try {
    const { data: html } = await supabase
      .from('html_gen')
      .select('*')
      .eq('chat_id', chat_id)
      .single()
    return html.html
  } catch(error) {
    console.error(error)
  }

  const uiChannel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'html_gen',
        filter: `chat_id=eq.${chat_id}`,
      },
      (payload) => {
        callback(payload.new.html)
      }
    )
    .subscribe()
}

export async function getDashboard(url) {
  const responce = await axios.get(`${url}/adaptive-ui/html`)
  return responce.data
}
