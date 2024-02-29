import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchGetAgents, fetchGetAgent, fetchGetConnections, fetchCreateConnection, fetchGetIntergrations, fetchGetTransactions, fetchUpdateConnection, fetchDeleteConnection } from '../api/settingsService.js'
import { useUserStore } from './userModule.js'
const userStore = useUserStore()

export const useSettingsStore = defineStore('settings', () => {
  const agents = ref([])
  const agent = ref(null)
  const connections = ref([])
  const intergrations = ref([])
  const transactions = ref([])
  const totalTokens = 10000

  const setAgents = async () => {
    const role = 'full'
    agents.value = await fetchGetAgents(userStore.user.user_id, role)
  }

  const setAgent = async (id) => {
    agent.value = await fetchGetAgent(id)
  }

  const setConnections = async () => {
    connections.value = await fetchGetConnections()
  }

  const setIntergrations = async () => {
    intergrations.value = await fetchGetIntergrations()
  }

  const setTransactions = async () => {
    transactions.value = await fetchGetTransactions()
  }

  const addConnection = async (connection) => {
    connections.value.push(await fetchCreateConnection(connection))
  }
  const updateConnection = async (connection) => {
    await fetchUpdateConnection(connection)
    setConnections()
  }
  const deleteConnection = async (connection) => {
    await fetchDeleteConnection(connection)
    setConnections()
  }

  return { agents, agent, connections, intergrations, transactions, totalTokens, setAgents, setAgent, setConnections, setIntergrations, setTransactions, addConnection, updateConnection, deleteConnection }
})
