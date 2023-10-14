import { createSlice } from '@reduxjs/toolkit'
import { createOneRoom, deleteRoom, editCurrentRoom, fetchInitialRooms, fetchOneRoom } from './roomThunks'

const initialState = {
    initialRoomFetch: [],
    initialRoomFetchPlusNewRooms: [],
    singleRoomFetch: [],
    status: 'idle',
    createRoomStatus: 'idle',
    deleteRoomStatus: 'idle',
    editionRoomStatus: 'idle',
    error: 'null'
}

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        resetState: (state, action) => {
            state.createRoomStatus = 'idle'
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchInitialRooms.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchInitialRooms.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchInitialRooms.fulfilled, (state, action) => {
                state.initialRoomFetch = action.payload
                state.status = 'fulfilled'
            })

            .addCase(fetchOneRoom.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchOneRoom.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchOneRoom.fulfilled, (state, action) => {
                const id = action.payload
                state.singleRoomFetch = state.initialRoomFetch.filter(room => room.id === id)
                if (state.singleRoomFetch.length === 0) {
                    state.singleRoomFetch = state.initialRoomFetchPlusNewRooms.filter(room => room.id === id)
                }
                state.status = 'fulfilled'
            })

            .addCase(createOneRoom.pending, (state, action) => {
                state.createRoomStatus = 'pending'
            })
            .addCase(createOneRoom.rejected, (state, action) => {
                state.createRoomStatus = 'rejected'
            })
            .addCase(createOneRoom.fulfilled, (state, action) => {
                if (state.initialRoomFetchPlusNewRooms.length !== 0) {
                    state.initialRoomFetchPlusNewRooms = [action.payload, ...state.initialRoomFetchPlusNewRooms]
                } else {
                    state.initialRoomFetch = [action.payload, ...state.initialRoomFetch]
                    state.initialRoomFetchPlusNewRooms = [...state.initialRoomFetch]
                }
                state.createRoomStatus = 'fulfilled'
            })

            .addCase(editCurrentRoom.pending, (state, action) => {
                state.createRoomStatus = 'pending'
            })
            .addCase(editCurrentRoom.rejected, (state, action) => {
                state.createRoomStatus = 'rejected'
            })
            .addCase(editCurrentRoom.fulfilled, (state, action) => {
                if (state.initialRoomFetchPlusNewRooms.length !== 0) {
                    state.initialRoomFetchPlusNewRooms = state.initialRoomFetchPlusNewRooms.filter(room => room.id !== action.payload.id)
                    state.initialRoomFetchPlusNewRooms = [action.payload, ...state.initialRoomFetchPlusNewRooms]
                } else {
                    state.initialRoomFetch = state.initialRoomFetch.filter(room => room.id !== action.payload.id)
                    state.initialRoomFetch = [action.payload, ...state.initialRoomFetch]
                    state.initialRoomFetchPlusNewRooms = [...state.initialRoomFetch]
                }
                state.createRoomStatus = 'fulfilled'
            })

            .addCase(deleteRoom.pending, (state, action) => {
                state.deleteRoomStatus = 'pending'
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.deleteRoomStatus = 'rejected'
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                const id = action.payload
                if (state.initialRoomFetchPlusNewRooms.length !== 0) {
                    const result = state.initialRoomFetchPlusNewRooms.filter((room) => room.id !== id)
                    state.initialRoomFetchPlusNewRooms = [...result]
                } else {
                    const result = state.initialRoomFetch.filter((room) => room.id !== id)
                    state.initialRoomFetch = [...result]
                }
                state.deleteRoomStatus = 'fulfilled'
            })
    }
})

export default roomSlice.reducer

export const { resetState } = roomSlice.actions
export const initialRooms = state => state.rooms.initialRoomFetch
export const initialRoomsPlusNewRooms = state => state.rooms.initialRoomFetchPlusNewRooms
export const singleRoom = state => state.rooms.singleRoomFetch
export const fetchRoomState = state => state.rooms.status
export const createRoomState = state => state.rooms.createRoomStatus
export const deleteRoomStatus = state => state.rooms.deleteRoomStatus
export const editionRoomStatus = state => state.rooms.editionRoomStatus