import roomsJSONfile from '../../data/rooms.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RoomInter } from '../interfaces/interfaces'

const delay = (data: RoomInter[] | string | RoomInter, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialRooms = createAsyncThunk<RoomInter[]>(
	'rooms/fetchInitialRooms',
	async () => {
		return (await delay(roomsJSONfile)) as RoomInter[]
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
	async (newRoom: RoomInter) => {
		return (await delay(newRoom, 1000)) as RoomInter
	}
)

export const editCurrentRoom = createAsyncThunk(
	'rooms/editCurrentRoom',
	async (editedRoomData: RoomInter) => {
		return (await delay(editedRoomData, 1000)) as RoomInter
	}
)

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
