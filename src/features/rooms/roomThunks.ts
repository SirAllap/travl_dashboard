import roomsJSONfile from '../../data/rooms.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRoom } from '../interfaces/interfaces'

const delay = (data: IRoom[] | string | IRoom, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialRooms = createAsyncThunk<IRoom[]>(
	'rooms/fetchInitialRooms',
	async () => {
		return (await delay(roomsJSONfile)) as IRoom[]
	}
)

export const fetchOneRoom = createAsyncThunk(
	'rooms/fetchOneRoom',
	async (id: string) => {
		return (await delay(id)) as string
	}
)

export const createOneRoom = createAsyncThunk(
	'rooms/createOneRoom',
	async (newRoom: IRoom) => {
		return (await delay(newRoom, 1000)) as IRoom
	}
)

export const editCurrentRoom = createAsyncThunk(
	'rooms/editCurrentRoom',
	async (editedRoomData: IRoom) => {
		return (await delay(editedRoomData, 1000)) as IRoom
	}
)

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
