import { createSlice } from '@reduxjs/toolkit'
import { createOneRoom, deleteRoom, fetchInitialRooms, fetchOneRoom } from './roomThunks'

const initialState = {
    initialRoomFetch: [],
    initialRoomFetchPlusNewRooms: [],
    singleRoomFetch: [],
    newRoom: [],
    status: 'idle',
    createRoomStatus: 'idle',
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
                    state.initialRoomFetchPlusNewRooms.push(action.payload)
                } else {
                    state.initialRoomFetch.push(action.payload)
                    state.initialRoomFetchPlusNewRooms = [...state.initialRoomFetch]
                }
                state.createRoomStatus = 'fulfilled'
            })

            .addCase(deleteRoom.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                const id = action.payload
                if (state.initialRoomFetchPlusNewRooms.length !== 0) {
                    const result = state.initialRoomFetchPlusNewRooms.filter((room) => room.id !== id)
                    state.initialRoomFetchPlusNewRooms = [...result]
                } else {
                    const result = state.initialRoomFetch.filter((room) => room.id !== id)
                    state.initialRoomFetch = [...result]
                    console.log('old')
                }
                state.status = 'fulfilled'
            })
    }
})

export default roomSlice.reducer

export const { resetState } = roomSlice.actions
export const initialRooms = state => state.rooms.initialRoomFetch
export const initialRoomsPlusNewRooms = state => state.rooms.initialRoomFetchPlusNewRooms
export const singleRoom = state => state.rooms.singleRoomFetch
export const newRoom = state => state.rooms.newRoom
export const fetchRoomState = state => state.rooms.status
export const createRoomState = state => state.rooms.createRoomStatus