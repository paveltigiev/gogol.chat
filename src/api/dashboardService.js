import axios from 'axios'

export async function getDashboard(url) {
  const responce = await axios.get(`${url}/adaptive-ui/html`)
  return responce.data
}
