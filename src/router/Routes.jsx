import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import BookingDetails from '../pages/BookingDetails'
import Rooms from '../pages/Rooms'
import RoomDetails from '../pages/RoomDetails'
import Users from '../pages/Users'
import PrivateRoute from '../pages/PrivateRoute'
import Login from '../pages/Login'
import Contact from '../pages/Contact'

const Router = (props) => {
	const localAuth = localStorage.getItem('authenticated')
	const [breadCrumb, setBreadCrumb] = useState('')
	useEffect(() => {
		props.setNewBreadCrumb(breadCrumb)
	}, [breadCrumb, props])
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					element={
						<PrivateRoute authenticated={localAuth}>
							<Dashboard toggle={props.toggle} />
						</PrivateRoute>
					}
					path='/'
				/>
				<Route
					element={
						<PrivateRoute authenticated={localAuth}>
							<Dashboard toggle={props.toggle} />
						</PrivateRoute>
					}
					path='*'
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
							<Bookings toggle={props.toggle} />
						</PrivateRoute>
					}
				/>
				<Route
					path='/bookings/:bookingId'
					element={
						<PrivateRoute authenticated={localAuth}>
							<BookingDetails
								setbreadcrumb={setBreadCrumb}
								toggle={props.toggle}
							/>
						</PrivateRoute>
					}
				/>
				<Route
					path='/rooms'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Rooms toggle={props.toggle} />
						</PrivateRoute>
					}
				/>
				<Route
					path='/rooms/:roomId'
					element={
						<PrivateRoute authenticated={localAuth}>
							<RoomDetails
								setbreadcrumb={setBreadCrumb}
								toggle={props.toggle}
							/>
						</PrivateRoute>
					}
				/>
				<Route
					path='/contact'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Contact toggle={props.toggle} />
						</PrivateRoute>
					}
				/>
				<Route
					path='/users'
					element={
						<PrivateRoute authenticated={localAuth}>
							<Users toggle={props.toggle} />
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default Router
