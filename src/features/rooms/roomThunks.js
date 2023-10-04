import roomsJSONfile from '../../data/rooms.json'
import { createAsyncThunk } from '@reduxjs/toolkit'

const delay = (data, time = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

export const fetchInitialRooms = createAsyncThunk(
    'rooms/fetchInitialRooms', async () => {
        return await delay(roomsJSONfile)
    }
)

export const fetchOneRoom = createAsyncThunk(
    'rooms/fetchOneRoom', async id => {
        return await delay(id)
    }
)

export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom', async id => {
        return await delay(id)
    }
)
