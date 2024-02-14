<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useSettingsStore } from '../stores/settingsModule'
  import { useUserStore } from '../stores/userModule'
  import ModalDialog from '@/components/ModalDialog.vue'

  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const dialogVisible = ref(false)

  const user = computed(() => userStore.user )
  const agents = computed(() => settingsStore.agents )
  const connections = computed(() => settingsStore.connections )
  const intergrations = computed(() => settingsStore.intergrations )
  const transactions = computed(() => settingsStore.transactions )
  const totalTokens = computed(() => settingsStore.totalTokens )
  const availablePercent = computed(() => user.value.balance / totalTokens.value * 100 )

  const newConnection = ref({
    name: '',
    intergration: null,
    params: {
      URL: '',
      token: ''
    }
  })

  const handleCloseModal = () => {
    dialogVisible.value = false
    newConnection.value = {
      name: '',
      intergration: null,
      params: {
        URL: '',
        token: ''
      }
    }
  }

  const handleCreateConnetion = () => {
    if (newConnection.value.intergration && newConnection.value.params.URL && newConnection.value.params.token) {
      const connection = {
        name: newConnection.value.name,
        integration_id: newConnection.value.intergration.id,
        params: newConnection.value.params,
        user_id: user.value.user_id
      }

      settingsStore.addConnection(connection)
      handleCloseModal()
    }
  }

  onMounted(() => {
    settingsStore.setAgents()
    settingsStore.setConnections()
    settingsStore.setIntergrations()
    settingsStore.setTransactions()
  })
</script>

<template>
  <div class="contentpage">
    <modal-dialog
      :visible="dialogVisible"
      @close-modal="handleCloseModal"
    >
      <template v-slot:header>
        Create new connection
      </template>
      <template v-slot:body>
        <div class="form">
          <div>
            <label class="form-label mb-2" for="name"><span class="bold">Name</span> required</label>
            <input class="text-input text-input-sm text-input-full" type="text" placeholder="Connection name" maxlength="64" v-model="newConnection.name" name="name">
          </div>
          <div>
            <label class="form-label mb-2" for="intergration"><span class="bold">Integration</span> required</label>
            <select class="text-select text-select-sm text-select-full" name="intergration" v-model="newConnection.intergration">
              <option v-for="intergration in intergrations" :key="intergration.id" :value="intergration">{{ intergration.name }}</option>
            </select>
          </div>
          <div>
            <label class="form-label mb-2" for="url"><span class="bold">URL</span> required</label>
            <input class="text-input text-input-sm text-input-full" type="text" :placeholder="newConnection.intergration?.params['URL'] || ''" maxlength="64" v-model="newConnection.params.URL" name="url">
          </div>
          <div>
            <label class="form-label mb-2" for="token"><span class="bold">Token</span> required</label>
            <input class="text-input text-input-sm text-input-full" type="text" :placeholder="newConnection.intergration?.params['API key'] || ''" maxlength="64" v-model="newConnection.params.token" name="token">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-sm btn-filled btn-neutral modal-button" @click="handleCloseModal">Cancel</button>
        <button class="btn btn-sm btn-filled btn-primary modal-button" @click="handleCreateConnetion">Create connection</button>
      </template>
    </modal-dialog>
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

      <div class="title-container">
        <h3>Connections</h3>
        <button type="button" tabindex="0" class="btn btn-sm btn-filled btn-neutral" @click="dialogVisible = true">
          <span class="btn-label-wrap">
            <span class="btn-node"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m-6-6h12"></path></svg></span>
            <span class="btn-label-inner">Add new connection</span>
          </span>
        </button>
      </div>
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