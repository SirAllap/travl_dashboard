import contactsJSONfile from '../../data/client_review.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ContactInter } from '../interfaces/interfaces'

const delay = (data: ContactInter[] | string | ContactInter, time = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialContacts = createAsyncThunk<ContactInter[]>(
	'contacts/fetchInitialContacts',
	async () => {
		return (await delay(contactsJSONfile)) as ContactInter[]
	}
)

export const archiveContacts = createAsyncThunk(
	'contacts/archiveContacts',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
