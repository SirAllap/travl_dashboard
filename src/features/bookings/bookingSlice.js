import { createSlice } from '@reduxjs/toolkit'
import { deleteBooking, fetchInitialBookings } from './bookingThunks'

const initialState = {
    initialFetch: [],
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
                state.initialFetch = action.payload
                state.status = 'fulfilled'
            })

            .addCase(deleteBooking.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                const result = state.initialFetch.filter((booking) =>
                    booking.id !== action.payload
                )
                state.initialFetch = result
                state.status = 'fulfilled'
            })
    }
})

export default bookingSlice.reducer

export const initialBookings = (state) => state.bookings.initialFetch
export const fetchState = (state) => state.bookings.status