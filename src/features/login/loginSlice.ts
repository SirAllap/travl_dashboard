import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { userLogin } from './loginThunks'

interface ILogin {
	email: string
	password: string
}

interface ILoginState {
	initialData: ILogin[]
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: ILoginState = {
	initialData: [],
	status: 'idle',
	error: null,
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
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
