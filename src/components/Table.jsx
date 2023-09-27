import React from 'react'
import styled from 'styled-components'
import bookings from '../data/bookings.json'

const Table = (props) => {
	return (
		<>
			{bookings.bookings.map((booking, index) => (
				<p key={index}>{booking.guest}</p>
			))}
		</>
	)
}

export default Table
