// const API_local_URL = import.meta.env.VITE_API_LOCAL_URL
const API_cloud_URL = import.meta.env.VITE_API_CLOUD_URL

export const fetchMethod = async (
	returData: boolean,
	URLendpoint: string,
	method: string,
	id?: string,
	body?: any
) => {
	const response = await fetch(`${API_cloud_URL}/${URLendpoint}`, {
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
