<script setup>
import ChatBox from '../components/ChatBox.vue'
import { useDashboardStore } from '../stores/dashboard'
import { useCommonsStore } from '../stores/commons'
import { computed } from 'vue'

const dashboardStore = useDashboardStore()
const commonsStore = useCommonsStore()

const code = computed(() => dashboardStore.code)
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
          <div class="logoutBtn">Logout</div>
        </div>
      </div>
      <div class="main__dashboard">
        <div class="data" v-html="code" v-if="!commonsStore.loading"></div>
        <div v-else>Loading...</div>
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
    flex: 1;
  }
  &__chat {
    width: 540px;
  }
}
</style>