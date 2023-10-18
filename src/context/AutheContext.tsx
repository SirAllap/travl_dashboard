import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticationContext } from './authenticationContext'

const checkInitialState = () => {
	return localStorage.getItem('authenticated')
		? {
				auth: true,
				name: JSON.parse(localStorage.getItem('currentUser') || '{}').userName,
				email: JSON.parse(localStorage.getItem('currentUser') || '{}').email,
				profilePicture: localStorage.getItem('profilePicture'),
		  }
		: {
				auth: false,
				name: String,
				email: String,
				profilePicture: String,
		  }
}

const authenticatorReducer = (action) => {
	switch (action.type) {
		case 'login': {
			return {
				auth: true,
				name: action.payload.userName,
				email: action.payload.email,
				profilePicture: action.payload.profilePicture,
			}
		}
		case 'updateUserInfo': {
			return {
				auth: true,
				name: action.payload.userName,
				email: action.payload.email,
				profilePicture: action.payload.profilePicture,
			}
		}
		case 'logout': {
			return {
				auth: false,
				name: null,
				email: null,
				profilePicture: null,
			}
		}
		default:
			break
	}
}

const AuthenticationContext = ({ children }) => {
	const navigate = useNavigate()

	const [authState, dispatch] = useReducer(
		authenticatorReducer,
		checkInitialState()
	)

	const login = ({ userName, email, profilePicture }) => {
		dispatch({
			type: 'login',
			payload: { userName, email, profilePicture },
		})
		localStorage.setItem(
			'currentUser',
			JSON.stringify({
				userName: userName,
				email: email,
			})
		)
		localStorage.setItem('profilePicture', profilePicture)
		localStorage.setItem('authenticated', true)
		navigate('/')
	}

	const updateUserInfo = ({ userName, email, profilePicture }) => {
		dispatch({
			type: 'updateUserInfo',
			payload: { userName, email, profilePicture },
		})

		localStorage.setItem(
			'currentUser',
			JSON.stringify({
				userName: userName,
				email: email,
			})
		)
		localStorage.setItem('profilePicture', profilePicture)
		localStorage.setItem('authenticated', true)
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
					updateUserInfo,
					logout,
					authState,
				}}
			>
				{children}
			</authenticationContext.Provider>
		</>
	)
}

export default AuthenticationContext
