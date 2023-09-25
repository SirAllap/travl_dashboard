import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
	if (!props.authenticated) {
		return <Navigate to='/login' />
	} else {
		return props.children
	}
}

export default PrivateRoute
