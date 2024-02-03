<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

</script>

<template>
  <div class="auth">
    <div class="auth__logo"></div>
    <div>
      <h1 class="auth__title">You are in the line</h1>

      <button type="button" class="logoutButton" @click="logOut">
        Log out
      </button>
    </div>
    <footer class="footer">
      <a href="https://gogol.chat/terms" target="_blank">Terms of use</a>
      |
      <a href="https://gogol.chat/policy" target="_blank">Privacy policy</a>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  width: 400px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 40px 20px;
  justify-content: space-between;
  text-align: center;

  &__logo {
    width: 34px;
    height: 34px;
    background: url('../assets/img/ai.png') center center no-repeat;
    background-size: contain;
    border-radius: 50%;
    margin: 0 auto;
  }
  &__title {
    font-weight: bold;
    font-size: 32px;
    margin: 0 0 20px;
    text-align: center;
    letter-spacing: 0.04em;
  }


  .logoutButton {
    margin-top: 24px;
    position: relative;
    display: flex;
    padding: 0 8px;
    background: transparent;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-family: inherit;
    height: 52px;
    border: 1px solid #c2c8d0;
    border-radius: 6px;
    color: #2d333a;
    cursor: pointer;
    outline: 0;
    transition: box-shadow .15s ease-in-out,background-color .15s ease-in-out;
    justify-content: center;

    &:hover {
      box-shadow: inset 0 0 0 150px rgba(0,0,0,.1);
    }

  }
  .footer {
    font-size: 14px;
    display: flex;
    gap: 10px;
    justify-content: center;

    a {
      color: #613dc4;
      text-decoration: none;
      letter-spacing: -0.02em;
    }
  }
}
</style>
