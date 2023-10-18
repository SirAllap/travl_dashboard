import { createSlice } from '@reduxjs/toolkit'
import { archiveContacts, fetchInitialContacts } from './contactThunks'
import { ContactInter } from '../interfaces/interfaces'
import { RootState } from '../../app/store'

interface ContactState {
	initialContactFetch: ContactInter[]
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	archiveStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: null | string
}

const initialState: ContactState = {
	initialContactFetch: [],
	status: 'idle',
	archiveStatus: 'idle',
	error: 'null',
}

const contactSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInitialContacts.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchInitialContacts.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchInitialContacts.fulfilled, (state, action) => {
				state.initialContactFetch = action.payload
				state.status = 'fulfilled'
			})

			.addCase(archiveContacts.pending, (state) => {
				state.archiveStatus = 'pending'
			})
			.addCase(archiveContacts.rejected, (state) => {
				state.archiveStatus = 'rejected'
			})
			.addCase(archiveContacts.fulfilled, (state, action) => {
				state.initialContactFetch.map((contact) =>
					contact.id === action.payload
						? (contact.isArchived = 'true')
						: null
				)
				state.archiveStatus = 'fulfilled'
			})
	},
})

export default contactSlice.reducer

export const initialContacts = (state: RootState) =>
	state.contacts.initialContactFetch
export const fetchContactState = (state: RootState) => state.contacts.status
export const archiveStatus = (state: RootState) => state.contacts.archiveStatus
