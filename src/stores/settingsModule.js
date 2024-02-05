import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAgents, getAgent, getConnections, getIntergrations, getTransactions } from '../api/settingsService.js'

export const useSettingsStore = defineStore('settings', () => {
  const agents = ref([])
  const agent = ref(null)
  const connections = ref([])
  const intergrations = ref([])
  const transactions = ref([])

  const setAgents = async () => {
    agents.value = await getAgents()
  }

  const setAgent = async (id) => {
    agent.value = await getAgent(id)
  }

  const setConnections = async () => {
    connections.value = await getConnections()
  }

  const setIntergrations = async () => {
    intergrations.value = await getIntergrations()
  }

  const setTransactions = async () => {
    transactions.value = await getTransactions()
  }

  return { agents, agent, connections, intergrations, transactions, setAgents, setAgent, setConnections, setIntergrations, setTransactions }
})
