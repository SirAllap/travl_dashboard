import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { supertoggleContext } from '../context/ToggleContext'
import {
	fetchBookingState,
	singleBooking,
} from '../features/bookings/bookingSlice'
import { Triangle } from 'react-loader-spinner'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IBooking, IRoom } from '../features/interfaces/interfaces'
import { fetchRoomState, singleRoom } from '../features/rooms/roomSlice'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { fetchOneBooking } from '../features/bookings/bookingThunks'
import { fetchOneRoom } from '../features/rooms/roomThunks'

const BookingsDetails: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const singleBookingData = useAppSelector(singleBooking)
	const singleRoomData = useAppSelector(singleRoom)
	const initialBookingState = useAppSelector(fetchBookingState)
	const initialRoomState = useAppSelector(fetchRoomState)
	const { state, bookingBreadCrumb } = useContext(supertoggleContext)!
	const location = useLocation()
	const { bookingId } = useParams<string>()
	const [savedLastId, setSavedLastId] = useState<string>('')
	const [currentBooking, setCurrentBooking] = useState<IBooking>()
	const [currentRoom, setCurrentRoom] = useState<IRoom>()
	const [spinner, setSpinner] = useState<boolean>(true)

	useEffect(() => {
		if (
			savedLastId !== bookingId &&
			location.pathname === `/bookings/${bookingId}` &&
			bookingId !== undefined
		) {
			bookingBreadCrumb(bookingId)
			setSavedLastId(bookingId)
		}
		if (
			initialBookingState === 'pending' &&
			initialRoomState === 'pending'
		) {
			setSpinner(true)
		} else if (
			initialBookingState === 'fulfilled' &&
			initialRoomState === 'fulfilled'
		) {
			setSpinner(false)
			setCurrentBooking(singleBookingData)
			setCurrentRoom(singleRoomData)
		}
	}, [
		savedLastId,
		bookingId,
		location.pathname,
		singleBookingData,
		initialBookingState,
		initialRoomState,
		bookingBreadCrumb,
	])

	const formatDateString = (inputDateString: string) => {
		var date: Date = new Date(inputDateString)
		const getDayWithSuffix = (day: number) => {
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
		var dayWithSuffix: string = getDayWithSuffix(date.getDate())
		interface IOptions {
			year: 'numeric'
			month: 'long'
			day: 'numeric'
			hour: 'numeric'
			minute: 'numeric'
			hour12: boolean
		}
		var options: IOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		}
		let formattedDate = date.toLocaleDateString('en-US', options)
		let toStringDate = date.getDate().toString()
		formattedDate = formattedDate.replace(toStringDate, dayWithSuffix)
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
							color={color.softer_strongPurple}
							ariaLabel='triangle-loading'
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
											? `ID ${currentBooking._id}`
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
										<span>
											{currentBooking
												? currentBooking.room_type
												: ''}
										</span>
									</RoomInfoDataTopText>
									<RoomInfoDataTopText>
										<p>Price</p>
										<span>
											$
											{currentRoom
												? currentRoom.price
												: ''}
											/Nigth
										</span>
									</RoomInfoDataTopText>
									<RoomInfoDataBottomText>
										<p>
											{currentRoom
												? currentRoom.description
												: ''}
										</p>
									</RoomInfoDataBottomText>
								</RoomInfoData>
								<RoomFacilitiesData>
									{currentRoom
										? currentRoom.amenities.map(
												(elem: any, index) =>
													elem.name === 'Towels' ||
													elem.name ===
														'Coffee Set' ||
													elem.name === 'Free Wifi' ||
													elem.name ===
														'Television' ? (
														<RoomFacilitiesAmenities
															colorProp={
																currentRoom
																	? currentRoom
																			.amenities
																			.length
																	: 1
															}
															key={index}
															type='small'
														>
															<span>
																{elem.name}
															</span>
														</RoomFacilitiesAmenities>
													) : (
														<RoomFacilitiesAmenities
															colorProp={
																currentRoom
																	? currentRoom
																			.amenities
																			.length
																	: 1
															}
															key={index}
														>
															<span>
																{elem.name}
															</span>
														</RoomFacilitiesAmenities>
													)
										  )
										: ''}
								</RoomFacilitiesData>
							</RoomInfoContainer>
						</LeftDetailsCard>
						<RightDetailsCard>
							<Swiper
								style={{
									height: '100%',
								}}
								modules={[Navigation, A11y]}
								spaceBetween={1}
								slidesPerView={1}
								navigation
							>
								{currentRoom
									? currentRoom.room_photo.map(
											(elem, index) => (
												<SwiperSlide key={index}>
													<RooomPhotos
														src={elem}
													></RooomPhotos>
												</SwiperSlide>
											)
									  )
									: ''}
							</Swiper>
						</RightDetailsCard>
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
	transform: translate(-50%, 150%);
`

const CTA = styled.button`
	font: normal normal 600 18px Poppins;
	position: absolute;
	left: 0px;
	top: -40px;
	width: 138px;
	height: 33px;
	color: ${color.normalPinkie};
	background-color: ${color.softer_ligthPinkie};
	border: none;
	border-radius: 4px;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: white;
		background-color: ${color.normalPinkie};
	}
