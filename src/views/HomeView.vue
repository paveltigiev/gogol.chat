<script setup>

import { ref } from 'vue'
import ChatBox from '../components/ChatBox.vue'

const dashboard = ref(`
<div class="container mt-5">
    <!-- First Row -->
    <div class="row text-center">
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Deals Count</h5>
                    <p class="card-text">10</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Deal Total Value</h5>
                    <p class="card-text">$15,000</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Deals Avg</h5>
                    <p class="card-text">$1,500</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Second Row -->
    <div class="row">
        <div class="col-12">
            <table class="table">
                <thead>
                <tr>
                    <th>Manager Name</th>
                    <th>Deals Count</th>
                    <th>Deals Total Value</th>
                    <th>Average Deal Value</th>
                </tr>
                </thead>
                <tbody>
                <!-- Repeat this block for each manager -->
                <tr>
                    <td>Manager 1</td>
                    <td>5</td>
                    <td>$7,500</td>
                    <td>$1,500</td>
                </tr>
                <tr>
                    <td>Manager 2</td>
                    <td>3</td>
                    <td>$4,500</td>
                    <td>$1,500</td>
                </tr>
                <tr>
                    <td>Manager 3</td>
                    <td>2</td>
                    <td>$3,000</td>
                    <td>$1,500</td>
                </tr>
                <!-- End of manager block -->
                </tbody>
            </table>
        </div>
    </div>
</div>
`)

</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="main__sidebar">
        <div class="main__sidebar-header">
          <div class="main__sidebar-header-logo"></div>
        </div>
        <div class="main__sidebar-nav">
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </div>
      </div>
      <div class="main__dashboard">
        <div class="data" v-html="dashboard"></div>
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
  }
  &__dashboard {
    width: auto;
  }
  &__chat {
    width: 540px;
  }
}
</style>