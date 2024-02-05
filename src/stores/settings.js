import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAgents, getConnections, getIntergrations, getTransactions } from '../api/settingsService.js'

export const useSettingsStore = defineStore('settings', () => {
  const agents = ref([])
  const connections = ref([])
  const intergrations = ref([])
  const transactions = ref([])

  const setAgents = async () => {
    agents.value = await getAgents()
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

  return { agents, connections, intergrations, transactions, setAgents, setConnections, setIntergrations, setTransactions }
})
