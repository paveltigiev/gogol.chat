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
            <a href="#" class="active">Link to chat</a>
            <a href="#">Link to chat</a>
            <a href="#">Link to chat</a>
          </div>
        </div>
        <div>
          <div class="userBtn">
            <div class="userBtn__img"></div>
            <div class="userBtn__name">Inocentii</div>
          </div>
        </div>
      </div>
      <div class="main__dashboard">
        <div class="data" v-html="code" v-if="!commonsStore.loading"></div>
        <div class="loading" v-else></div>
      </div>
      <div class="main__chat">
        <chat-box />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: red !important;
}
.main {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  &__sidebar {
    background: var(--color-background-sidebar);
    width: 260px;
    padding: .875rem .75rem .75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;

    &-header {
      &-logo {
        width: 100%;
        height: 40px;
        background: url('../assets/img/logo.svg') 0 0 no-repeat;
        background-size: contain;
      }
    }
    &-nav {
      display: flex;
      flex-direction: column;
      margin-top: 1.25rem;

      a {
        align-items: center;
        display: flex;
        gap: .5rem;
        padding: .5rem;
        text-decoration: none;
        border-radius: .5rem;
        font-size: .875rem;
        line-height: 1.25rem;

        &.active {
          background: var(--color-background);
          &:hover {
            background: var(--color-background);
          }
        }

        &:hover {
          background: #020203;
        }
      }
    }
    .userBtn {
      display: flex;
      align-items: center;
      gap: .5rem;
      padding: .5rem;
      text-decoration: none;
      border-radius: .5rem;
      text-decoration: none;
      cursor: pointer;
      gap: 8px;

      &__img {
        width: 32px;
        height: 32px;
        background: #fff;
        border-radius: 50%;
      }
      &__text {
        font-size: .875rem;
        line-height: 1.25rem;
      }

      &:hover {
        background: #020203;
      }
    }
  }
  &__dashboard {
    flex: 1;
    padding: 1.5rem 0;
    height: 100vh;

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      background: url(../../public/loading.gif) center center no-repeat;
      background-size: 64px;
    }
  }
  &__chat {
    flex: 1;
    padding: 1.5rem 1.5rem 1.5rem 0;
    height: 100vh;
  }
}
</style>
