import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authenticationContext } from '../context/AutheContext'

const PrivateRoute = ({ children }) => {
	const { authState } = useContext(authenticationContext)
	if (!authState.auth) return <Navigate to='/login' />
	return children
}

export default PrivateRoute
