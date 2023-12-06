import { configureStore } from '@reduxjs/toolkit'
import authSlice, { loginWithToken } from './slices/auth.slice'
import modalSlice from './slices/modal.slice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		modal: modalSlice,
	},
})

store.dispatch(loginWithToken())

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
