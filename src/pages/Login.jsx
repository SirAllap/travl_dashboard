import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
	const navigate = useNavigate()
	const authThisGuy = () => {
		props.setAuthenticated(true)
		localStorage.setItem('authenticated', true)
		return navigate('/')
	}
	return (
		<>
			<button onClick={authThisGuy}>Authme!</button>
		</>
	)
}

export default Login
