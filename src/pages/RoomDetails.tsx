import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { supertoggleContext } from '../context/ToggleContext'
import { useSelector } from 'react-redux'
import { Triangle } from 'react-loader-spinner'
import { fetchRoomState, singleRoom } from '../features/rooms/roomSlice'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import * as color from '../components/Variables'
import { useAppSelector } from '../app/hooks'
import { IRoom } from '../features/interfaces/interfaces'

const RoomDetails = () => {
	const navigate = useNavigate()
	const singleRoomData = useAppSelector(singleRoom)
	const initialRoomState = useAppSelector(fetchRoomState)
	const { state, roomBreadCrumb } = useContext(supertoggleContext)!
	const location = useLocation()
	const { roomId } = useParams()
	const [savedLastId, setSavedLastId] = useState<string>('')
	const [currentRoom, setCurrentRoom] = useState<IRoom>()
	const [spinner, setSpinner] = useState(true)

	useEffect(() => {
		if (
			savedLastId !== roomId &&
			location.pathname === `/rooms/${roomId}` &&
			roomId !== undefined
		) {
			roomBreadCrumb(roomId)
			setSavedLastId(roomId)
		}
		if (initialRoomState === 'pending') {
			setSpinner(true)
		} else if (initialRoomState === 'fulfilled') {
			setSpinner(false)
			setCurrentRoom(singleRoomData[0])
		}
	}, [
		savedLastId,
		roomId,
		location.pathname,
		singleRoomData,
		initialRoomState,
		roomBreadCrumb,
	])

	const applyDiscount = (currentPrice: number, discount: number) => {
		const result = currentPrice - currentPrice * (discount / 100)
		return `$${result}`
	}

	return (
		<>
			{currentRoom !== undefined && (
				<MainContainer toggle={state.position}>
					<CTA onClick={() => navigate('/rooms')}>Back</CTA>
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
								<RoomInfoContainer>
									<RoomInfoData>
										<RoomInfoDataTopText>
											<p>Room Info</p>
											<span>{currentRoom.room_type}</span>
										</RoomInfoDataTopText>
										<RoomInfoDataTopText>
											<p>Final Price</p>
											<span>
												{currentRoom.offer_price
													? applyDiscount(
															currentRoom.price,
															currentRoom.discount
													  )
													: currentRoom.price}
												/Nigth
											</span>
										</RoomInfoDataTopText>
										<RoomInfoDataBottomText>
											<p>{currentRoom.description}</p>
										</RoomInfoDataBottomText>
									</RoomInfoData>
									<RoomFacilitiesData>
										<p>Amenities</p>
										{currentRoom.amenities.map(
											(elem, index) => (
												<RoomFacilitiesAmenities
													key={index}
												>
													<span>{elem.name}</span>
												</RoomFacilitiesAmenities>
											)
										)}
									</RoomFacilitiesData>
								</RoomInfoContainer>
							</LeftDetailsCard>
							<RightDetailsCard>
								<Swiper
									modules={[Navigation, A11y]}
									spaceBetween={0}
									slidesPerView={1}
									navigation
								>
									{currentRoom.room_photo.map(
										(elem, index) => (
											<SwiperSlide key={index}>
												<RooomPhotos
													src={elem}
												></RooomPhotos>
											</SwiperSlide>
										)
									)}
								</Swiper>
							</RightDetailsCard>
						</>
					)}
				</MainContainer>
			)}
		</>
	)
}

export default RoomDetails

const RooomPhotos = styled.img`
	height: 100%;
	object-fit: contain;
`

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
	height: 792px;
	width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
	background-color: #fff;
	border-radius: 10px;
`

const LeftDetailsCard = styled.div`
	width: 35%;
	height: 792px;
	display: inline-block;
	vertical-align: top;
`

const RoomInfoContainer = styled.div`
	width: 100%;
	height: 792px;
	padding: 20px;
`
const RoomInfoData = styled.div`
	width: 100%;
	height: 320px;
`
const RoomInfoDataTopText = styled.div`
	display: inline-block;
	box-sizing: border-box;
	width: 50%;
	height: 90px;
	p {
		font: 400 15px Poppins;
		color: ${color.softer_strongGrey};
		margin-bottom: 5px;
	}
	span {
		font: 500 24px Poppins;
		color: ${color.strongPurple};
	}
`
const RoomInfoDataBottomText = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 270px;
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
	width: 100%;
	height: 652px;
	box-sizing: border-box;
	width: 100%;
	height: 160px;
	p {
		font: 400 15px Poppins;
		color: ${color.softer_strongGrey};
	}
`

interface RoomFacilitiesAmenitiesProps {
	readonly types?: string
}

const RoomFacilitiesAmenities = styled.div<RoomFacilitiesAmenitiesProps>`
	width: fit-content;
	height: ${(props) => (props.types === 'small' ? '45px' : '65px')};
	background: ${color.softerPLus_ligthPurple};
	border-radius: 8px;
	margin: 8px;
	padding: ${(props) =>
		props.types === 'small' ? '12px 20px 12px 20px' : '20px'};
	display: inline-block;
	span {
		color: ${color.softer_strongPurple};
		font: 500 16px Poppins;
	}
`

const RightDetailsCard = styled.div`
	padding: 20px;
	width: 65%;
	height: 100%;
	background-color: #fff;
	border-radius: 0 10px 10px 0;
	display: inline-block;
`
