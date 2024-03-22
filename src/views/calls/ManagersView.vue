<script setup>
  import { computed, onMounted, watch } from 'vue'
  import { useCallsStore } from '../../stores/callsModule'
  import { useRouter } from 'vue-router'
  const callsStore = useCallsStore()
  const router = useRouter()
  const callsAggregatedData = computed(() => callsStore.callsAggregatedData)

  const getDataWithParams = async () => {
    const queryParams = router.currentRoute.value.query
    await callsStore.setCallsAggregatedData(queryParams)
  }

  watch(() => router.currentRoute.value, getDataWithParams)
  onMounted(() => getDataWithParams())
</script>

<template>
    <div class="ui">
      <div class="ui__header">
        <h1 class="ui__title">Оценка новых звонков</h1>
        <h3 class="ui__subtitle">Статистика обработки новых входящих звонков</h3>

        <div class="ui__header-settings">
          <div class="ui__header-settings--card date">01 янв 24 - 31 Mar 24</div>
        </div>
      </div>

      <div class="ui__stats">
        <div class="ui__stats-card">
          <div class="ui__stats-card--value">393</div>
          <div class="ui__stats-card--title">всего звонков</div>
        </div>
        <div class="ui__stats-card">
          <div class="ui__stats-card--value">73.25</div>
          <div class="ui__stats-card--title">средний бал</div>
        </div>
      </div>

      <table class="ui__table">
        <thead>
          <tr>
            <th>Менеджер</th>
            <th>Звонков</th>
            <th>Средний бал</th>
            <th>Невербалка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manager in callsAggregatedData" :key="manager.user_name">
            <td>
              <router-link :to="'/chat/calls/' + manager.user_id">
                {{ manager.user_name }}
              </router-link>
            </td>
            <td>128</td>
            <td class="text-bold">{{ manager.avg_score }}</td>
            <td>
              <span class="text-green text-bold">{{ manager.positive_count }}</span> /
              <span class="text-bold">{{ manager.neutral_count }}</span> /
              <span class="text-red text-bold">{{ manager.negative_count }}</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
</template>

<style lang="scss" scoped>

</style>