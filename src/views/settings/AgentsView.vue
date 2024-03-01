<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useSettingsStore } from '../../stores/settingsModule'
  import ModalDialog from '@/components/ModalDialog.vue'
  import router from '../../router'

  const settingsStore = useSettingsStore()
  const dialogVisible = ref(false)
  const agent = ref({})

  const agents = computed(() => {
    const clonedAgents = [...settingsStore.agents]
    clonedAgents.sort((a, b) => a.agents_definition_params.meta.order - b.agents_definition_params.meta.order)
    return clonedAgents
  })

  const handleOpenAgent = (item) => {
    dialogVisible.value = true
    agent.value = item
  }

  const handleCloseModal = () => {
    dialogVisible.value = false
    agent.value = {}
  }
  const handleChatWithAgent = async (agent) => {
    await settingsStore.setAgent(agent.agent_id)
    router.push('/chat')
  }

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
        {{ agent.agent_name }}
      </template>
      <template v-slot:subtitle>
      </template>
      <template v-slot:body>
        <div v-html="agent.agents_definition_params.meta.full_desc"></div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-sm btn-filled btn-neutral modal-button" @click="handleCloseModal">Cancel</button>
        <a href="/chat?agent_id=3" class="btn btn-sm btn-filled btn-primary modal-button">Chat with agent</a>
      </template>
    </modal-dialog>
    <div class="contentpage__header">
      <h1 class="contentpage__header-title">Agents</h1>
    </div>
    <div class="contentpage__content">
      <div class="title-container">
        <p>Here you can discover available agents</p>
      </div>

      <div class="agents wide-grid">
        <div class="agents__item" v-for="agent in agents" :key="agent.id" @click="handleOpenAgent(agent)">
          <div class="agents__item-logo">
            <img :src="agent.agents_definition_params.meta.image_path" v-if="agent.agents_definition_params.meta.image_path">
          </div>

          <h3 class="agents__item-title">{{ agent.agent_name }}</h3>
          <h4 class="agents__item-subtitle">{{ agent.agents_definition_params.meta.short_desc }}</h4>

          <div class="agents__item-integration" v-html="agent.agents_definition_params.meta.comment"></div>

          <div class="agents__item-status" :class="agent.role"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
