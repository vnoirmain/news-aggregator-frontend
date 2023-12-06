import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IModal {
	isSignInModalOpen: boolean
	isSignUpModalOpen: boolean
	loading: boolean
}

const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isSignInModalOpen: false,
		isSignUpModalOpen: false,
		loading: false,
	} as IModal,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
			return state
		},
		setSignInModalOpen(state, action: PayloadAction<boolean>) {
			state.isSignInModalOpen = action.payload
			return state
		},
		setSignUpModalOpen(state, action: PayloadAction<boolean>) {
			state.isSignUpModalOpen = action.payload
			return state
		},
	},
})

export const { setLoading, setSignInModalOpen, setSignUpModalOpen } = modalSlice.actions

export default modalSlice.reducer
