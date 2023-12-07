import axios from '@/services/axios'

export const apiLogin = async (user: ILoginForm) => {
	const { data } = await axios.post('/login', user)
	return data
}

export const apiLoginWithToken = async () => {
	if (localStorage.getItem('token')) {
		const { data } = await axios.get('/user')
		return data
	} else {
		throw new Error()
	}
}

export const apiRegister = async (user: IRegisterForm) => {
	const { data } = await axios.post('/register', user)
	return data
}

export const apiUpdateUserPreferences = async (preferences: IPreferencesForm) => {
	const { data } = await axios.post('/preferences', preferences)
	return data
}

export const apiGetNews = async (params: string[]) => {
	const { data } = await axios.get(`/news?${params.join('&')}`)
	return data
}
