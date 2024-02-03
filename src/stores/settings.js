import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAgents, getConnections, getIntergrations } from '../api/settingsService.js'

export const useSettingsStore = defineStore('settings', () => {
  const agents = ref([])
  const connections = ref([])
  const intergrations = ref([])

  const setAgents = async () => {
    agents.value = await getAgents()
  }

  const setConnections = async () => {
    connections.value = await getConnections()
  }

  const setIntergrations = async () => {
    intergrations.value = await getIntergrations()
  }

  return { agents, connections, intergrations, setAgents, setConnections, setIntergrations }
})
