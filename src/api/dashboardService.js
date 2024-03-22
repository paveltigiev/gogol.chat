import axios from 'axios'
import { supabase } from '@/supabase'

export async function subscribe(chat_id, callback) {
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
        callback(payload.new)
      }
    )
    .subscribe()
}
export async function getCode(chat_id) {
  try {
    const { data: html_gen } = await supabase
      .from('html_gen')
      .select('*')
      .eq('chat_id', chat_id)
      // .single()
    return html_gen[html_gen.length-1]
  } catch(error) {
    console.error(error)
  }
}

export async function getDashboard(url) {
  const responce = await axios.get(`${url}/adaptive-ui/html`)
  return responce.data
}
