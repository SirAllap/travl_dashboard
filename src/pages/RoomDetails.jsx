import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const RoomDetails = (props) => {
	const location = useLocation()
	const { roomId } = useParams()
	const [savedLastId, setSavedLastId] = useState('')
	useEffect(() => {
		if (
			savedLastId !== roomId &&
			location.pathname === `/rooms/${roomId}`
		) {
			props.setbreadcrumb(`Rooms/${roomId}`)
			setSavedLastId(roomId)
		}
	}, [savedLastId, roomId, location.pathname, props])

	const navigate = useNavigate()
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<CTA onClick={() => navigate('/rooms')}>Back</CTA>
				<h1>RoomDetails</h1>
			</MainContainer>
		</>
	)
}

export default RoomDetails

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
	top: -63px;
	width: 138px;
	height: 33px;
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
