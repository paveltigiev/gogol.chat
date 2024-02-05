import { supabase } from '@/supabase'
// import { useCommonsStore } from '../stores/commons'
// const commonsStore = useCommonsStore()

export async function getAgents() {
  try {
    // commonsStore.loading = true
    const { data: agents } = await supabase
      .from('agents')
      .select('*')
    return agents
  } catch(error) {
    console.error(error)
  } finally {
    // commonsStore.loading = false
  }
}

export async function getConnections() {
  try {
    // commonsStore.loading = true
    const { data: connections } = await supabase
      .from('connections')
      .select('*')
    return connections
  } catch(error) {
    console.error(error)
  } finally {
    // commonsStore.loading = false
  }
}

export async function getIntergrations() {
  try {
    // commonsStore.loading = true
    const { data: intergrations } = await supabase
      .from('intergrations')
      .select('*')
    return intergrations
  } catch(error) {
    console.error(error)
  } finally {
    // commonsStore.loading = false
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
