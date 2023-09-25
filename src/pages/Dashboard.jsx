import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MainContainer = styled.section`
	margin-left: 100px;
`

const Button = styled.button`
	color: #bf4f74;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #bf4f74;
	border-radius: 3px;
`

const Dashboard = () => {
	return (
		<>
			<MainContainer>
				<Button>
					<Link to='/bookings'>Bookings</Link>
				</Button>
				<Button>
					<Link to='/rooms'>Rooms</Link>
				</Button>
				<Button>
					<Link to='/users'>Users</Link>
				</Button>
			</MainContainer>
		</>
	)
}

export default Dashboard
