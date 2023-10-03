import { createSlice } from '@reduxjs/toolkit'
import { fetchInitialUsers } from './userThunks'


const initialState = {
    initialUserFetch: [],
    status: 'idle',
    error: 'null'
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchInitialUsers.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchInitialUsers.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchInitialUsers.fulfilled, (state, action) => {
                state.initialUserFetch = action.payload
                state.status = 'fulfilled'
            })
    }
})

export default userSlice.reducer

export const initialUsers = state => state.users.initialUserFetch
export const fetchRoomState = state => state.users.status