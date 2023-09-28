import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const MainContainer = styled.main`
	outline: 1px solid rebeccapurple;
	position: relative;
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const CTA = styled.button`
	font: normal normal 600 18px Poppins;
	position: absolute;
	left: 0px;
	width: 158px;
	height: 47px;
	background-color: #ffedec;
	border: none;
	border-radius: 8px;
	color: #e23428;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: #fff;
		background-color: #e23428;
	}
`
const Bookings = (props) => {
	const location = useLocation()
	const { bookingId } = useParams()
	const [savedLastId, setSavedLastId] = useState('')
	useEffect(() => {
		if (
			savedLastId !== bookingId &&
			location.pathname === `/bookings/${bookingId}`
		) {
			props.setbreadcrumb(`Bookings/${bookingId}`)
			setSavedLastId(bookingId)
		}
	}, [savedLastId, bookingId, location.pathname, props])

	const navigate = useNavigate()
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<CTA onClick={() => navigate('/bookings')}>Back</CTA>
				<h1>booking</h1>
			</MainContainer>
		</>
	)
}

export default Bookings
