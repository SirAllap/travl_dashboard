import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import BookingDetails from '../pages/BookingDetails'
import Rooms from '../pages/Rooms'
import RoomDetails from '../pages/RoomDetails'
import Users from '../pages/Users'
import Login from '../pages/Login'
import Contact from '../pages/Contact'
import PrivateRoute from '../pages/PrivateRoute'
import CreateRoom from '../pages/CreateRoom'
import EditRoom from '../pages/EditRoom'
import CreateUser from '../pages/CreateUser'

const Router = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/*'
					element={
						<PrivateRoute>
							<Routes>
								<Route index element={<Dashboard />} />
								<Route
									path='/bookings'
									element={<Bookings />}
								/>
								<Route
									path='/bookings/:bookingId'
									element={<BookingDetails />}
								/>
								<Route path='/rooms' element={<Rooms />} />
								<Route
									path='/rooms/create-room'
									element={<CreateRoom />}
								/>
								<Route
									path='/rooms/edit-room/:roomId'
									element={<EditRoom />}
								/>
								<Route
									path='/rooms/:roomId'
									element={<RoomDetails />}
								/>
								<Route path='/contact' element={<Contact />} />
								<Route path='/users' element={<Users />} />
								<Route
									path='/users/create-employee'
									element={<CreateUser />}
								/>
							</Routes>
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default Router
