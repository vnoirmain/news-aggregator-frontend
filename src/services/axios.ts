import axios from 'axios'
import { API_URL } from '@/lib/config'

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')

	config.headers.Authorization = `Bearer ${token}`

	return config
})

export default instance
