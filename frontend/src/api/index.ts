import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/Home/Api',
  timeout: 10000
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const fetchWorks = async () => {
  try {
    const response = await api.get('/works')
    const result = response.data
    if (result && result.code === 200 && Array.isArray(result.data) && result.data.length > 0) {
      return result.data
    }
    return null
  } catch {
    return null
  }
}

export const submitMessage = async (data: { name: string; email: string; message: string }) => {
  try {
    const response = await api.post('/messages', data)
    const result = response.data
    if (result && result.code === 200) {
      return result
    }
    return null
  } catch {
    return null
  }
}

export default api
