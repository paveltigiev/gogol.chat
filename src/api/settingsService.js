import { supabase } from '@/supabase'

export async function getAgents() {
  try {
    const { data: agents } = await supabase
      .from('agents')
      .select('*')
    return agents
  } catch(error) {
    console.error(error)
  }
}

export async function getAgent(id) {
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

export async function getConnections() {
  try {
    const { data: connections } = await supabase
      .from('connections')
      .select('*')
    return connections
  } catch(error) {
    console.error(error)
  }
}

export async function createConnection(connection) {
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

export async function getIntergrations() {
  try {
    const { data: intergrations } = await supabase
      .from('intergrations')
      .select('*')
    return intergrations
  } catch(error) {
    console.error(error)
  }
}

export async function getTransactions() {
  try {
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
    return transactions
  } catch(error) {
    console.error(error)
  }
}
