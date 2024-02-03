import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDashboard } from '../api/dashboardService.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const code = ref('')
  const setDashboard = async () => {
    code.value = await getDashboard()
  }
  return { code, setDashboard }
})
