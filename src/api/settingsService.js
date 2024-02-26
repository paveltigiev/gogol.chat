import { supabase } from '@/supabase'

export async function fetchGetAgents() {
  try {
    const { data: agents } = await supabase
      .from('agents')
      .select('*')
    return agents
  } catch(error) {
    console.error(error)
  }
}

export async function fetchGetAgent(id) {
  try {
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single()
    return agent
  } catch(error) {
    console.error(error)
  }
}

export async function fetchGetConnections() {
  try {
    const { data: connections } = await supabase
      .from('connections')
      .select('*')
    return connections
  } catch(error) {
    console.error(error)
  }
}

export async function fetchCreateConnection(connection) {
  try {
    const { data, error } = await supabase
      .from('connections')
      .insert([
        connection
      ])
      .select()
      .single()
    return data
  } catch(error) {
    console.error(error)
  }
}

export async function fetchDeleteConnection(connection) {
  try {
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', connection.id)
  } catch(error) {
    console.error(error)
  }
}

export async function fetchUpdateConnection(connection) {
  const { data, error } = await supabase
    .from('connections')
    .update(connection)
    .eq('id', connection.id)
    .select()
  return data
}

export async function fetchGetIntergrations() {
  try {
    const { data: intergrations } = await supabase
      .from('intergrations')
      .select('*')
    return intergrations
  } catch(error) {
    console.error(error)
  }
}

export async function fetchGetTransactions() {
  try {
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
    return transactions
  } catch(error) {
    console.error(error)
  }
}
