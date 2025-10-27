import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://test-task-server-production-3257.up.railway.app',
  timeout: 10000,
})
