<template>
  <div class="contentpage">
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Settings</h1>
    </div>
    <div class="contentpage__content">
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
            <td class="" :title="connection.name">{{ connection.name }}</td>
            <td class="" :title="connection.name">{{ connection.id }}</td>
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
            <td class="" :title="intergration.name">{{ intergration.name }}</td>
            <td class="" :title="intergration.name">{{ intergration.params['API key'] }}</td>
            <td class="" :title="intergration.name">{{ intergration.params.Domain }}</td>
            <td class="" :title="intergration.name">{{ intergration.id }}</td>
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
            <td class="" :title="agent.name">{{ agent.name }}</td>
            <td class="" :title="agent.name">{{ agent.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useSettingsStore } from '../stores/settings'

  const settingsStore = useSettingsStore()

  const agents = computed(() => settingsStore.agents)
  const connections = computed(() => settingsStore.connections)
  const intergrations = computed(() => settingsStore.intergrations)

  onMounted(() => {
    settingsStore.setAgents()
    settingsStore.setConnections()
    settingsStore.setIntergrations()
  })

</script>

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
</style>