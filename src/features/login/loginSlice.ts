import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { userLogin } from './loginThunks'

interface ILoginState {
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: ILoginState = {
	status: 'idle',
	error: null,
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		resetState: (state) => {
			state.status = 'idle'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(userLogin.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.status = 'fulfilled'
			})
	},
})

export default loginSlice.reducer

export const initialLoginState = (state: RootState) => state.login.status
export const { resetState } = loginSlice.actions
