<script setup>
import { ref, onMounted, computed, reactive } from "vue"
import OpenAI from "openai"
import { useDashboardStore } from '../stores/dashboard'
import { useCommonsStore } from '../stores/commons'

const dashboardStore = useDashboardStore()
const commonsStore = useCommonsStore()
const messages = reactive([])
const userMessage = ref('')

const loading = computed(() => commonsStore.loading)

function scrollToBottom() {
  var messageContainer = document.getElementById("messageContainer")
  messageContainer.scrollTop = messageContainer.scrollHeight
}

const openai = new OpenAI({
  baseURL: import.meta.env.VITE_BASE_URL + '/v1',
  apiKey: '',
  dangerouslyAllowBrowser: true
})

async function sendMessage() {
  if (!loading.value && !!userMessage.value) {
    messages.push({ content: userMessage.value, role: 'user' })
    userMessage.value = ""
    commonsStore.loading = true

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
      stream: true
    })

    messages.push({ content: '', role: 'assistant' });

    for await (const part of completion) {
      let line = part.choices[0].delta.content
      if (line) {
        messages[messages.length - 1].content += part.choices[0].delta.content
        scrollToBottom()
      }
    }
    commonsStore.loading = false
    dashboardStore.setDashboard()
  }
}
</script>

<template>
  <div class="chat-box">

    <div class="chat-box__messages" id="messageContainer">
      <div v-for="message in messages" :key="message.id" class="chat-box__messages-message" :class="[message.role == 'user'? 'user-message' : 'assistant-message']">
        <div class="avatar"></div>
        <div class="content">
          <div class="user-name">{{ message.role == 'user'? 'You' : 'Gogol.chat' }}</div>
          <div class="text">{{ message.content }}</div>
        </div>
      </div>
    </div>

    <div class="chat-box__form">
      <input class="chat-box__form-input" @keyup.enter="sendMessage" v-model="userMessage" placeholder="Message Gogol.chat..."/>
      <button class="chat-box__form-btn btn" @click="sendMessage" :disabled="loading">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class=""><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .chat-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 20px;

    &__messages {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: calc(100vh - 120px);
      overflow-y: scroll;

      &-message {
        display: flex;;
        gap: .75rem;

        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-top: .125rem;
        }
        .content {
          flex: 1;
          .user-name {
            font-weight: 600;
          }
        }

        &.user-message {
          .avatar {
            border: 1px solid #77808D;
            background: #3D4A5D url('../assets/img/user.svg') center center no-repeat;
            background-size: 10px;
          }
        }
        &.assistant-message {
          .avatar {
            border: 1px solid #77808D;
            background: #000 url('../assets/img/ai.png') center center no-repeat;
            background-size: 20px;
          }
        }
      }
    }
    &__form {
      position: relative;
      display: flex;
      gap: 8px;

      &-input {
        height: 52px;
        padding-bottom: .875rem;
        padding-top: .875rem;
        padding-left: 1rem;
        padding-right: 3rem;
        background-color: transparent;
        align-items: center;
        border: 1px solid rgba(217,217,227,0.2);
        border-radius: 16px;
        width: 100%;
        color: var(--color-text);

        &:focus {
          outline: none;
        }
      }
      &-btn {
        position: absolute;
        border: 1px solid transparent;
        background: rgba(217,217,227,0.2);
        border-radius: 8px;
        right: 12px;
        top: 12px;
        width: 30px;
        height: 30px;
        color: var(--color-background);
        display: flex;
        align-items: center;
        padding: 0;
        justify-content: center;

        &:hover {
          background: transparent;
          border-color: rgba(217,217,227,0.2);
          color: rgba(217, 217, 227, 0.2);
        }
      }
    }
  }
</style>
