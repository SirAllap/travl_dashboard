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
		const response = await fetch('http://localhost:3001/bookings', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			const data = await response.json()
			return data as IBooking[]
		}
	}
)

export const fetchOneBooking = createAsyncThunk(
	'bookings/fetchOneBooking',
	async (id: string) => {
		const response = await fetch(`http://localhost:3001/bookings/${id}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			const data = await response.json()
			return data
		}
	}
)

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (id: string) => {
		const response = await fetch(`http://localhost:3001/bookings/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			return id
		}
	}
)
