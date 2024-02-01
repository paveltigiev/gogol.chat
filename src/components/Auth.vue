<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

const handleLoginWithGoogle = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__logo"></div>
    <h1 class="auth__title">Welcome</h1>
    <form class="auth__form" @submit.prevent="handleLogin">
      <input class="inputField" required type="email" placeholder="Email address" v-model="email" />
      <input
        type="submit"
        class="formButton"
        :value="loading ? 'Loading' : 'Sign in with email'"
        :disabled="loading"
      />
    </form>
    <div class="separator">
      <span>Or</span>
    </div>
    <button type="button" class="googleAuthButton" @click="handleLoginWithGoogle">
      <span class="googleAuthButton__logo"></span>
      <span class="googleAuthButton__text">Sign in with Google</span>
    </button>
    <footer class="footer">
      <a href="#" target="_blank">Terms of use</a>
      |
      <a href="#" target="_blank">Privacy policy</a>
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
  padding: 0 40px;

  &__logo {
    width: 100px;
    height: 100px;
    background: url('../assets/img/ai.png') center center no-repeat;
    background-size: contain;
    border-radius: 50%;
  }
  &__title {
    font-weight: bold;
    font-size: 32px;
    margin: 20px 0;
    text-align: center;
    letter-spacing: 0.04em;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .inputField {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      border-radius: 6px;
      transition: box-shadow .2s ease-in-out, border-color .2s ease-in-out;
      background-color: #fff;
      background-color: transparent;
      border: 1px solid #c2c8d0;
      font-size: 16px;
      height: 52px;
      padding: 16px 22px;
      etter-spacing: -0.02em;
    }
    .formButton {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      outline: none;
      cursor: pointer;
      background-color: #613dc4;
      color: #ffffff;
      border: 0;
      border-radius: 6px;
      font-size: 16px;
      height: 52px;
      padding: 16px 22px;
      transition: background-color .25s ease-in-out,box-shadow .25s ease-in-out;
    }
  }
  .separator {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    border: none;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 24px 0 0;
    align-items: center;

    span {
      text-align: center;
      flex: 0.2 0 auto;
      margin: 0;
    }

    &:before, &:after {
      content: "";
      border-bottom: 1px solid #c2c8d0;
      flex: 1 0 auto;
      height: 0.1em;
      margin: 0;
    }
  }
  .googleAuthButton {
    margin-top: 24px;
    position: relative;
    display: flex;
    padding: 0 8px 0 52px;
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

    &:hover {
      box-shadow: inset 0 0 0 150px rgba(0,0,0,.1);
    }

    &__logo {
      position: absolute;
      left: 26px;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50%;
      background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 48 48'%3E%3Cdefs%3E%3Cpath id='a' d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'/%3E%3C/defs%3E%3CclipPath id='b'%3E%3Cuse xlink:href='%23a' overflow='visible'/%3E%3C/clipPath%3E%3Cpath clip-path='url(%23b)' fill='%23FBBC05' d='M0 37V11l17 13z'/%3E%3Cpath clip-path='url(%23b)' fill='%23EA4335' d='M0 11l17 13 7-6.1L48 14V0H0z'/%3E%3Cpath clip-path='url(%23b)' fill='%2334A853' d='M0 37l30-23 7.9 1L48 0v48H0z'/%3E%3Cpath clip-path='url(%23b)' fill='%234285F4' d='M48 48L17 24l-4-3 35-10z'/%3E%3C/svg%3E");
    }
    &__text {

    }
  }
  .footer {
    display: none;
  }
}
</style>
