import bookingsJSONfile from '../../data/bookings.json'
import { createAsyncThunk } from '@reduxjs/toolkit'

const delay = (data, time = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

export const fetchInitialBookings = createAsyncThunk(
    'bookings/fetchInitialBookings', async () => {
        return await delay(bookingsJSONfile)
    }
)