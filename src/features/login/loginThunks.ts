import { createAsyncThunk } from '@reduxjs/toolkit'

interface ILogin {
	email: string
	password: string
}

const API_URL = import.meta.env.VITE_API_URL

export const userLogin = createAsyncThunk(
	'login/userLogin',
	async (data: ILogin) => {
		try {
			const response = await fetch(`${API_URL}/login`, {
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
				return data
			}
		} catch (error) {
			console.error('An error occurred during login:', error)
			throw new Error('Login failed. Please try again.')
		}
	}
)
