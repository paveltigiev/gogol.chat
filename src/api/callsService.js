import { supabase } from '@/supabase_callqa'

export async function fetchCallsAggregatedData(params) {

  try {
    const { data: calls_aggregated_data } = await supabase
      .from('calls_aggregated_data')
      .select('*')
      .limit(params.limit || 9999)
      .order(params.order_field || 'avg_score', { ascending: params.order_type == 'asc' ? true: false })
      .lt('day_unix', params.to || 3376674000)
      .gt('day_unix', params.from || 946674000)
    return calls_aggregated_data
  } catch(error) {
    console.error(error)
  }
}

export async function fetchCallsDetails(id, params) {
  try {
    const { data: calls_details } = await supabase
      .from('calls_details')
      .select('*')
      .eq('call_id', id)
      .limit(params.limit || 9999)
      .order(params.order_field || 'call_score', { ascending: params.order_type == 'asc' ? true: false })
      .lt('created_at_unix', params.to || 3376674000)
      .gt('created_at_unix', params.from || 946674000)
    return calls_details
  } catch(error) {
    console.error(error)
  }
}

export async function fetchCallsFullDetails(id) {
  try {
    const { data: calls_full_details } = await supabase
      .from('calls_full_details')
      .select('*')
      .eq('call_id', id)
      .single()
    return calls_full_details
  } catch(error) {
    console.error(error)
  }
}
