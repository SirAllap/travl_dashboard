import { createSlice } from '@reduxjs/toolkit'
import {
	deleteBooking,
	fetchInitialBookings,
	fetchOneBooking,
} from './bookingThunks'
import { IBooking } from '../interfaces/interfaces'
import { RootState } from '../../app/store'

interface BookingState {
	initialBookingFetch: IBooking[]
	singleBookingFetch: IBooking
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	deleteBookingStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: BookingState = {
	initialBookingFetch: [],
	singleBookingFetch: {} as IBooking,
	status: 'idle',
	deleteBookingStatus: 'idle',
	error: 'null',
}

const bookingSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialBookings.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchInitialBookings.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchInitialBookings.fulfilled, (state, action) => {
				state.initialBookingFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(fetchOneBooking.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchOneBooking.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchOneBooking.fulfilled, (state, action) => {
				state.singleBookingFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(deleteBooking.pending, (state) => {
				state.deleteBookingStatus = 'pending'
			})
			.addCase(deleteBooking.rejected, (state) => {
				state.deleteBookingStatus = 'rejected'
			})
			.addCase(deleteBooking.fulfilled, (state, action) => {
				const id = action.payload
				const result = state.initialBookingFetch.filter(
					(booking) => booking._id !== id
				)
				state.initialBookingFetch = [...result]
				state.deleteBookingStatus = 'fulfilled'
			})
	},
})

export default bookingSlice.reducer

export const initialBookings = (state: RootState) =>
	state.bookings.initialBookingFetch
export const singleBooking = (state: RootState) =>
	state.bookings.singleBookingFetch
export const fetchBookingState = (state: RootState) => state.bookings.status
export const deleteBookingStatus = (state: RootState) =>
	state.bookings.deleteBookingStatus