`

interface MainContainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MainContainerProps>`
	position: relative;
	text-align: left;
	max-height: 822px;
	width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
	background-color: white;
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

interface TextFormatterProps {
	readonly type?: string
}

const TextFormatter = styled.p<TextFormatterProps>`
	text-align: left;
	color: ${(props) =>
		props.type === 'small'
			? `${color.softer_strongGrey}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.type === 'small' ? '400 14px Poppins' : '600 30px Poppins'};
`

interface IconContainerProps {
	readonly type?: string
}

const IconContainer = styled.div<IconContainerProps>`
	width: ${(props) => (props.type === 'message' ? '209px' : '59px')};
	height: 59px;
	border: ${(props) =>
		props.type === 'message'
			? `1px solid ${color.softer_normalPinkie}`
			: `1px solid ${color.softer_normalPinkie}`};
	border-radius: 12px;
	background-color: #fff;
	padding: 15px;
	margin: 30px 16px 0 0;
	font-size: ${(props) => (props.type === 'message' ? '30px' : '25px')};
	color: ${(props) =>
		props.type === 'message' ? '#fff' : `${color.softer_normalPinkie}`};
	background-color: ${(props) =>
		props.type === 'message' ? `${color.normalPinkie}` : '#fff'};
	display: inline-block;
	vertical-align: top;
	transition: 0.3s all;
	&:hover {
		color: ${(props) =>
			props.type === 'message' ? `${color.softer_normalPinkie}` : '#fff'};
		background-color: ${(props) =>
			props.type === 'message' ? '#fff' : `${color.normalPinkie}`};
	}
	span {
		display: inline-block;
		vertical-align: top;
		text-align: left;
		margin: 2px 0 0 16px;
		font: 400 16px Poppins;
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
		font: 400 14px Poppins;
		color: ${color.softer_normalGrey};
		margin-bottom: 10px;
	}
	span {
		font: 500 18px Poppins;
		color: ${color.strongGrey};
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
		color: ${color.softer_normalGrey};
		margin-bottom: 5px;
	}
	span {
		font: 500 24px Poppins;
		color: ${color.strongGrey};
	}
`
const RoomInfoDataBottomText = styled.div`
	box-sizing: border-box;
	width: 725px;
	height: 110px;
	p {
		font: 400 16px Poppins;
		color: ${color.strongGrey};
	}
	span {
		font: 600 18px Poppins;
		color: ${color.strongGrey};
	}
`

const RoomFacilitiesData = styled.div`
	box-sizing: border-box;
	width: 735px;
	max-height: 250px;
	p {
		font: 400 15px Poppins;
		color: ${color.softer_normalGrey};
	}
`

interface RoomFacilitiesAmenitiesProps {
	readonly type?: string
	readonly colorProp: number
}

const RoomFacilitiesAmenities = styled.div<RoomFacilitiesAmenitiesProps>`
	width: fit-content;
	height: ${(props) => (props.type === 'small' ? '45px' : '65px')};

	background-color: ${(props) =>
		props.colorProp === 10
			? `${color.softer_ligthOrange}`
			: props.colorProp === 9
			? `${color.softer_ligthPurple}`
			: `${color.softer_ligthGrey}`};
	border-radius: 8px;
	margin: 8px;
	padding: ${(props) =>
		props.type === 'small' ? '12px 20px 12px 20px' : '20px'};
	display: inline-block;
	span {
		color: ${(props) =>
			props.colorProp === 10
				? `${color.normalOrange}`
				: props.colorProp === 9
				? `${color.softer_strongPurple}`
				: `${color.normalGrey}`};
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

const RooomPhotos = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 0 10px 10px 0;
`
