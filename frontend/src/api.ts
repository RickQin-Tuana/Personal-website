import axios from 'axios'

/**
 * 后端 API 基础地址
 * 开发环境下通过 Vite 代理转发到 PHP 后端（见 vite.config.ts）
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://personal-website-production-63c7.up.railway.app',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

export interface WorkItem {
  id: number
  title: string
  type: string
  description: string
  cover: string
  date?: string
}

/**
 * 获取作品列表
 * @returns 作品数据数组
 */
export async function fetchWorks(): Promise<WorkItem[]> {
  const response = await apiClient.get<ApiResponse<WorkItem[]>>('/Home/Api/works')

  if (response.data.code !== 200 || !Array.isArray(response.data.data)) {
    throw new Error(response.data.message || '获取作品列表失败')
  }

  return response.data.data
}

/**
 * 提交联系表单
 * @param data 表单数据
 * @returns 提交成功的响应数据
 */
export async function submitMessage(data: ContactFormData): Promise<ApiResponse<{ id: number }>> {
  const params = new URLSearchParams()
  params.append('name', data.name.trim())
  params.append('email', data.email.trim())
  params.append('message', data.message.trim())

  const response = await apiClient.post<ApiResponse<{ id: number }>>(
    '/Home/Api/messages',
    params
  )

  if (response.data.code !== 200) {
    const error: Error & { responseData?: ApiResponse; errors?: ContactFormErrors } = new Error(
      response.data.message || '提交失败，请稍后重试'
    )
    error.responseData = response.data
    error.errors = (response.data.data as { errors?: ContactFormErrors })?.errors
    throw error
  }

  return response.data
}

export default apiClient
