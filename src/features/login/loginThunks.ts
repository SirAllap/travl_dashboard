import { createAsyncThunk } from '@reduxjs/toolkit'

interface ILogin {
	email: string
	password: string
}

export const userLogin = createAsyncThunk(
	'login/userLogin',
	async (data: ILogin) => {
		try {
			const response = await fetch('http://localhost:3001/login', {
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
			if (response.ok) {
				const data = await response.json()
				localStorage.setItem('token', data.token)
			} else {
				throw new Error(`status ${response.status}`)
			}
		} catch (error) {
			console.error(`${error}`)
		}
	}
)
