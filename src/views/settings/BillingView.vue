<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useSettingsStore } from '../../stores/settingsModule'
  import { useUserStore } from '../../stores/userModule'

  const userStore = useUserStore()
  const settingsStore = useSettingsStore()

  const user = computed(() => userStore.user )
  const transactions = computed(() => settingsStore.transactions )
  const totalTokens = computed(() => settingsStore.totalTokens )
  const availablePercent = computed(() => user.value.balance / totalTokens.value * 100 )

  onMounted(() => {
    settingsStore.setTransactions()
  })
</script>

<template>
  <div class="contentpage">
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Usage & Billing</h1>
    </div>

    <div class="contentpage__content">
      <div class="title-container">
        <p>Token is the fuel of Gogol.Chat. You can run and use any assistants with tokens. Here is your billing and usage data.</p>
      </div>
      <div class="balance">
        <h3 class="balance__title">Balance:&nbsp;<span>{{ user.balance }} tokens</span></h3>

        <div class="credit-grant-legend">
          <div class="credit-grant-legend-item">
            <div class="credit-grant-legend-color credit-grant-bg-grants"></div>
            <div>Available</div>
          </div>
          <div class="credit-grant-legend-item">
            <div class="credit-grant-legend-color credit-grant-bg-expired"></div>
            <div>Used</div>
          </div>
        </div>

        <div class="credit-grant-month-tokens">
          <div class="credit-grant-progress-bar">
            <div class="credit-grant-progress-bar-series credit-grant-bg-grants" :style="{ width: availablePercent + '%' }"></div>
            <div class="credit-grant-progress-bar-series credit-grant-bg-expired" :style="{ width: 100 - availablePercent + '%' }"></div>
          </div>
          <div class="credit-grant-total-tokens">
            <span class="credit-grant-has-tooltip" aria-haspopup="true" aria-expanded="false">{{ user.balance }} / {{ totalTokens }}</span>
          </div>
        </div>
      </div>


      <h3>Tokens topus</h3>
      <div class="title-container">
        <p>Token is the fuel of Gogol.Chat. You can run and use any assistants with tokens. Here is your billing and usage data.</p>
      </div>
      <table class="tbl">
        <thead>
          <tr>
            <th>From</th>
            <th>Recieved</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trx in transactions" :key="trx.id">
            <td :title="trax.created_at">{{ trax.from }}</td>
            <td :title="trax.created_at">{{ trax.created_at }}</td>
            <td :title="trax.created_at">{{ trax.to }}</td>
            <td :title="trax.created_at">{{ trax.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .balance {
    margin-bottom: 60px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
      display: flex;
      margin-bottom: 1rem;
      margin-right: 5px;

      span {
        font-weight: normal;
      }
    }
  }

  .credit-grant-legend {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    line-height: 1;
    margin: 0 0 12px;
  }
  .credit-grant-legend-item {
    align-items: center;
    display: flex;
    font-size: 14px;
    margin-right: 1em;
  }
  .credit-grant-bg-grants {
    background-color: #67c5ae;
  }
  .credit-grant-bg-expired {
    background-color: #f6b2b3;
  }
  .credit-grant-legend-color {
    border-radius: 2px;
    height: 12px;
    margin-right: 4px;
    margin-top: -1px;
    width: 12px;
  }

  .credit-grant-month-tokens {
    display: flex;
    margin-bottom: 1rem;
  }
  .credit-grant-month-tokens .credit-grant-progress-bar {
    background-color: #ececf1;
    border-radius: 2px;
    display: flex;
    flex: 1 1;
    height: 1em;
    margin-right: 1em;
    margin-top: .5em;
    width: 100%;
  }
  .credit-grant-month-tokens .credit-grant-progress-bar-series {
    display: inline-block;
    height: 100%;
  }
  .credit-grant-month-tokens .credit-grant-progress-bar-series:first-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }
  .credit-grant-month-tokens .credit-grant-progress-bar-series:last-child {
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
  }
  .credit-grant-month-tokens .credit-grant-total-tokens {
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    line-height: 1;
    margin-top: .5em;
  }
  // .credit-grant-has-tooltip {
  //   border-bottom: 1px dotted #8e8ea0;
  // }
</style>