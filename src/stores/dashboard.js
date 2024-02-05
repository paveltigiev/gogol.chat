import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDashboard } from '../api/dashboardService.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const code = ref('')
  const setDashboard = async (url) => {
    code.value = await getDashboard(url)
  }
  return { code, setDashboard }
})
