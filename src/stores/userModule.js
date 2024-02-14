import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUser } from '../api/userService'

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  const setUser = async (id) => {
    user.value = await getUser(id)
  }

  return { user, setUser }
})
