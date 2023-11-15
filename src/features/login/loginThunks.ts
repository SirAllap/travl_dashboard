import { createAsyncThunk } from '@reduxjs/toolkit'

interface ILogin {
	email: string
	password: string
}

// const API_local_URL = import.meta.env.VITE_API_LOCAL_URL
const API_cloud_URL = import.meta.env.VITE_API_CLOUD_URL

export const userLogin = createAsyncThunk(
	'login/userLogin',
	async (data: ILogin, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_cloud_URL}/login`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: data.email,
					password: data.password,
				}),
			})
			if (!response.ok) {
				throw new Error(`Status ${response.status}`)
			} else {
				const data = await response.json()
				localStorage.setItem('token', data.token)
			}
		} catch (error) {
			console.error('An error occurred during login:', error)
			throw new Error('Login failed. Please try again.')
		}
	}
)
