import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import Rooms from '../pages/Rooms'
import Users from '../pages/Users'
import Contact from '../pages/Contact'
import PrivateRoute from '../pages/PrivateRoute'
import Login from '../pages/Login'
import Concierge from '../pages/Concierge'

const Router = (props) => {
	// const [authenticated, setAuthenticated] = useState(null)

	// useEffect(() => {
	// 	localStorage.getItem('authenticated') !== null &&
	// 		localStorage.setItem('authenticated', authenticated)
	// }, [authenticated])

	const localAuth = localStorage.getItem('authenticated')

	return (
		<>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
					// element={<Login setAuthenticated={setAuthenticated} />}
				/>
				<Route
					element={
						<PrivateRoute authenticated={localAuth}>
							<Dashboard toggle={props.toggle} />
						</PrivateRoute>
					}
					path='/'
				/>
				<Route
					path='/bookings'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Bookings />
						</PrivateRoute>
					}
				/>
				<Route
					path='/rooms'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Rooms />
						</PrivateRoute>
					}
				/>
				<Route
					path='/users'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Users />
						</PrivateRoute>
					}
				/>
				<Route
					path='/concierge'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Concierge />
						</PrivateRoute>
					}
				/>
				<Route
					path='/contact'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Contact />
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default Router
