import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from '../features/bookings/bookingSlice'
import contactSlice from '../features/contact/contactSlice'


export const store = configureStore({
    reducer: {
        bookings: bookingSlice,
        contacts: contactSlice
    },
})