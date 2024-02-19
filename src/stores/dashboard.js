import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCode } from '../api/dashboardService.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const code = ref('')

  const subscribeToCode = async (chat_id) => {
    code.value = await getCode(chat_id, (html) => {
      code.value = html
    })
  }

  return { code, subscribeToCode }
})
