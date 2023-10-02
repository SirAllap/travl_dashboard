import { createSlice } from '@reduxjs/toolkit'
import { fetchInitialBookings } from './bookingThunks'

const initialState = {
    inintialFetch: [],
    status: 'idle',
    error: 'null',
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchInitialBookings.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchInitialBookings.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchInitialBookings.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.inintialFetch = [...state.inintialFetch, ...action.payload]
            })
    }
})

export default bookingSlice.reducer

export const initialBookings = (state) => state.bookings.initialState
export const fetchBookingsState = (state) => state.bookings.status