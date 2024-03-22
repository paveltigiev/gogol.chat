import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchCallsAggregatedData, fetchCallsDetails, fetchCallsFullDetails } from '../api/callsService.js'

export const useCallsStore = defineStore('calls', () => {
  const callsAggregatedData = ref([])
  const callsDetails = ref([])
  const callsFullDetails = ref({})

  const setCallsAggregatedData = async (params) => {
    callsAggregatedData.value = await fetchCallsAggregatedData(params)
  }

  const setCallsDetails = async (id, params) => {
    callsDetails.value = await fetchCallsDetails(id, params)
  }

  const setCallsFullDetails = async (id) => {
    callsFullDetails.value = await fetchCallsFullDetails(id)
  }

  return { setCallsAggregatedData, callsAggregatedData, callsDetails, setCallsDetails, callsFullDetails, setCallsFullDetails }
})
