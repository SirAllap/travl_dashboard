import React, { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authenticationContext } from '../context/AutheContext'

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
	const { authState } = useContext(authenticationContext)!
	if (!authState.auth) return <Navigate to='/login' />
	return children
}

export default PrivateRoute
