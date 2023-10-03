import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticationContext } from './authenticationContext'

const checkInitialState = () => {
	return localStorage.getItem('authenticated')
		? {
				auth: true,
				name: JSON.parse(localStorage.getItem('currentUser')).userName,
				email: JSON.parse(localStorage.getItem('currentUser')).email,
		  }
		: {
				auth: null,
				name: null,
				email: null,
		  }
}

const authenticatorReducer = (state, action) => {
	switch (action.type) {
		case 'login': {
			return {
				auth: true,
				name: action.payload.userName,
				email: action.payload.email,
			}
		}
		case 'logout': {
			return {
				auth: false,
				name: null,
				email: null,
			}
		}
		default:
			break
	}
}

const AuthenticationContext = ({ children }) => {
	const navigate = useNavigate()
	const [state, dispatch] = useReducer(
		authenticatorReducer,
		checkInitialState()
	)

	const login = ({ userName, email }) => {
		dispatch({ type: 'login', payload: { userName, email } })
		localStorage.setItem(
			'currentUser',
			JSON.stringify({
				userName: userName,
				email: email,
			})
		)
		localStorage.setItem('authenticated', true)
		navigate('/')
	}
	const logout = () => {
		dispatch({ type: 'logout' })
		localStorage.clear()
		navigate('/login')
	}

	return (
		<>
			<authenticationContext.Provider
				value={{
					login,
					logout,
					state,
				}}
			>
				{children}
			</authenticationContext.Provider>
		</>
	)
}

export default AuthenticationContext
