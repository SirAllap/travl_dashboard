import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/interfaces'
import { fetchMethod } from '../../util/fetchMethod'

const delay = (data: IUser[] | string | IUser, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialUsers = createAsyncThunk<IUser[]>(
	'users/fetchInitialUsers',
	async () => fetchMethod(true, 'users', 'GET')
)

export const fetchOneUser = createAsyncThunk(
	'users/fetchOneUser',
	async (id: string) => fetchMethod(true, `users/${id}`, 'GET', id)
)

export const createOneUser = createAsyncThunk(
	'users/createOneUser',
	async (newUser: IUser) => fetchMethod(true, 'users', 'POST', '', newUser)
)

// export const editOneUser = createAsyncThunk(
// 	'users/editOneUser',
// 	async (editedUserData: IUser) =>
// 		fetchMethod(
// 			true,
// 			`rooms/${editedUserData._id}`,
// 			'PUT',
// 			editedUserData._id,
// 			editedUserData
// 		)
// )

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: string) => fetchMethod(false, `users/${id}`, 'DELETE', id)
)
