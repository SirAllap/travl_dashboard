import usersJSONfile from '../../data/employee_data.json'
import { createAsyncThunk } from '@reduxjs/toolkit'

const delay = (data, time = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

export const fetchInitialUsers = createAsyncThunk(
    'users/fetchInitialUsers', async () => {
        return await delay(usersJSONfile)
    }
)

export const fetchOneUser = createAsyncThunk(
    'users/fetchOneUser', async id => {
        return await delay(id)
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser', async id => {
        return await delay(id)
    }
)