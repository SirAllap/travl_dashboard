import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from '../features/bookings/bookingSlice'
import contactSlice from '../features/contact/contactSlice'
import roomSlice from '../features/rooms/roomSlice'
import userSlice from '../features/users/userSlice'

export const store = configureStore({
	reducer: {
		bookings: bookingSlice,
		contacts: contactSlice,
		rooms: roomSlice,
		users: userSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
