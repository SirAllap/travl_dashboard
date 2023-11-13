import { createSlice } from '@reduxjs/toolkit'
import {
	createOneRoom,
	deleteRoom,
	editCurrentRoom,
	fetchInitialRooms,
	fetchOneRoom,
} from './roomThunks'
import { IRoom } from '../interfaces/interfaces'
import { RootState } from '../../app/store'

interface RoomState {
	initialRoomFetch: IRoom[]
	initialRoomFetchPlusNewRooms: IRoom[]
	singleRoomFetch: IRoom[]
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	createRoomStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	deleteRoomStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	editionRoomStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: RoomState = {
	initialRoomFetch: [],
	initialRoomFetchPlusNewRooms: [],
	singleRoomFetch: [],
	status: 'idle',
	createRoomStatus: 'idle',
	deleteRoomStatus: 'idle',
	editionRoomStatus: 'idle',
	error: 'null',
}

const roomSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		resetState: (state) => {
			state.createRoomStatus = 'idle'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialRooms.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchInitialRooms.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchInitialRooms.fulfilled, (state, action) => {
				state.initialRoomFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(fetchOneRoom.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchOneRoom.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchOneRoom.fulfilled, (state, action) => {
				state.singleRoomFetch.splice(0, 1, action.payload)
				state.status = 'fulfilled'
			})

			.addCase(createOneRoom.pending, (state) => {
				state.createRoomStatus = 'pending'
			})
			.addCase(createOneRoom.rejected, (state) => {
				state.createRoomStatus = 'rejected'
			})
			.addCase(createOneRoom.fulfilled, (state, action) => {
				state.createRoomStatus = 'fulfilled'
			})

			.addCase(editCurrentRoom.pending, (state) => {
				state.createRoomStatus = 'pending'
			})
			.addCase(editCurrentRoom.rejected, (state) => {
				state.createRoomStatus = 'rejected'
			})
			.addCase(editCurrentRoom.fulfilled, (state, action) => {
				state.createRoomStatus = 'fulfilled'
			})

			.addCase(deleteRoom.pending, (state) => {
				state.deleteRoomStatus = 'pending'
			})
			.addCase(deleteRoom.rejected, (state) => {
				state.deleteRoomStatus = 'rejected'
			})
			.addCase(deleteRoom.fulfilled, (state, action) => {
				const id = action.payload

				const result = state.initialRoomFetch.filter(
					(room) => room._id !== id
				)
				state.initialRoomFetch = [...result]
				state.deleteRoomStatus = 'fulfilled'
			})
	},
})

export default roomSlice.reducer

export const { resetState } = roomSlice.actions
export const initialRooms = (state: RootState) => state.rooms.initialRoomFetch
export const initialRoomsPlusNewRooms = (state: RootState) =>
	state.rooms.initialRoomFetchPlusNewRooms
export const singleRoom = (state: RootState) => state.rooms.singleRoomFetch
export const fetchRoomState = (state: RootState) => state.rooms.status
export const createRoomState = (state: RootState) =>
	state.rooms.createRoomStatus
export const deleteRoomStatus = (state: RootState) =>
	state.rooms.deleteRoomStatus
export const editionRoomStatus = (state: RootState) =>
	state.rooms.editionRoomStatus
