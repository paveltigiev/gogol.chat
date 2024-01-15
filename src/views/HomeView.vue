<script setup>
import axios from 'axios'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import ChatBox from '../components/ChatBox.vue'

const htmlCode = ref()
const apiKey = ref()
const hasApiKey = computed(() => !!apiKey.value)
const getHTMLInterval = ref()

onMounted(() => {
  const storedApiKey = localStorage.getItem("apiKey");
  if (storedApiKey !== null && storedApiKey !== 'null') {
    apiKey.value = storedApiKey
  } else {
    login()
  }
  getHTMLInterval.value = setInterval(() => {
    getHTML()
  }, 5000)
})

onUnmounted(() => {
  clearInterval(getHTMLInterval.value)
})

const getHTML = async () => {
  const responce = await axios.get(`${import.meta.env.VITE_BASE_URL}/adaptive-ui/html`)
  htmlCode.value = responce.data
}

const logout = () => {
  localStorage.removeItem('apiKey')
  location.reload()
}

const login = () => {
  apiKey.value = prompt("Введите ваш apiKey:")
  localStorage.setItem("apiKey", apiKey.value)
  location.reload()
}
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="main__sidebar">
        <div class="div">
          <div class="main__sidebar-header">
            <div class="main__sidebar-header-logo"></div>
          </div>
          <div class="main__sidebar-nav">
            <a href="#">Link to chat</a>
            <a href="#">Link to chat</a>
            <a href="#">Link to chat</a>
          </div>
        </div>
        <div>
          <div class="logoutBtn" v-if="hasApiKey" @click="logout">Logout</div>
          <div class="loginBtn" v-else @click="login">Set Api Key</div>
        </div>
      </div>
      <div class="main__dashboard">
        <div class="data" v-html="htmlCode"></div>
      </div>
      <div class="main__chat">
        <chat-box />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  gap: 36px;

  &__sidebar {
    background: #fff;
    width: 206px;
    border-radius: 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-header {
      padding: 25px;
      border-bottom: 1px solid var(--color-border);

      &-logo {
        width: 116px;
        height: 13px;
        background: url('../assets/img/logo.png') 0 0 no-repeat;
        background-size: contain;
      }
    }
    &-nav {
      display: flex;
      flex-direction: column;
      padding: 25px;
      gap: 20px;

      a {
        color: #3F4773;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          color: #1D275B;
        }
      }
    }
    .logoutBtn,
    .loginBtn {
      padding: 25px;
      color: #3F4773;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        color: #1D275B;
      }
    }
  }
  &__dashboard {
    width: auto;
  }
  &__chat {
    width: 540px;
  }
}
</style>