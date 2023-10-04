import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { supertoggleContext } from '../context/supertoggleContext'
import { useSelector } from 'react-redux'
import {
	fetchBookingState,
	singleBooking,
} from '../features/bookings/bookingSlice'
import { Triangle } from 'react-loader-spinner'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiMessageRoundedDetail } from 'react-icons/bi'

const BookingsDetails = (props) => {
	const navigate = useNavigate()
	const { state, bookingBreadCrumb } = useContext(supertoggleContext)
	const location = useLocation()
	const { bookingId } = useParams()
	const [savedLastId, setSavedLastId] = useState('')
	const [currentBooking, setCurrentBooking] = useState([])
	const [spinner, setSpinner] = useState(true)
	const singleBookingData = useSelector(singleBooking)
	const bookingState = useSelector(fetchBookingState)

	useEffect(() => {
		if (
			savedLastId !== bookingId &&
			location.pathname === `/bookings/${bookingId}`
		) {
			// props.setbreadcrumb(`Bookings/${bookingId}`)
			bookingBreadCrumb(bookingId)
			setSavedLastId(bookingId)
		}
		if (bookingState === 'pending') {
			setSpinner(true)
		} else {
			setTimeout(() => {
				setSpinner(false)
			}, 500)
			setCurrentBooking(singleBookingData[0])
		}
	}, [
		savedLastId,
		bookingId,
		location.pathname,
		props,
		singleBookingData,
		bookingState,
		bookingBreadCrumb,
	])

	function formatDateString(inputDateString) {
		var date = new Date(inputDateString)
		var randomHour = Math.floor(Math.random() * 24)
		date.setHours(randomHour)
		function getDayWithSuffix(day) {
			if (day >= 11 && day <= 13) {
				return day + 'th'
			}
			switch (day % 10) {
				case 1:
					return day + 'st'
				case 2:
					return day + 'nd'
				case 3:
					return day + 'rd'
				default:
					return day + 'th'
			}
		}
		var dayWithSuffix = getDayWithSuffix(date.getDate())
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		}
		var formattedDate = date.toLocaleDateString('en-US', options)
		formattedDate = formattedDate.replace(date.getDate(), dayWithSuffix)
		formattedDate = formattedDate.replace('at', '|')
		return formattedDate
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<CTA onClick={() => navigate('/bookings')}>Back</CTA>
				{spinner ? (
					<SpinnerContainer>
						<Triangle
							height='150'
							width='150'
							color='#135846'
							ariaLabel='triangle-loading'
							wrapperClassName=''
							visible={spinner}
						/>
					</SpinnerContainer>
				) : (
					<>
						<LeftDetailsCard>
							<TopSideInnerDetailsCard>
								<PhotoContainer
									src={
										currentBooking
											? `https://robohash.org/${currentBooking.guest}.png?set=any`
											: ' '
									}
								/>
								<InfoBookingContainer>
									<TextFormatter>
										{currentBooking
											? currentBooking.guest
											: ' '}
									</TextFormatter>
									<TextFormatter type='small'>
										{currentBooking
											? `ID ${currentBooking.id}`
											: ' '}
									</TextFormatter>
									<IconContainer>
										<BsFillTelephoneFill />
									</IconContainer>
									<IconContainer type='message'>
										<BiMessageRoundedDetail />
										<span>Send Message</span>
									</IconContainer>
								</InfoBookingContainer>
							</TopSideInnerDetailsCard>
							<UnderTopSideInnerDetailsCard>
								<CheckinInfo>
									<p>Check In</p>
									<span>
										{currentBooking
											? formatDateString(
													currentBooking.check_in
											  )
											: ' '}
									</span>
								</CheckinInfo>
								<CheckinInfo>
									<p>Check Out</p>
									<span>
										{currentBooking
											? formatDateString(
													currentBooking.check_out
											  )
													.split('|')[0]
													.trim()
											: ' '}
									</span>
								</CheckinInfo>
							</UnderTopSideInnerDetailsCard>
							<RoomInfoContainer>
								<RoomInfoData>
									<RoomInfoDataTopText>
										<p>Room Info</p>
										<span>Deluxe Z - 002424</span>
									</RoomInfoDataTopText>
									<RoomInfoDataTopText>
										<p>Price</p>
										<span>$136 /Nigth</span>
									</RoomInfoDataTopText>
									<RoomInfoDataBottomText>
										<p>
											Experience the epitome of luxury and
											comfort in our Double Superior room.
											This spacious and elegantly
											appointed room is designed to
											provide you with the utmost
											relaxation and convenience during
											your stay. With a modern and stylish
											decor, it offers a serene oasis in
											the heart of the city.
										</p>
									</RoomInfoDataBottomText>
								</RoomInfoData>
								<RoomFacilitiesData>
									<p>Amenities</p>
									<RoomFacilitiesAmenities>
										<span>ICO 3 Bed Space</span>
									</RoomFacilitiesAmenities>
									<RoomFacilitiesAmenities>
										<span>ICO 24 Hours Guard</span>
									</RoomFacilitiesAmenities>
									<RoomFacilitiesAmenities>
										<span>ICO Free Wifi</span>
									</RoomFacilitiesAmenities>
									<br />
									<RoomFacilitiesAmenities type='small'>
										<span>3 Bed Space</span>
									</RoomFacilitiesAmenities>
									<RoomFacilitiesAmenities type='small'>
										<span>3 Bed Space</span>
									</RoomFacilitiesAmenities>
									<RoomFacilitiesAmenities type='small'>
										<span>3 Bed Space</span>
									</RoomFacilitiesAmenities>
								</RoomFacilitiesData>
							</RoomInfoContainer>
						</LeftDetailsCard>
						<RightDetailsCard></RightDetailsCard>
					</>
				)}
			</MainContainer>
		</>
	)
}

