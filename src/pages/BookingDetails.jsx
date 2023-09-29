import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const BookingsDetails = (props) => {
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

				<LeftDetailsCard>
					<TopSideInnerDetailsCard>
						<PhotoContainer></PhotoContainer>
						<InfoBookingContainer></InfoBookingContainer>
					</TopSideInnerDetailsCard>
				</LeftDetailsCard>
				<RightDetailsCard></RightDetailsCard>
			</MainContainer>
		</>
	)
}

export default BookingsDetails

const CTA = styled.button`
	font: normal normal 600 18px Poppins;
	position: absolute;
	left: 0px;
	top: -63px;
	width: 138px;
	height: 33px;
	background-color: #ffedec;
	border: none;
	border-radius: 4px;
	color: #e23428;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: #fff;
		background-color: #e23428;
	}
`

const MainContainer = styled.main`
	position: relative;
	text-align: center;
	height: 792px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
	background-color: #fff;
	border-radius: 10px;
`

const LeftDetailsCard = styled.div`
	width: 50%;
	height: 792px;
	display: inline-block;
`
const TopSideInnerDetailsCard = styled.div`
	box-sizing: border-box;
	border: 1px solid red;

	width: 645px;
	height: 156px;
	margin: 40px 39px 39px 40px;
`

const PhotoContainer = styled.div`
	width: 156px;
	height: 156px;
	background: #c5c5c5 0% 0% no-repeat padding-box;
	border-radius: 8px;
	margin: 0px 0px 0px 0px;
	display: inline-block;
`
const InfoBookingContainer = styled.div`
	padding-left: 39px;
	width: 479px;
	height: 156px;
	margin: 0px 0px 0px 0px;
	background-color: rebeccapurple;
	display: inline-block;
`

const RightDetailsCard = styled.div`
	width: 50%;
	height: 792px;
	background-color: #c5c5c5;
	border-radius: 0 10px 10px 0;
	display: inline-block;
`
