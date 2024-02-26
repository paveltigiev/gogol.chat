<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useSettingsStore } from '../../stores/settingsModule'
  import ModalDialog from '@/components/ModalDialog.vue'

  const settingsStore = useSettingsStore()
  const dialogVisible = ref(false)
  const agent = ref({})

  const agents = computed(() => settingsStore.agents )

  const handleOpenAgent = (item) => {
    dialogVisible.value = true
    agent.value = item
  }

  const handleCloseModal = () => {
    dialogVisible.value = false
    agent.value = {}
  }
  const handleChatWithAgent = () => null

  onMounted(() => {
    settingsStore.setAgents()
  })
</script>

<template>
  <div class="contentpage">
    <modal-dialog
      :visible="dialogVisible"
      @close-modal="handleCloseModal"
    >
      <template v-slot:title>
        {{ agent.name }}
      </template>
      <template v-slot:subtitle>
        ...
      </template>
      <template v-slot:body>
        {{ agent.name }}
      </template>
      <template v-slot:footer>
        <button class="btn btn-sm btn-filled btn-neutral modal-button" @click="handleCloseModal">Cancel</button>
        <button class="btn btn-sm btn-filled btn-primary modal-button" @click="handleChatWithAgent">chat with agent</button>
      </template>
    </modal-dialog>
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Agents</h1>
    </div>
    <div class="contentpage__content">
      <div class="title-container">
        <p>Here you can discover available agents</p>
      </div>

      <div class="agents">
        <div class="agents__item" v-for="agent in agents" :key="agent.id" @click="handleOpenAgent(agent)">
          <h3 class="agents__item-title">{{ agent.name }}</h3>
          <h4 class="agents__item-subtitle">Update your CRM just from chat</h4>

          <div class="agents__item-integration">integrations needed: {{ agent.integration }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .agents {
    display: flex;
    gap: 30px;

    &__item {
      position: relative;
      border: 1px solid #D1D1D1;
      border-radius: 7px;
      padding: 20px;
      width: 33%;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 15px;
        right: 20px;
        width: 38px;
        height: 38px;
        background: url('../../assets/img/info.svg') right 0 no-repeat;
      }

      &-title {
        margin: 0;
        font-style: 16px;
      }
      &-subtitle {
        margin: 0 0 50px;
        font-style: 14px;
        font-weight: 400;
      }
    }
  }
</style>