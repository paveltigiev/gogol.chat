import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getChats, getChat, createChat } from '../api/chatsService.js'

export const useChatsStore = defineStore('chats', () => {
  const chats = ref([])
  const chat = ref(null)

  const setChats = async () => {
    chats.value = await getChats()
  }

  const setChat = async (id) => {
    chat.value = await getChat(id)
  }
  const addChat = async (user_id, agent_id, messages) => {
    chat.value = await createChat(user_id, agent_id, messages)
  }

  return { chats, chat, setChats, setChat, addChat }
})
