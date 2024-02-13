<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useChatsStore } from '../stores/chatsModule'
  import { useCommonsStore } from '../stores/commons'
  import { useUserStore } from '../stores/user'
  import { useAuthStore } from '../stores/auth'

  const commonsStore = useCommonsStore()
  const chatsStore = useChatsStore()
  const userStore = useUserStore()
  const authStore = useAuthStore()

  const overlay = computed(() => commonsStore.overlay)
  const chats = computed(() => chatsStore.chats.reverse())
  const chat = computed(() => chatsStore.chat )
  const user = computed(() => userStore.user )

  const userMenuOpened = ref(false)
  const sidebarOpened = ref(false)

  const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value
    commonsStore.overlay = !overlay.value
  }

  const changeChat = (id) => chatsStore.setChat(id)
  const newChat = () => chatsStore.chat = null
  const logout = () => authStore.setLogout()

  onMounted(() => {
    chatsStore.setChats()
  })
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
        <div class="main__sidebar-nav--container">
          <div class="main__sidebar-header">
            <router-link to="/chat" class="main__sidebar-header-logo" />
            <button class="main__sidebar-header-newChatBtn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md" @click="newChat"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z" fill="currentColor"></path></svg>
            </button>
          </div>
          <div class="main__sidebar-nav">
            <router-link
              v-for="cht in chats"
              :key="cht.id"
              @click="changeChat(cht.id)"
              class="main__sidebar-nav--link"
              :class="[chat && chat.id == cht.id ? 'active' : '']"
              to="/chat"
            >
              {{ cht.name }}
            </router-link>
          </div>
        </div>
        <div class="main__sidebar-bottom_nav--container">
          <div class="userBtn" :class="[userMenuOpened? 'active': 'inactive']" @click="userMenuOpened = !userMenuOpened">
            <div class="userBtn__img"></div>
            <div class="userBtn__name">{{ user.full_name }}</div>
          </div>
          <div class="userMenu" :class="[userMenuOpened? 'active': 'inactive']" v-if="userMenuOpened">
            <nav>
              <router-link class="userMenu__item" to="/settings" @click="userMenuOpened = false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path d="M11.6439 3C10.9352 3 10.2794 3.37508 9.92002 3.98596L9.49644 4.70605C8.96184 5.61487 7.98938 6.17632 6.93501 6.18489L6.09967 6.19168C5.39096 6.19744 4.73823 6.57783 4.38386 7.19161L4.02776 7.80841C3.67339 8.42219 3.67032 9.17767 4.01969 9.7943L4.43151 10.5212C4.95127 11.4386 4.95127 12.5615 4.43151 13.4788L4.01969 14.2057C3.67032 14.8224 3.67339 15.5778 4.02776 16.1916L4.38386 16.8084C4.73823 17.4222 5.39096 17.8026 6.09966 17.8083L6.93502 17.8151C7.98939 17.8237 8.96185 18.3851 9.49645 19.294L9.92002 20.014C10.2794 20.6249 10.9352 21 11.6439 21H12.3561C13.0648 21 13.7206 20.6249 14.08 20.014L14.5035 19.294C15.0381 18.3851 16.0106 17.8237 17.065 17.8151L17.9004 17.8083C18.6091 17.8026 19.2618 17.4222 19.6162 16.8084L19.9723 16.1916C20.3267 15.5778 20.3298 14.8224 19.9804 14.2057L19.5686 13.4788C19.0488 12.5615 19.0488 11.4386 19.5686 10.5212L19.9804 9.7943C20.3298 9.17767 20.3267 8.42219 19.9723 7.80841L19.6162 7.19161C19.2618 6.57783 18.6091 6.19744 17.9004 6.19168L17.065 6.18489C16.0106 6.17632 15.0382 5.61487 14.5036 4.70605L14.08 3.98596C13.7206 3.37508 13.0648 3 12.3561 3H11.6439Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="2"></circle></svg>
                Settings
              </router-link>
              <div class="userMenu__item" @click="logout">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M20 12H11M20 12L16 16M20 12L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                Log out
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="main__container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  // gap: 16px;

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
      display: flex;
      justify-content: space-between;

      &-logo {
        width: 100%;
        height: 40px;
        background: url('../assets/img/logo.svg') 0 0 no-repeat;
        background-size: contain;
        margin-left: 0.5rem;
      }
      &-newChatBtn {
        color: #ececf1;
        background-color: transparent;
        background-image: none;
        border: 0;
        cursor: pointer;
        display: flex;
        align-items: center;

        svg {
          stroke-width: 1.5;
          height: 18px;
          width: 18px;
        }
      }
    }
    &-nav {
      display: flex;
      flex-direction: column;
      margin-top: 1.25rem;

      &--link {
        align-items: center;
        display: flex;
        gap: .5rem;
        padding: .5rem;
        text-decoration: none;
        border-radius: .5rem;
        font-size: .875rem;
        line-height: 1.25rem;
        color: #fff;
        cursor: pointer;

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
    .main__sidebar-bottom_nav--container {
      position: relative;
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
          background: #B22F5B url("/src/assets/img/user.svg") center center no-repeat;
          border-radius: 50%;
          background-size: 14px;
        }
        &__text {
          font-size: .875rem;
          line-height: 1.25rem;
        }

        &:hover, &.active {
          background: #202123;
        }
      }
      .userMenu {
        width: 100%;
        position: absolute;
        margin-bottom: .25rem;
        left: 0;
        z-index: 20;
        bottom: 100%;
        background-color: rgba(32,33,35,1);
        border: 1px solid rgba(52,53,65,1);
        outline: 2px solid transparent;
        outline-offset: 2px;
        opacity: 1;padding-top: .25rem;
        padding-bottom: .375rem;
        border-radius: .5rem;

        &__item {
          text-decoration: none;
          color: rgba(255,255,255,1);
          font-size: .875rem;
          line-height: 1.25rem;
          padding-bottom: .25rem;
          padding-top: .25rem;
          padding-left: .75rem;
          padding-right: .75rem;
          gap: .75rem;
          align-items: center;
          cursor: pointer;
          min-height: 44px;
          display: flex;

          &:hover {
            background-color: rgba(52,53,65,1);
          }

          .icon-md {
            stroke-width: 1.5;
            height: 18px;
            width: 18px;
            display: block;
            vertical-align: middle;
          }
        }
      }
    }
  }
  &__container {
    flex: 1;
    // padding:3rem 3rem 0 1.5rem;
    height: 100vh;
  }
}
@media screen and (max-width: 1024px) {
  .main {
    gap: 8px;

    // &__sidebar {
    //   width: 180px;
    // }
    // &__container {
    //   padding:1rem 1rem 0 .5rem;
    // }
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
    // &__container {
    //   padding: 2rem 1rem 0 0.8rem;
    // }
  }
}
</style>
../stores/chatsModule