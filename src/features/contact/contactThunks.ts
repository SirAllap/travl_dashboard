import { createAsyncThunk } from '@reduxjs/toolkit'
import { IContact } from '../interfaces/interfaces'
import { fetchMethod } from '../../util/fetchMethod'

const delay = (data: IContact[] | string | IContact, time = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialContacts = createAsyncThunk<IContact[]>(
	'contacts/fetchInitialContacts',
	async () => fetchMethod(true, 'contacts', 'GET')
)

export const archiveContacts = createAsyncThunk(
	'contacts/archiveContacts',
	async (id: string) =>
		fetchMethod(false, `contacts/${id}`, 'PUT', id, { isArchived: 'true' })
)
