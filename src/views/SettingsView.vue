<script setup>
  import { computed, onMounted } from 'vue'
  import { useSettingsStore } from '../stores/settingsModule'
  import { useUserStore } from '../stores/userModule'

  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const totalTokens = 10000

  const user = computed(() => userStore.user )
  const agents = computed(() => settingsStore.agents )
  const connections = computed(() => settingsStore.connections )
  const intergrations = computed(() => settingsStore.intergrations )
  const transactions = computed(() => settingsStore.transactions )
  const availablePercent = computed(() => user.value.balance / totalTokens * 100 )

  onMounted(() => {
    settingsStore.setAgents()
    settingsStore.setConnections()
    settingsStore.setIntergrations()
    settingsStore.setTransactions()
  })

</script>

<template>
  <div class="contentpage">
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Settings</h1>
    </div>
    <div class="contentpage__content">
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


      <h3>Connections</h3>
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="connection in connections" :key="connection.id">
            <td :title="connection.name">{{ connection.name }}</td>
            <td :title="connection.name">{{ connection.id }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Intergrations</h3>
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>API key</th>
            <th>Domain</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="intergration in intergrations" :key="intergration.id">
            <td :title="intergration.name">{{ intergration.name }}</td>
            <td :title="intergration.name">{{ intergration.params['API key'] }}</td>
            <td :title="intergration.name">{{ intergration.params.Domain }}</td>
            <td :title="intergration.name">{{ intergration.id }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Agents</h3>
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agent in agents" :key="agent.id">
            <td :title="agent.name">{{ agent.name }}</td>
            <td :title="agent.name">{{ agent.id }}</td>
          </tr>
        </tbody>
      </table>

      <h3>Billing</h3>
      <table class="tbl">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trx in transactions" :key="trx.id">
            <td :title="trax.created_at">{{ trax.created_at }}</td>
            <td :title="trax.created_at">{{ trax.from }}</td>
            <td :title="trax.created_at">{{ trax.to }}</td>
            <td :title="trax.created_at">{{ trax.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contentpage {
    &__header {
      display: flex;
      flex-direction: column;
      padding-top: 12px;
      padding-right: 24px;
      padding-bottom: 12px;
      padding-left: 24px;
      row-gap: 8px;
      column-gap: 8px;
      border-bottom: 1px solid #e4e4e4;

      &-title {
        font-size: 24px;
        line-height: 32px;
        color: #202123;
        font-weight: 700;
      }
    }
    &__content {
      max-width: 1000px;
      padding: 24px;
    }
  }

  .tbl {
    font-size: 15px;
    opacity: 1;
    transition: opacity .3s;
    border-collapse: collapse;
    display: table;
    -webkit-border-horizontal-spacing: 2px;
    -webkit-border-vertical-spacing: 2px;
    border-top-color: gray;
    text-indent: initial;

    th {
      white-space: nowrap;
      border: none;
      color: #202123;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      line-height: 16px;
      padding: 6px 8px;
      text-align: left;
      text-transform: uppercase;

      &:first-child {
        padding-left: 0;
      }
    }
    td {
      max-width: 120px;
      min-width: 120px;
      padding: 8px;
      line-height: 1;
      vertical-align: middle;
      white-space: nowrap;
      width: 100%;

      border: none;
      border-top: 1px solid #ececf1 !important;
      color: #565869;
      overflow: hidden;
      text-overflow: ellipsis;

      &:first-child {
        padding-left: 0;
      }
    }
  }
  h3 {
    font-size: 20px;
    line-height: 28px;
    color: #202123;
    font-weight: 700;
    margin: 30px 0 16px;
  }

  .balance {
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