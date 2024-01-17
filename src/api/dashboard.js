import axios from 'axios'

export async function getDashboard() {
  const responce = await axios.get(`${import.meta.env.VITE_BASE_URL}/adaptive-ui/html`)
  return responce.data
}
