import bookingsJSONfile from '../../data/bookings.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BookingInter } from '../interfaces/interfaces'

const delay = (data: object[] | string, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

type FetchOneBookingResponse = string | object[]

export const fetchInitialBookings = createAsyncThunk<BookingInter[]>(
	'bookings/fetchInitialBookings',
	async () => {
		return (await delay(bookingsJSONfile)) as BookingInter[]
	}
)

export const fetchOneBooking = createAsyncThunk(
	'bookings/fetchOneBooking',
	async (id: FetchOneBookingResponse) => {
		return await delay(id)
	}
)

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (id: FetchOneBookingResponse) => {
		return await delay(id)
	}
)
