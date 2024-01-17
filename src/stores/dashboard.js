import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDashboard } from '../api/dashboard.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const code = ref('<h4>First write a message to Gogol to get the data</h4>')
  const setDashboard = async () => {
    code.value = await getDashboard()
  }

  return { code, setDashboard }
})
