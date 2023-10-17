import usersJSONfile from '../../data/employee_data.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserInter } from '../interfaces/interfaces'

const delay = (data: UserInter[] | string | UserInter, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialUsers = createAsyncThunk<UserInter[]>(
	'users/fetchInitialUsers',
	async () => {
		return (await delay(usersJSONfile)) as UserInter[]
	}
)

export const fetchOneUser = createAsyncThunk(
	'users/fetchOneUser',
	async (id: string) => {
		return (await delay(id)) as string
	}
)

export const createOneUser = createAsyncThunk(
	'users/createOneUser',
	async (newUser: UserInter) => {
		return (await delay(newUser, 1000)) as UserInter
	}
)

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
