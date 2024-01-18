<script setup>
import { ref, computed } from 'vue';
import ChatBox from '../components/ChatBox.vue'
import { useCommonsStore } from '../stores/commons'

const commonsStore = useCommonsStore()
const overlay = computed(() => commonsStore.overlay)
const sidebarOpened = ref(false)

const toggleSidebar = () => {
  sidebarOpened.value = !sidebarOpened.value
  commonsStore.overlay = !overlay.value
}
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="nav-mobile-button" @click="toggleSidebar()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor"></path></svg>
      </div>
      <div class="main__sidebar" :class="[sidebarOpened ? 'active' : 'inactive']">
        <div class="main__sidebar-closeBtn" @click="toggleSidebar()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
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
  gap: 16px;

  .nav-mobile-button {
    display: none;
  }

  &__sidebar {
    background: var(--color-background-sidebar);
    width: 260px;
    padding: .875rem .75rem .75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;

    &-closeBtn {
      display: none;
    }

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
        color: #fff;

        &.active {
          background: #19191B;
          &:hover {
            background: #19191B;
          }
        }

        &:hover {
          background: hwb(240 4% 96%);
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
      color: #fff;

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
        background: hwb(240 4% 96%);
      }
    }
  }
  &__chat {
    flex: 1;
    padding:3rem 3rem 0 1.5rem;
    height: 100vh;
  }
}
@media screen and (max-width: 1024px) {
  .main {
    gap: 8px;

    // &__sidebar {
    //   width: 180px;
    // }
    &__chat {
      padding:1rem 1rem 0 .5rem;
    }
  }
}
@media screen and (max-width: 640px) {
  .main {
    gap: 0px;

    .nav-mobile-button{
      position: absolute;
      z-index: 999;
      display: block;
      top: 6px;
      left: 10px;
    }

    &__sidebar {
      position: absolute;
      left: -320px;
      width: 260px;
      z-index: 999;
      transition: left 0.4s ease;

      &-closeBtn {
        position: absolute;
        right: -56px;
        width: 40px;
        height: 40px;
        border: 2px solid rgb(217, 217, 227);
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          color: rgb(255, 255, 255);
        }
      }

      &.active {
        left: 0;
      }
    }
    &__chat {
      padding: 2rem 1rem 0 0.8rem;
    }
  }
}
</style>
