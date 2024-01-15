<script setup>
import { ref, onMounted, computed, reactive } from "vue"
import OpenAI from "openai"

const messages = reactive([])
const userMessage = ref('')
const apiKey = ref('')
const loading = ref(false)

onMounted(() => {
  const storedApiKey = localStorage.getItem("apiKey")
  if (storedApiKey !== null && storedApiKey !== 'null') {
    apiKey.value = storedApiKey
  }
})
const hasApiKey = computed(() => !!apiKey.value)

function scrollToBottom() {
  var messageContainer = document.getElementById("messageContainer")
  messageContainer.scrollTop = messageContainer.scrollHeight
}

async function sendMessage() {
  messages.push({ content: userMessage.value, role: 'user' })
  userMessage.value = ""

  const openai = new OpenAI({
    baseURL: import.meta.env.VITE_BASE_URL + '/v1',
    apiKey: apiKey.value,
    dangerouslyAllowBrowser: true
  })

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
}
</script>

<template>
  <div class="chat-box" v-if="hasApiKey">

    <div class="chat-box__messages" id="messageContainer">
      <div v-for="message in messages" :key="message.id" class="chat-box__messages-message" :class="[message.role == 'user'? 'user-message' : 'assistant-message']">
        <div class="avatar"></div>
        <div class="text">{{ message.content }}</div>
      </div>
    </div>

    <div class="chat-box__form">
      <input class="chat-box__form-input" @keyup.enter="sendMessage" v-model="userMessage"/>
      <button class="chat-box__form-btn btn" @click="sendMessage" :disabled="loading">Submit</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .chat-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-end;

    &__messages {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 600px;
      max-height: 900px;
      overflow-y: scroll;

      &-message {
        display: flex;
        gap: 12px;
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-top: 10px;
        }
        .text {
          border-radius: 8px;
          padding: 14px;
          flex: 1;
        }

        &.user-message {
          .avatar {
            border: 1px solid var(--color-border);
            background: url('../assets/img/user.png') center center no-repeat;
            background-size: 20px;
          }
          .text {
            border: 1px solid var(--color-border);
          }
        }
        &.assistant-message {
          .avatar {
            background: #4A25E1 url('../assets/img/openai.svg') center center no-repeat;
            background-size: 16px;
            fill: #fff;
          }
          .text {
            background: #fff;
            box-shadow: 0 0 20px #00000014;
          }
        }
      }
    }
    &__form {
      display: flex;
      gap: 8px;

      &-input {
        border: 1px solid var(--color-border);
        border-radius: 30px;
        padding: 12px;
        flex: 1;
        background: transparent;
        color: var(--color-text);

        &:focus {
          outline: none;
        }
      }
      &-btn {
        border: 0;
        color: #fff;
        background: #4A25E1;
        border-radius: 30px;
        padding: 12px 48px;
        font-weight: bold;
      }
    }
  }
</style>