export default BookingsDetails

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
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
	text-align: left;
	height: 792px;
	width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
	background-color: #fff;
	border-radius: 10px;
`

const LeftDetailsCard = styled.div`
	width: 55%;
	height: 792px;
	display: inline-block;
	vertical-align: top;
`
const TopSideInnerDetailsCard = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 156px;
	margin: 40px auto 39px auto;
`

const PhotoContainer = styled.img`
	width: 156px;
	height: 156px;
	background: transparent 0% 0% no-repeat padding-box;
	border-radius: 8px;
	margin: 0px 0px 0px 0px;
	display: inline-block;
`
const InfoBookingContainer = styled.div`
	padding-left: 39px;
	width: 566px;
	height: 156px;
	margin: 0px 0px 0px 0px;
	display: inline-block;
	vertical-align: top;
	flex-shrink: 0;
	white-space: nowrap;
`

const TextFormatter = styled.p`
	text-align: left;
	color: ${(props) => (props.type === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.type === 'small' ? '400 14px Poppins' : '600 30px Poppins'};
`

const IconContainer = styled.div`
	width: ${(props) => (props.type === 'message' ? '209px' : '59px')};
	height: 59px;
	border: ${(props) =>
		props.type === 'message' ? '1px solid #e8f2ef' : '1px solid #e8f2ef'};
	border-radius: 12px;
	background-color: #fff;
	padding: 15px;
	margin: 30px 16px 0 0;
	font-size: ${(props) => (props.type === 'message' ? '30px' : '25px')};
	color: ${(props) => (props.type === 'message' ? '#fff' : '#135846')};
	background-color: ${(props) => (props.type === 'message' ? '#135846' : '#fff')};
	display: inline-block;
	vertical-align: top;
	transition: 0.3s all;
	&:hover {
		color: ${(props) => (props.type === 'message' ? '#135846' : '#fff')};
	background-color: ${(props) => (props.type === 'message' ? '#fff' : '#135846')};
	}
	span {
		display: inline-block;
		vertical-align: top;
		text-align: left;
		margin: 2px 0 0 16px;
		font: 400 16px Poppins};
		font: normal normal 600 Poppins;
	}
`

const UnderTopSideInnerDetailsCard = styled.div`
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	width: 725px;
	height: 95px;
	margin: 40px auto 39px auto;
	border-bottom: 3px solid #ebebeb;
`
const CheckinInfo = styled.div`
	box-sizing: border-box;
	width: 50%;
	height: 109px;
	p {
		font: 500 14px Poppins;
		color: #799283;
		margin-bottom: 10px;
	}
	span {
		font: 600 18px Poppins;
		color: #212121;
	}
`
const RoomInfoContainer = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 360px;
	margin: 40px auto 39px auto;
`
const RoomInfoData = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 200px;
`
const RoomInfoDataTopText = styled.div`
	display: inline-block;
	box-sizing: border-box;
	width: 50%;
	height: 90px;
	p {
		font: 400 15px Poppins;
		color: #799283;
		margin-bottom: 5px;
	}
	span {
		font: 500 24px Poppins;
		color: #212121;
	}
`
const RoomInfoDataBottomText = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 110px;
	p {
		font: 400 16px Poppins;
		color: #363636;
	}
	span {
		font: 600 18px Poppins;
		color: #212121;
	}
`
const RoomFacilitiesData = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 160px;
	p {
		font: 400 15px Poppins;
		color: #799283;
	}
`
const RoomFacilitiesAmenities = styled.div`
	width: fit-content;
	height: ${(props) => (props.type === 'small' ? '45px' : '65px')};
	background: #eef9f2;
	border-radius: 8px;
	margin: 8px;
	padding: ${(props) =>
		props.type === 'small' ? '12px 20px 12px 20px' : '20px'};
	display: inline-block;
	span {
		color: #135846;
		font: 500 16px Poppins;
	}
`

const RightDetailsCard = styled.div`
	width: 45%;
	height: 792px;
	background-color: #c5c5c5;
	border-radius: 0 10px 10px 0;
	display: inline-block;
`
