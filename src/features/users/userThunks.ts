import usersJSONfile from '../../data/employee_data.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/interfaces'

const delay = (data: IUser[] | string | IUser, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialUsers = createAsyncThunk<IUser[]>(
	'users/fetchInitialUsers',
	async () => {
		return (await delay(usersJSONfile)) as IUser[]
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
	async (newUser: IUser) => {
		return (await delay(newUser, 1000)) as IUser
	}
)

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
