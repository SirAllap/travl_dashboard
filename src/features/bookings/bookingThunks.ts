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

export const fetchInitialBookings = createAsyncThunk<BookingInter[]>(
	'bookings/fetchInitialBookings',
	async () => {
		return (await delay(bookingsJSONfile)) as BookingInter[]
	}
)

export const fetchOneBooking = createAsyncThunk(
	'bookings/fetchOneBooking',
	async (id: string) => {
		return (await delay(id)) as string
	}
)

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
