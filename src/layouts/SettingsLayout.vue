<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useChatsStore } from '../stores/chatsModule'
  import { useCommonsStore } from '../stores/commons'
  import { useUserStore } from '../stores/userModule'
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


  const newChat = () => chatsStore.chat = null
  const logout = () => authStore.setLogout()

  onMounted(() => {

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
          <router-link to="/chat" class="main__sidebar-backBtn">
            back
          </router-link>
          <div class="main__sidebar-nav iconed">
            <router-link class="main__sidebar-nav--link iconed" to="/settings/connections">
              <div class="icon">
                <img src="../assets/img/connections.svg" alt="connections"/>
              </div>
              Connections
            </router-link>
            <router-link class="main__sidebar-nav--link iconed" to="/settings/billing">
              <div class="icon">
                <img src="../assets/img/billing.svg" alt="billing"/>
              </div>
              Usage & Billing
            </router-link>
            <router-link class="main__sidebar-nav--link iconed" to="/settings">
              <div class="icon">
                <img src="../assets/img/settings.svg" alt="settings"/>
              </div>
              Settings
            </router-link>
            <router-link class="main__sidebar-nav--link iconed" to="/settings">
              <div class="icon">
                <img src="../assets/img/docs.svg" alt="docs"/>
              </div>
              Docs & Help
            </router-link>
            <router-link class="main__sidebar-nav--link iconed" to="/settings/agents">
              <div class="icon">
                <img src="../assets/img/agents.svg" alt="agents"/>
              </div>
              Agents
            </router-link>
          </div>
        </div>
        <div class="main__sidebar-bottom_nav--container">
          <div class="userBtn" :class="[userMenuOpened? 'active': 'inactive']" @click="userMenuOpened = !userMenuOpened">
            <div class="userBtn__img">
              <img :src="user.avatar_url" alt="user.full_name" v-if="user.avatar_url">
            </div>
            <div class="userBtn__name">{{ user.full_name || user.name }}</div>
          </div>
          <div class="userMenu" :class="[userMenuOpened? 'active': 'inactive']" v-if="userMenuOpened">
            <nav>
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
  &__sidebar {
    &-nav {
      &--link {
        &.active,
        &.router-link-exact-active {
          background: #F5F5F5;
          color: #121214;

          .icon {
            img {
              filter: brightness(0%);
            }
          }

          &::after {
            position: absolute;
            content: '';
            background-image: linear-gradient(to left, #F5F5F5 0%, transparent);
            width: 3rem;
            top: 0;
            bottom: 0;
            right: 0;
          }
          &:hover {
            background: #F5F5F5;
            &::after {
              background-image: linear-gradient(to left, #F5F5F5 0%, transparent);
            }
          }
        }
      }
    }
  }
}
</style>
