<script setup>
  import { computed, onMounted, watch } from 'vue'
  import { useCallsStore } from '../../stores/callsModule'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'
  const callsDetails = computed(() => callsStore.callsDetails)
  const callsStore = useCallsStore()
  const route = useRoute()
  const router = useRouter()

  const getDataWithParams = async () => {
    const queryParams = router.currentRoute.value.query
    callsStore.setCallsDetails(route.params.id, queryParams)
  }

  watch(() => router.currentRoute.value, getDataWithParams)
  onMounted(() => getDataWithParams())
</script>

<template>
  <div class="ui">
    <div class="ui__header">
      <!-- <h1 class="ui__title">{{callsDetails[0]?.user_name}}</h1> -->
      <h3 class="ui__subtitle">Оценка звонков менджера</h3>
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
          <th>Звонок</th>
          <th>Оценка</th>
          <th>Невербалка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="call in callsDetails" :key="call.call_id">
          <td><router-link :to="'/chat/call/' + call.call_id">{{ call.call_time }} ({{ call.call_name }})</router-link></td>
          <td class="text-bold">{{ call.call_score }}</td>
          <td class="text-bold"><span class="text-bold" :class="[call.call_score > 0 ? 'text-green' : 'text-red']">{{ call.assessment_result }}</span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style lang="scss" scoped>

</style>