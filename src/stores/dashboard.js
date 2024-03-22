import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCode, subscribe } from '../api/dashboardService.js'
import router from '@/router/index.js'

// import { useCallsStore } from '../../stores/callsModule'
// const callsStore = useCallsStore()
// const callsFullDetails = computed(() => callsStore.callsFullDetails)

export const useDashboardStore = defineStore('dashboard', () => {
  const code = ref('')
  const request = ref('')

  const subscribeToCode = async (chat_id) => {
    const entry = await getCode(chat_id)
    code.value = entry.html
    request.value = entry.request

    if (request.value) {
      router.push('/chat/' + request.value)
    }

    subscribe(chat_id, (entry) => {
      code.value = entry.html
      request.value = entry.request

      if (request.value) {
        router.push('/chat/' + request.value)
      }
    })
  }

  return { code, request, subscribeToCode }
})
