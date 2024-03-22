<script setup>
  import { computed, onMounted } from 'vue'
  import { useCallsStore } from '../../stores/callsModule'
  import { useRoute } from 'vue-router'
  const callsFullDetails = computed(() => callsStore.callsFullDetails)
  const callsStore = useCallsStore()
  const route = useRoute()

  onMounted(() => callsStore.setCallsFullDetails(route.params.id))
</script>

<template>
  <div class="ui">
    <div class="ui__header">
      <h1 class="ui__title">({{ callsFullDetails.call_name }})</h1>
      <h3 class="ui__subtitle">Оценка звонков менджера</h3>

      <h1 class="text-bold">Формальная оценка</h1>
    </div>

    <table class="ui__table">
      <thead>
        <tr>
          <th>Параметр</th>
          <th>Результат</th>
          <th>Оценка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meta in callsFullDetails.scoring_meta" :key="meta">
          <td>{{ meta.type }}</td>
          <td>{{ meta.value }}</td>
          <td>
            <span class="text-bold" :class="[meta.score > 0 ? 'text-green' : 'text-red']">{{ meta.score }}</span>
          </td>
        </tr>
        <tr>
          <td class="text-bold">Итог:</td>
          <td></td>
          <td>
            <span class="text-bold" :class="[callsFullDetails.scoring_total > 0 ? 'text-green' : 'text-red']">{{ callsFullDetails.scoring_total }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ui__calls-param">
      <h1 class="ui__calls-param--title">Вербальная оценка: <span class="text-green text-bold">хорошо</span></h1>
      <ul class="ui__calls-param--list">
        <li>Уверенный разговор</li>
        <li>Все фразы завершались вопросом</li>
        <li>Позитивный настрой</li>
      </ul>
    </div>

    <div class="ui__calls-param">
      <h1 class="ui__calls-param--title">Транскрипция разговора</h1>
      <div class="ui__calls-param--talk">
        <p v-for="r in callsFullDetails.transcript" :key="r"><i>{{ r.role }}:</i> {{ r.content }}</p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>