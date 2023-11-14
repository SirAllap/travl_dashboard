import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBooking } from '../interfaces/interfaces'
import { fetchMethod } from '../../util/fetchMethod'

export const fetchInitialBookings = createAsyncThunk<IBooking[]>(
	'bookings/fetchInitialBookings',
	async () => fetchMethod(true, 'bookings', 'GET')
)

export const fetchOneBooking = createAsyncThunk(
	'bookings/fetchOneBooking',
	async (id: string) => fetchMethod(true, `bookings/${id}`, 'GET', id)
)

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (id: string) => fetchMethod(false, `bookings/${id}`, 'DELETE', id)
)
