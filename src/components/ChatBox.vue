<script setup>
import OpenAI from "openai"
import { ref, computed, reactive } from "vue"
import { useDashboardStore } from '../stores/dashboard'
import { useCommonsStore } from '../stores/commons'

const dashboardStore = useDashboardStore()
const commonsStore = useCommonsStore()

const messages = reactive([])
const userMessage = ref('')

const code = computed(() => dashboardStore.code)
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

function sendRecomendation(message) {
  userMessage.value = message
  sendMessage()
}

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

    <div class="chat-box__data">

      <div class="chat-box__data-dashboard">
        <div class="chat-box__data-dashboard--sceleton" v-if="code == '' && !commonsStore.loading">
          <img src="../assets/img/sceleton.png">
        </div>
        <div class="chat-box__data-dashboard--data" v-html="code" v-if="!commonsStore.loading"></div>
        <div class="loading" v-else></div>
      </div>

      <div class="chat-box__data-messages" id="messageContainer" v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id" class="chat-box__data-messages--message" :class="[message.role == 'user'? 'user-message' : 'assistant-message']">
          <div class="avatar"></div>
          <div class="content">
            <div class="user-name">{{ message.role == 'user'? 'You' : 'Gogol.chat' }}</div>
            <div class="text">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <div v-else class="hello-message">
        <div class="hello-message--logo"></div>
        <div class="hello-message--text">How can I help with <br> your CRM?</div>
      </div>

    </div>

    <div class="chat-box__recomendations" v-if="messages.length < 1">
      <div class="chat-box__recomendations-item" @click="sendRecomendation('Track your sales activities')">
        <div class="chat-box__recomendations-item--title">How many leads?</div>
        <div class="chat-box__recomendations-item--text">Track your sales activities</div>
      </div>
      <div class="chat-box__recomendations-item" @click="sendRecomendation('Get your sales persons activity data')">
        <div class="chat-box__recomendations-item--title">Who is most productive</div>
        <div class="chat-box__recomendations-item--text">Get your sales persons activity data</div>
      </div>
      <div class="chat-box__recomendations-item" @click="sendRecomendation('Scoring for your sales funnel')">
        <div class="chat-box__recomendations-item--title">Most valueabel leads</div>
        <div class="chat-box__recomendations-item--text">Scoring for your sales funnel</div>
      </div>
      <div class="chat-box__recomendations-item" @click="sendRecomendation('Manage your personal activities')">
        <div class="chat-box__recomendations-item--title">Today activities to-do list</div>
        <div class="chat-box__recomendations-item--text">Manage your personal activities</div>
      </div>
    </div>

    <div class="chat-box__form">
      <input class="chat-box__form-input" @keyup.enter="sendMessage" v-model="userMessage" placeholder="Message Gogol.chat..."/>
      <button class="chat-box__form-btn btn" @click="sendMessage" :disabled="loading">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </button>
      <div class="chat-box__form-info">Gogol Chat provides data from your CRM system</div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
  .chat-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 20px;
    height: calc(100vh - 56px);

    &__data {
      display: flex;
      gap: 3rem;

      &-dashboard {
        position: relative;
        flex: 1;
        overflow-y: scroll;
        // max-height: calc(100vh - 156px);

        &--data {
          max-height: calc(100vh - 156px);
        }

        &--sceleton {
          height: calc(100vh - 318px);
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .loading {
          width: 100%;
          height: 100%;
          display: flex;
          background: url('../../public/loading.gif') center center no-repeat;
          background-size: 64px;
        }
      }
      &-messages {
        display: flex;
        flex-direction: column;
        gap: 45px;
        height: calc(100vh - 156px);
        overflow-y: scroll;
        flex: 1;

        &--message {
          display: flex;;
          gap: .75rem;

          .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-top: .125rem;
            // border: 1px solid var(--color-border);
          }
          .content {
            flex: 1;
            .user-name {
              font-weight: 600;
            }
            .text {
              letter-spacing: -0.01rem;
              line-height: 1.7rem;
            }
          }

          &.user-message {
            .avatar {
              background: #B22F5B url('../assets/img/user.svg') center center no-repeat;
              background-size: 10px;
            }
          }
          &.assistant-message {
            .avatar {
              background: #000 url('../assets/img/ai.png') center center no-repeat;
              background-size: 20px;
            }
            .text {
              color: #374151;
            }
          }
        }
      }
    }
    &__form {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-input {
        height: 52px;
        padding-bottom: .875rem;
        padding-top: .875rem;
        padding-left: 1rem;
        padding-right: 3rem;
        background-color: transparent;
        align-items: center;
        border: 1px solid var(--color-border);
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
        background: var(--color-border);
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
          border-color: var(--color-border);
          color: var(--color-border);
        }
      }
      &-info {
        color: var(--color-border);
        text-align: center;
        font-size: 0.8rem;
      }
    }
    &__recomendations {
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 8px;
      padding: 0 0.5rem;

      &-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: .75rem 1rem;
        cursor: pointer;
        opacity: 0.8;
        line-height: 1.25rem;
        font-size: .875rem;

        &:hover {
          background: #fff;
        }

        &--title {
          font-weight: 700;
        }
        &--text {
          opacity: 0.5;
        }
      }
    }
  }
  .hello-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex: 1;
    height: calc(100vh - 296px - 1.5rem);

    &--logo {
      width: 100px;
      height: 100px;
      background: url('../assets/img/ai.png') center center no-repeat;
      background-size: contain;
      border-radius: 16px;
    }
    &--text {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }
  }

  @media screen and (max-width: 1024px) {
    .chat-box {
      height: calc(100vh - 26px);
      &__data {
        flex-direction: column;
        height: calc(100vh - 75px);

        &-dashboard {
          &--sceleton {
            display: none;
          }
        }

        &-messages {
          min-height: calc(50vh);
        }
      }
    }
  }
</style>
