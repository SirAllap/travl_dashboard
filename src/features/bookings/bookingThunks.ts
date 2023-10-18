import bookingsJSONfile from '../../data/bookings.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBooking } from '../interfaces/interfaces'

const delay = (data: object[] | string, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialBookings = createAsyncThunk<IBooking[]>(
	'bookings/fetchInitialBookings',
	async () => {
		return (await delay(bookingsJSONfile)) as IBooking[]
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
