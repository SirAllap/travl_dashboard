import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from '../features/bookings/bookingSlice'
import contactSlice from '../features/contact/contactSlice'
import roomSlice from '../features/rooms/roomSlice'


export const store = configureStore({
    reducer: {
        bookings: bookingSlice,
        contacts: contactSlice,
        rooms: roomSlice,
    },
})