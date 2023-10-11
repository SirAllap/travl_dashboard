import { createSlice } from '@reduxjs/toolkit'
import { archiveContacts, fetchInitialContacts } from './contactThunks'

const initialState = {
    initialContactFetch: [],
    status: 'idle',
    archiveStatus: 'idle',
    error: 'null',
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchInitialContacts.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchInitialContacts.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchInitialContacts.fulfilled, (state, action) => {
                state.initialContactFetch = action.payload
                state.status = 'fulfilled'
            })

            .addCase(archiveContacts.pending, (state, action) => {
                state.archiveStatus = 'pending'
            })
            .addCase(archiveContacts.rejected, (state, action) => {
                state.archiveStatus = 'rejected'
            })
            .addCase(archiveContacts.fulfilled, (state, action) => {
                state.initialContactFetch.map((contact) =>
                    contact.id === action.payload ? contact.isArchived = 'true' : null
                )
                state.archiveStatus = 'fulfilled'
            })
    }
})

export default contactSlice.reducer

export const initialContacts = state => state.contacts.initialContactFetch
export const fetchContactState = state => state.contacts.status
export const archiveStatus = state => state.contacts.archiveStatus