import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { userLogin } from './loginThunks'

interface IUserInfo {
	email: string
	name: string
	role: string
	photo: string
}
interface ILoginState {
	loginInfo: IUserInfo
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: ILoginState = {
	loginInfo: {} as IUserInfo,
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
				state.error = null
			})
			.addCase(userLogin.rejected, (state) => {
				state.status = 'rejected'
				state.error = 'Login failed. Please try again.'
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.loginInfo = action.payload.payload.userInfo
				state.status = 'fulfilled'
				state.error = null
			})
	},
})

export default loginSlice.reducer

export const selectLoginInfo = (state: RootState) => state.login.loginInfo
export const initialLoginState = (state: RootState) => state.login.status
export const { resetState } = loginSlice.actions
