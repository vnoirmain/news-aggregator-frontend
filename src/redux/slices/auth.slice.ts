import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { apiLogin, apiLoginWithToken, apiRegister } from '@/api/user.api'

interface IAuth {
	isLoggedIn: boolean
	user?: any
	loading: boolean
}

export const login = createAsyncThunk('auth/login', async (user: ILoginForm) => {
	const data = await apiLogin(user)
	return data
})

export const loginWithToken = createAsyncThunk('auth/login-with-token', async () => {
	const data = await apiLoginWithToken()
	return data
})

export const register = createAsyncThunk('auth/register', async (user: IRegisterForm) => {
	const data = await apiRegister(user)
	return data
})

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		loading: false,
	} as IAuth,
	reducers: {
		logout(state) {
			state.isLoggedIn = false
			state.user = {}

			localStorage.removeItem('token')
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoggedIn = true
			state.user = action.payload.user
			state.loading = false

			localStorage.setItem('token', action.payload.accessToken)

			return state
		})

		builder.addCase(loginWithToken.fulfilled, (state, action) => {
			state.isLoggedIn = true
			state.user = action.payload
			state.loading = false

			return state
		})

		builder.addCase(register.fulfilled, (state, action) => {
			const { data } = action.payload

			state.isLoggedIn = true
			state.user = { name: data.name }
			state.loading = false

			localStorage.setItem('token', data.token)

			return state
		})

		builder.addMatcher(isAnyOf(login.pending, loginWithToken.pending, register.pending), (state) => {
			state.loading = true
			return state
		})

		builder.addMatcher(isAnyOf(login.rejected, loginWithToken.rejected, register.rejected), (state) => {
			state.loading = false
			state.isLoggedIn = false

			return state
		})
	},
})

export const { logout } = authSlice.actions

export default authSlice.reducer
