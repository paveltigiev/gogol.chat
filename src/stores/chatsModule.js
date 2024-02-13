import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getChats, getChat, createChat, getSuggestations } from '../api/chatsService.js'

export const useChatsStore = defineStore('chats', () => {
  const chats = ref([])
  const chat = ref(null)
  const suggestations = ref([])

  const setChats = async () => {
    chats.value = await getChats()
  }

  const setSuggestations = async () => {
    suggestations.value = await getSuggestations()
  }

  const setChat = async (id) => {
    chat.value = await getChat(id)
  }

  const addChat = async (user_id, agent_id, messages) => {
    chat.value = await createChat(user_id, agent_id, messages)
  }

  return { chats, chat, suggestations, setChats, setChat, addChat, setSuggestations }
})
