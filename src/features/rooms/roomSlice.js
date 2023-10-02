import { createSlice } from '@reduxjs/toolkit'
import { fetchInitialRooms } from './roomThunks'

const initialState = {
    initialRoomFetch: [],
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
    }
})

export default roomSlice.reducer

export const initialRooms = state => state.rooms.initialRoomFetch
export const fetchRoomState = state => state.rooms.status