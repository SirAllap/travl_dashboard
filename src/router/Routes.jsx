import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import Rooms from '../pages/Rooms'
import Users from '../pages/Users'
import Contact from '../pages/Contact'

const Router = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/bookings' element={<Bookings />} />
				<Route path='/rooms' element={<Rooms />} />
				<Route path='/users' element={<Users />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</>
	)
}

export default Router
