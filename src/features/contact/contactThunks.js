import contactsJSONfile from '../../data/client_review.json'
import { createAsyncThunk } from '@reduxjs/toolkit'

const delay = (data, time = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}

export const fetchInitialContacts = createAsyncThunk(
    'contacts/fetchInitialContacts', async () => {
        return await delay(contactsJSONfile)
    }
)

export const archiveContacts = createAsyncThunk(
    'contacts/archiveContacts', async id => {
        return await delay(id)
    }
)