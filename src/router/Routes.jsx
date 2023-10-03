import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import BookingDetails from '../pages/BookingDetails'
import Rooms from '../pages/Rooms'
import RoomDetails from '../pages/RoomDetails'
import Users from '../pages/Users'
import Login from '../pages/Login'
import Contact from '../pages/Contact'
import { authenticationContext } from '../context/authenticationContext'

const Router = (props) => {
	const [breadCrumb, setBreadCrumb] = useState('')
	const { state } = useContext(authenticationContext)
	useEffect(() => {
		props.setNewBreadCrumb(breadCrumb)
	}, [breadCrumb, props])
	if (!state.auth) {
		return <Login />
	} else
		return (
			<>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route element={<Dashboard />} path='/' />
					<Route element={<Dashboard />} path='*' />
					<Route element={<Dashboard />} path='/' />
					<Route path='/bookings' element={<Bookings />} />
					<Route
						path='/bookings/:bookingId'
						element={
							<BookingDetails setbreadcrumb={setBreadCrumb} />
						}
					/>
					<Route path='/rooms' element={<Rooms />} />
					<Route
						path='/rooms/:roomId'
						element={<RoomDetails setbreadcrumb={setBreadCrumb} />}
					/>
					<Route path='/contact' element={<Contact />} />
					<Route path='/users' element={<Users />} />
				</Routes>
			</>
		)
}

export default Router
