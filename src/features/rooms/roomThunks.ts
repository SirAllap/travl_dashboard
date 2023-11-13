import roomsJSONfile from '../../data/rooms.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRoom } from '../interfaces/interfaces'

const delay = (data: IRoom[] | string | IRoom, time: number = 500) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data)
		}, time)
	})
}

export const fetchInitialRooms = createAsyncThunk<IRoom[]>(
	'rooms/fetchInitialRooms',
	async () => {
		const response = await fetch('http://localhost:3001/rooms', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			const data = await response.json()
			return data as IRoom[]
		}
	}
)

export const fetchOneRoom = createAsyncThunk(
	'rooms/fetchOneRoom',
	async (id: string) => {
		const response = await fetch(`http://localhost:3001/rooms/${id}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			const data = await response.json()
			return data
		}
	}
)

export const createOneRoom = createAsyncThunk(
	'rooms/createOneRoom',
	async (newRoom: IRoom) => {
		const response = await fetch('http://localhost:3001/rooms', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				room_number: newRoom.room_number,
				room_photo: newRoom.room_photo,
				room_type: newRoom.room_type,
				description: newRoom.description,
				amenities_type: newRoom.amenities_type,
				amenities: newRoom.amenities,
				price: newRoom.price,
				offer_price: newRoom.offer_price,
				discount: newRoom.discount,
				status: newRoom.status,
			}),
		})
		if (!response.ok) {
			const errorMessage = `Failed to create room. Status: ${
				response.status
			}, Message: ${await response.text()}`
			throw new Error(errorMessage)
		}
	}
)

export const editCurrentRoom = createAsyncThunk(
	'rooms/editCurrentRoom',
	async (editedRoomData: IRoom) => {
		const response = await fetch(
			`http://localhost:3001/rooms/${editedRoomData._id}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					token: `${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					room_number: editedRoomData.room_number,
					room_photo: editedRoomData.room_photo,
					room_type: editedRoomData.room_type,
					description: editedRoomData.description,
					amenities_type: editedRoomData.amenities_type,
					amenities: editedRoomData.amenities,
					price: editedRoomData.price,
					offer_price: editedRoomData.offer_price,
					discount: editedRoomData.discount,
					status: editedRoomData.status,
				}),
			}
		)
		if (!response.ok) {
			const errorMessage = `Failed to create room. Status: ${
				response.status
			}, Message: ${await response.text()}`
			throw new Error(errorMessage)
		}
	}
)

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (id: string) => {
		const response = await fetch(`http://localhost:3001/rooms/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				token: `${localStorage.getItem('token')}`,
			},
		})
		if (!response.ok) {
			throw new Error(`status ${response.status}`)
		} else {
			return id
		}
	}
)
