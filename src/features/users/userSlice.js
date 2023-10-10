import { createSlice } from '@reduxjs/toolkit'
import { createOneUser, deleteUser, fetchInitialUsers, fetchOneUser } from './userThunks'


const initialState = {
    initialUserFetch: [],
    initialUserFetchPlusNewUsers: [],
    singleUserFetch: [],
    status: 'idle',
    createUserStatus: 'idle',
    deleteUserStatus: 'idle',
    error: 'null'
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetState: (state, action) => {
            state.createUserStatus = 'idle'
        },
    },
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

            .addCase(createOneUser.pending, (state, action) => {
                state.createUserStatus = 'pending'
            })
            .addCase(createOneUser.rejected, (state, action) => {
                state.createUserStatus = 'rejected'
            })
            .addCase(createOneUser.fulfilled, (state, action) => {
                if (state.initialUserFetchPlusNewUsers.length !== 0) {
                    state.initialUserFetchPlusNewUsers.push(action.payload)
                } else {
                    state.initialUserFetch.push(action.payload)
                    state.initialUserFetchPlusNewUsers = [...state.initialUserFetch]
                }
                state.createUserStatus = 'fulfilled'
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.deleteUserStatus = 'pending'
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserStatus = 'rejected'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const id = action.payload
                if (state.initialUserFetchPlusNewUsers.length !== 0) {
                    const result = state.initialUserFetchPlusNewUsers.filter((user) => user.employee_id !== id)
                    state.initialUserFetchPlusNewUsers = [...result]
                } else {
                    const result = state.initialUserFetch.filter((user) =>
                        user.employee_id !== id
                    )
                    state.initialUserFetch = [...result]
                }
                state.deleteUserStatus = 'fulfilled'
            })
    }
})

export default userSlice.reducer

export const { resetState } = userSlice.actions
export const initialUsers = state => state.users.initialUserFetch
export const initialUsersPlusNewUsers = state => state.users.initialUserFetchPlusNewUsers
export const singleUser = state => state.users.singleUserFetch
export const fetchUserState = state => state.users.status
export const createUserState = state => state.users.createUserStatus
export const deleteUserStatus = state => state.users.deleteUserStatus