import contactsJSONfile from '../../data/client_review.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IContact } from '../interfaces/interfaces'

const delay = (data: IContact[] | string | IContact, time = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialContacts = createAsyncThunk<IContact[]>(
	'contacts/fetchInitialContacts',
	async () => {
		return (await delay(contactsJSONfile)) as IContact[]
	}
)

export const archiveContacts = createAsyncThunk(
	'contacts/archiveContacts',
	async (id: string) => {
		return (await delay(id)) as string
	}
)
