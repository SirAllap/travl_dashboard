import { createSlice } from '@reduxjs/toolkit'
import { deleteRoom, fetchInitialRooms, fetchOneRoom } from './roomThunks'

const initialState = {
    initialRoomFetch: [],
    singleRoomFetch: [],
    status: 'idle',
    error: 'null'
}

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
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

            .addCase(deleteRoom.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                const id = action.payload
                const result = state.initialRoomFetch.filter((room) => room.id !== id)
                state.initialRoomFetch = [...result]
                state.status = 'fulfilled'
            })
    }
})

export default roomSlice.reducer

export const initialRooms = state => state.rooms.initialRoomFetch
export const singleRoom = state => state.rooms.singleRoomFetch
export const fetchRoomState = state => state.rooms.status