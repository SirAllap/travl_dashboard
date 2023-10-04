import { createSlice } from '@reduxjs/toolkit'
import { deleteUser, fetchInitialUsers, fetchOneUser } from './userThunks'


const initialState = {
    initialUserFetch: [],
    singleUserFetch: [],
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

            .addCase(fetchOneUser.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchOneUser.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchOneUser.fulfilled, (state, action) => {
                const id = action.payload
                state.singleUserFetch = state.initialUserFetch.filter(user => user.id === id)
                state.status = 'fulfilled'
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const id = action.payload
                const result = state.initialUserFetch.filter(user => user.id !== id)
                state.initialUserFetch = [...result]
                state.status = 'fulfilled'
            })
    }
})

export default userSlice.reducer

export const initialUsers = state => state.users.initialUserFetch
export const singleUser = state => state.users.singleUserFetch
export const fetchUserState = state => state.users.status