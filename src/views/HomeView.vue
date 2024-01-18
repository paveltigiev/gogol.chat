<script setup>
import ChatBox from '../components/ChatBox.vue'
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
    padding:3rem 3rem 3rem 1.5rem;
    height: 100vh;
  }
}
</style>
