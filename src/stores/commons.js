import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commons', () => {
  const loading = ref(false)
  const overlay = ref(false)

  return { loading, overlay }
})
