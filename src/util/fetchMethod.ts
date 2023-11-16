const API_URL = import.meta.env.VITE_API_URL

export const fetchMethod = async (
	returData: boolean,
	URLendpoint: string,
	method: string,
	id?: string,
	body?: any
) => {
	const response = await fetch(`${API_URL}/${URLendpoint}`, {
		method: method,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			token: `${localStorage.getItem('token')}`,
		},
		body: JSON.stringify(body),
	})
	if (response.status === 401) {
		localStorage.clear()
		window.location.href = '/login'
	}
	if (!response.ok) {
		throw new Error(`status ${response.status}`)
	} else {
		if (returData) {
			const data = await response.json()
			return data
		} else {
			return id
		}
	}
}
