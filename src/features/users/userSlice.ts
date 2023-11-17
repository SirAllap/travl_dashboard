import { createSlice } from '@reduxjs/toolkit'
import {
	createOneUser,
	deleteUser,
	fetchInitialUsers,
	fetchOneUser,
} from './userThunks'
import { RootState } from '../../app/store'
import { IUser } from '../interfaces/interfaces'

interface UserState {
	initialUserFetch: IUser[]
	singleUserFetch: IUser
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	createUserStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	deleteUserStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: UserState = {
	initialUserFetch: [],
	singleUserFetch: {} as IUser,
	status: 'idle',
	createUserStatus: 'idle',
	deleteUserStatus: 'idle',
	error: 'null',
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		resetState: (state) => {
			state.createUserStatus = 'idle'
			state.status = 'idle'
			state.deleteUserStatus = 'idle'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialUsers.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchInitialUsers.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchInitialUsers.fulfilled, (state, action) => {
				state.initialUserFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(fetchOneUser.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchOneUser.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchOneUser.fulfilled, (state, action) => {
				state.singleUserFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(createOneUser.pending, (state) => {
				state.createUserStatus = 'pending'
			})
			.addCase(createOneUser.rejected, (state) => {
				state.createUserStatus = 'rejected'
			})
			.addCase(createOneUser.fulfilled, (state, action) => {
				state.createUserStatus = 'fulfilled'
			})

			.addCase(deleteUser.pending, (state) => {
				state.deleteUserStatus = 'pending'
			})
			.addCase(deleteUser.rejected, (state) => {
				state.deleteUserStatus = 'rejected'
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				const id = action.payload
				state.initialUserFetch.filter((user) => user._id !== id)
				state.deleteUserStatus = 'fulfilled'
			})
	},
})

export default userSlice.reducer

export const { resetState } = userSlice.actions
export const initialUsers = (state: RootState) => state.users.initialUserFetch
export const singleUser = (state: RootState) => state.users.singleUserFetch
export const fetchUserState = (state: RootState) => state.users.status
export const createUserState = (state: RootState) =>
	state.users.createUserStatus
export const deleteUserStatus = (state: RootState) =>
	state.users.deleteUserStatus
