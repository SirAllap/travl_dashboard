import { createSlice } from '@reduxjs/toolkit'
import { deleteBooking, fetchInitialBookings, fetchOneBooking } from './bookingThunks'

const initialState = {
    initialBookingFetch: [],
    singleBookingFetch: [],
    status: 'idle',
    error: 'null',
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchInitialBookings.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchInitialBookings.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchInitialBookings.fulfilled, (state, action) => {
                state.initialBookingFetch = action.payload
                state.status = 'fulfilled'
            })

            .addCase(fetchOneBooking.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchOneBooking.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchOneBooking.fulfilled, (state, action) => {
                state.singleBookingFetch = action.payload
                console.log(state.singleBookingFetch)
                state.status = 'fulfilled'
            })

            .addCase(deleteBooking.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                const result = state.initialBookingFetch.filter((booking) =>
                    booking.id !== action.payload
                )
                state.initialBookingFetch = result
                state.status = 'fulfilled'
            })
    }
})

export default bookingSlice.reducer

export const initialBookings = (state) => state.bookings.initialBookingFetch
export const singleBooking = (state) => state.bookings.singleBookingFetch
export const fetchBookingState = (state) => state.bookings.status