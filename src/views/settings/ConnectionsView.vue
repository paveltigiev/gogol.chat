<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useSettingsStore } from '../../stores/settingsModule'
  import { useUserStore } from '../../stores/userModule'
  import ModalDialog from '@/components/ModalDialog.vue'

  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const dialogVisible = ref(false)

  const user = computed(() => userStore.user )
  const connections = computed(() => settingsStore.connections )
  const intergrations = computed(() => settingsStore.intergrations )

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
      integration_id: '',
      params: {
        URL: '',
        token: ''
      }
    }
  }

  const isFormValid = () => newConnection.value.integration_id && newConnection.value.params.URL && newConnection.value.params.token

  const handleCreateConnetion = () => {
    if (isFormValid) {
      const connection = {...newConnection.value, user_id: user.value.user_id}
      settingsStore.addConnection(connection)
      handleCloseModal()
    }
  }

  const handleEditConnetion = (connection) => {
    dialogVisible.value = true
    newConnection.value = connection
  }

  const handleDeleteConnetion = (connection) => {
    settingsStore.deleteConnection(connection)
  }

  const handleUpdateConnetion = () => {
    if (isFormValid) {
      settingsStore.updateConnection(newConnection.value)
      handleCloseModal()
    }
  }

  const getIntegration = (id) => intergrations.value.find(item => item.id === id)

  onMounted(() => {
    settingsStore.setConnections()
    settingsStore.setIntergrations()
  })
</script>

<template>
  <div class="contentpage">
    <modal-dialog
      :visible="dialogVisible"
      @close-modal="handleCloseModal"
    >
      <template v-slot:title>
        Create new connection
      </template>
      <template v-slot:subtitle>
        Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate
      </template>
      <template v-slot:body>
        <div class="form">
          <div>
            <label class="form-label mb-2" for="name"><span class="bold">Name</span></label>
            <input class="text-input text-input-sm text-input-full" type="text" placeholder="Connection name" maxlength="64" v-model="newConnection.name" name="name">
          </div>
          <div>
            <label class="form-label mb-2" for="intergration"><span class="bold">Integration</span></label>
            <select class="text-select text-select-sm text-select-full" name="intergration" v-model="newConnection.integration_id">
              <option v-for="intergration in intergrations" :key="intergration.id" :value="intergration.id">{{ intergration.name }}</option>
            </select>
          </div>
          <div>
            <label class="form-label mb-2" for="url"><span class="bold">URL</span></label>
            <input class="text-input text-input-sm text-input-full" type="text" :placeholder="getIntegration(newConnection.integration_id)?.params['URL'] || ''" maxlength="64" v-model="newConnection.params.URL" name="url">
          </div>
          <div>
            <label class="form-label mb-2" for="token"><span class="bold">Token</span></label>
            <input class="text-input text-input-sm text-input-full" type="text" :placeholder="getIntegration(newConnection.integration_id)?.params['API key'] || ''" maxlength="64" v-model="newConnection.params.token" name="token">
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-md btn-filled btn-neutral modal-button" @click="handleCloseModal">Cancel</button>
        <button class="btn btn-md btn-filled btn-primary modal-button" @click="handleUpdateConnetion" v-if="newConnection.id">Update connection</button>
        <button class="btn btn-md btn-filled btn-primary modal-button" @click="handleCreateConnetion" v-else>Create new connection</button>
      </template>
    </modal-dialog>
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Connections</h1>
    </div>
    <div class="contentpage__content">
      <div class="title-container">
        <p>Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate</p>
      </div>
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>INTEGRATION</th>
            <th>SECRET</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="connection in connections" :key="connection.id">
            <td :title="connection.name">{{ connection.name }}</td>
            <td>{{ getIntegration(connection.integration_id)?.name }}</td>
            <td>{{ connection.params?.token.substring(0, 4) }}....{{ connection.params?.token.slice(-4) }}</td>
            <td class="actions">
              <div class="btn editBtn" @click="handleEditConnetion(connection)"></div>
              <div class="btn deleteBtn" @click="handleDeleteConnetion(connection)"></div>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" tabindex="0" class="btn btn-lg btn-filled btn-neutral" @click="dialogVisible = true">
        <span class="btn-label-wrap">
          <span class="btn-node"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m-6-6h12"></path></svg></span>
          <span class="btn-label-inner">Create new connection</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>