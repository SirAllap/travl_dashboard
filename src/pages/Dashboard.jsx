import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
	return (
		<>
			<button>
				<Link to='/bookings'>Bookings</Link>
				<Link to='/rooms'>Rooms</Link>
				<Link to='/users'>Users</Link>
			</button>
		</>
	)
}

export default Dashboard
