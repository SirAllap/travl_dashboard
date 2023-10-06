import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { supertoggleContext } from '../context/supertoggleContext'
import { useSelector } from 'react-redux'
import { Triangle } from 'react-loader-spinner'
import { fetchRoomState, singleRoom } from '../features/rooms/roomSlice'

const RoomDetails = () => {
	const navigate = useNavigate()
	const singleRoomData = useSelector(singleRoom)
	const initialRoomState = useSelector(fetchRoomState)
	const { state, roomBreadCrumb } = useContext(supertoggleContext)
	const location = useLocation()
	const { roomId } = useParams()
	const [savedLastId, setSavedLastId] = useState('')
	const [currentRoom, setCurrentRoom] = useState([])
	const [spinner, setSpinner] = useState(true)

	useEffect(() => {
		if (
			savedLastId !== roomId &&
			location.pathname === `/rooms/${roomId}`
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
	console.log(currentRoom)

	return (
		<>
			<MainContainer toggle={state.position}>
				<CTA onClick={() => navigate('/rooms')}>Back</CTA>
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
						<RightDetailsCard>
							<RooomPhotos
								src={currentRoom.room_photo[0]}
							></RooomPhotos>
						</RightDetailsCard>
					</>
				)}
			</MainContainer>
		</>
	)
}

export default RoomDetails

const RooomPhotos = styled.img`
	width: 100%;
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
	height: 450px;
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
	width: 100%;
	height: 270px;
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
	width: 100%;
	height: 652px;
	box-sizing: border-box;
	width: 100%;
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
	width: 65%;
	height: 792px;
	background-color: #fff;
	border-radius: 0 10px 10px 0;
	display: inline-block;
`
