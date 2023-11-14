import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRoom } from '../interfaces/interfaces'
import { fetchMethod } from '../../util/fetchMethod'

export const fetchInitialRooms = createAsyncThunk<IRoom[]>(
	'rooms/fetchInitialRooms',
	async () => fetchMethod(true, 'rooms', 'GET')
)

export const fetchOneRoom = createAsyncThunk(
	'rooms/fetchOneRoom',
	async (id: string) => fetchMethod(true, `rooms/${id}`, 'GET', id)
)

export const createOneRoom = createAsyncThunk(
	'rooms/createOneRoom',
	async (newRoom: IRoom) => fetchMethod(true, 'rooms', 'POST', '', newRoom)
)

export const editCurrentRoom = createAsyncThunk(
	'rooms/editCurrentRoom',
	async (editedRoomData: IRoom) =>
		fetchMethod(
			true,
			`rooms/${editedRoomData._id}`,
			'PUT',
			editedRoomData._id,
			editedRoomData
		)
)

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (id: string) => fetchMethod(false, `rooms/${id}`, 'DELETE', id)
)
