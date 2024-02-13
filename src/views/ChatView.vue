<script setup>
  import { ref, computed, reactive, onMounted, watch, onUnmounted } from "vue"
  import { useSettingsStore } from '../stores/settingsModule'
  import { useDashboardStore } from '../stores/dashboard'
  import { useChatsStore } from '../stores/chatsModule'
  import { useCommonsStore } from '../stores/commons'
  import { useUserStore } from '../stores/user'
  import MarkdownIt from "markdown-it"
  import OpenAI from "openai"

  const md = new MarkdownIt()

  const dashboardStore = useDashboardStore()
  const settingsStore = useSettingsStore()
  const commonsStore = useCommonsStore()
  const chatsStore = useChatsStore()
  const userStore = useUserStore()

  const agentMenuOpen = ref(false)
  const userMessage = ref('')
  const messages = reactive([])

  const loading = computed(() => commonsStore.loading)
  const agents = computed(() => settingsStore.agents.reverse())
  const agent = computed(() => settingsStore.agent)
  const code = computed(() => dashboardStore.code)
  const chat = computed(() => chatsStore.chat)

  const renderMarkdown = text => md.render(text)

  function scrollToBottom() {
    var messageContainer = document.getElementById("messageContainer")
    messageContainer.scrollTop = messageContainer.scrollHeight
  }

  function sendRecomendation(message) {
    userMessage.value = message
    sendMessage()
  }

  async function sendMessage() {
    if (!loading.value && !!userMessage.value) {
      messages.push({ content: userMessage.value, role: 'user' })
      userMessage.value = ""

      if (await !chat.value) {
        await chatsStore.addChat(userStore.user.user_id, agent.value.id, messages)
        chatsStore.setChats()
      }

      const url = `${agent.value.url}${chat.value.id}`

      commonsStore.loading = true

      const openai = new OpenAI({
        baseURL: url,
        dangerouslyAllowBrowser: true,
        apiKey: ''
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
      commonsStore.loading = false
      dashboardStore.setDashboard(url)
    }
  }

  const changeAgent = (id) => {
    agentMenuOpen.value = false
    settingsStore.setAgent(id)
  }

  watch(chat, async (newChat) => {
    if (newChat) {
      settingsStore.setAgent(newChat.agent_id)
      messages.splice(0, messages.length, ...newChat.chat)
    } else {
      settingsStore.agent = agents.value[0]
      messages.splice(0, messages.length)
    }
    userMessage.value = ''
  })

  onMounted( async () => {
    await settingsStore.setAgents()
    settingsStore.agent = agents.value[0]
  })
  onUnmounted(() => chatsStore.chat = null)
</script>

<template>
  <div class="chat-box">
    <div class="dropDownMenu" @click="agentMenuOpen = messages.length > 0? agentMenuOpen : !agentMenuOpen">
      <div>{{ agent?.name || 'loading' }} <span class="text-token-text-secondary">Amo CRM</span></div>
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="text-token-text-tertiary" v-if="messages.length <= 0"><path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>
    <div class="dropDownMenu__items" v-if="agentMenuOpen">
      <div class="dropDownMenu__items-item" v-for="agnt in agents" :key="agnt.id" @click="changeAgent(agnt.id)">
        <div class="dropDownMenu__items-item--text">
          {{ agnt.name }}
          <span>Amo CRM</span>
        </div>
        <div class="dropDownMenu__items-item--selector">
          <svg v-if="agent.id == agnt.id" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md flex-shrink-0 block group-hover:hidden"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM14.0755 5.93219C14.5272 6.25003 14.6356 6.87383 14.3178 7.32549L9.56781 14.0755C9.39314 14.3237 9.11519 14.4792 8.81226 14.4981C8.50934 14.517 8.21422 14.3973 8.01006 14.1727L5.51006 11.4227C5.13855 11.014 5.16867 10.3816 5.57733 10.0101C5.98598 9.63855 6.61843 9.66867 6.98994 10.0773L8.65042 11.9039L12.6822 6.17451C13 5.72284 13.6238 5.61436 14.0755 5.93219Z" fill="currentColor"></path></svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md flex-shrink-0"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="currentColor" opacity="0.16"></path></svg>
        </div>
      </div>
    </div>

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
            <div class="text" v-html="renderMarkdown(message.content)"></div>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 20px;
    height: calc(100vh - 56px);
    margin: 3rem 1.5rem 0;

    .dropDownMenu {
      position: absolute;
      top: -46px;
      left: 0;
      z-index: 2;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      padding: .5rem .75rem .5rem;
      gap: .25rem;
      align-items: center;
      cursor: pointer;
      display: flex;
      border-radius: 12px;

      span {
        color: #666;
      }

      &:hover {
        background-color: #ebeff6;
      }
    }
    .dropDownMenu__items {
      position: absolute;
      left: 0px;
      top: 0px;
      transform: translate(0, -10px);
      min-width: max-content;
      will-change: transform;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);
      background-color: #fff;
      border-color: rgba(236,236,241,1);
      border-radius: .5rem;
      max-width: 20rem;
      margin-top: .5rem;
      z-index: 2;
      display: flex;
      flex-direction: column;

      &-item {
        font-size: .875rem;
        line-height: 1.25rem;
        padding-right: .75rem!important;
        padding: .625rem;
        border-radius: .25rem;
        gap: 2.5rem;
        cursor: pointer;
        display: flex;
        margin: .375rem;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;

        &--text {
          display: flex;
          flex-direction: column;

          span {
            color: #999;
          }
        }

        &:hover {
          background-color: rgba(0,0,0,.05);
        }
      }
    }

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
          background: url('/loading.gif') center center no-repeat;
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
        font-size: 1rem;

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
      grid-template-columns: 1fr 1fr;
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
