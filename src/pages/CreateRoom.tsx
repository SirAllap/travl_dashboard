import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createRoomState, initialRooms } from '../features/rooms/roomSlice'
import { supertoggleContext } from '../context/ToggleContext'
import { createOneRoom } from '../features/rooms/roomThunks'
import { Triangle } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'

const CreateRoom: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const initialRoomData = useAppSelector(initialRooms)
	const createRoomCurretState = useAppSelector(createRoomState)
	const { state } = useContext(supertoggleContext)!
	const [spinner, setSpinner] = useState(false)

	useEffect(() => {
		if (createRoomCurretState === 'pending') {
			setSpinner(true)
		} else if (createRoomCurretState === 'fulfilled') {
			setSpinner(false)
			navigate('/rooms')
		}
	}, [initialRoomData, createRoomCurretState, navigate])

	const [newRoomType, setNewRoomType] = useState('')
	const handleRoomTypeSelector = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		switch (event.target.value) {
			case 'single':
				setNewRoomType('Single Bed')
				break
			case 'double':
				setNewRoomType('Double Bed')
				break
			case 'double_superior':
				setNewRoomType('Double Superior')
				break
			case 'suite':
				setNewRoomType('Suite')
				break
			default:
				break
		}
	}

	const [newRoomNumber, setNewRoomNumber] = useState('')
	const handleRoomNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewRoomNumber(event.target.value)
	}

	const [newRoomDescription, setNewRoomDescription] = useState('')
	const handleRoomDescription = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewRoomDescription(event.target.value)
	}

	const [newRoomPrice, setNewRoomPrice] = useState(0)
	const handleRoomPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewRoomPrice(parseInt(event.target.value))
	}

	const [newRoomOffer, setNewRoomOffer] = useState('false')
	const handleRadioOffer = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewRoomOffer(event.target.value)
	}

	const [newRoomDiscount, setNewRoomDiscount] = useState(0)
	const handleRadioDiscount = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewRoomDiscount(parseInt(event.target.value))
	}

	interface IAmenities {
		name: string
		description: string
	}

	const [newRoomAmenities, setNewRoomAmenities] = useState<IAmenities[]>([])
	const [newRoomAmenitiesType, setNewRoomAmenitiesType] = useState<string>('')
	const handleNewRoomAmenities = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		switch (event.target.value) {
			case 'basic':
				setNewRoomAmenitiesType('basic')
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Cozy bed area' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
				])
				break
			case 'midrange':
				setNewRoomAmenitiesType('midrange')
				setNewRoomAmenities([
					{
						name: '1/2 Bathroom',
						description: 'Private half bathroom',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
				])
				break
			case 'full':
				setNewRoomAmenitiesType('full')
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Spacious bed area' },
					{
						name: '24-Hour Guard',
						description: 'Security available around the clock',
					},
					{
						name: 'Free Wifi',
						description: 'High-speed internet access',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
					{
						name: 'Nice Views',
						description: 'Scenic views from the room',
					},
				])
				break
			case 'premium':
				setNewRoomAmenitiesType('premium')
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Spacious bed area' },
					{
						name: '24-Hour Guard',
						description: 'Security available around the clock',
					},
					{
						name: 'Free Wifi',
						description: 'High-speed internet access',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
					{ name: 'Bathtub', description: 'Luxurious bathtub' },
					{ name: 'Jacuzzi', description: 'Private Jacuzzi' },
					{
						name: 'Nice Views',
						description: 'Scenic views from the room',
					},
				])
				break
			default:
				break
		}
	}

	function randomID() {
		return Math.floor(Math.random() * 1000000).toString()
	}
	const handleCreateOneRoom = () => {
		const newRoom = {
			room_number: newRoomNumber,
			id: randomID(),
			room_photo: [
				'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			],
			room_type: newRoomType,
			description: newRoomDescription,
			amenities_type: newRoomAmenitiesType,
			amenities: newRoomAmenities,
			price: newRoomPrice,
			offer_price: newRoomOffer === 'true' ? true : false,
			discount: newRoomDiscount,
			status: 'Available',
		}
		dispatch(createOneRoom(newRoom))
	}

	const [autoAddDescription, setAutoAddDescription] = useState(false)
	const quickAddDescription = () => {
		setAutoAddDescription(true)
		setNewRoomDescription(
			'Experience the epitome of luxury and comfort in our Double Superior room. This spacious and elegantly appointed room is designed to provide you with the utmost relaxation and convenience during your stay. With a modern and stylish decor, it offers a serene oasis in the heart of the city.'
		)
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<NavLink to={'/rooms'}>
					<CTA>Back</CTA>
				</NavLink>
				<TitleText newroom='title'>Create New Room</TitleText>
				<ModalInnerInfo>
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
							<ModalInnerLeftInfo>
								<CreateRoomInputLable htmlFor='roomType'>
									Room Type:
								</CreateRoomInputLable>
								<RoomTypeSelector
									name='roomType'
									id='roomType'
									onChange={handleRoomTypeSelector}
									defaultValue='roomtype'
								>
									<option value='roomtype' disabled hidden>
										Select the room type:
									</option>
									<option value='single'>Single Bed</option>
									<option value='double'>Double Bed</option>
									<option value='double_superior'>
										Double Superior
									</option>
									<option value='suite'>Suite</option>
								</RoomTypeSelector>

								<CreateRoomInputLable htmlFor='roomNumber'>
									Room Number:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='roomNumber'
									id='roomNumber'
									type='number'
									placeholder='e.g: 207'
									min='101'
									max='910'
									onChange={handleRoomNumber}
								/>
								<Info>
									There are a total of 9 floors in the
									building, with each floor consisting of 10
									rooms. To maintain a consistent numbering
									system, the first room on each floor is
									designated as room 101, while the last room
									is numbered as room 110. This numbering
									scheme is applied uniformly across all
									floors.
								</Info>

								<CreateRoomInputLable htmlFor='roomDescription'>
									Description:
								</CreateRoomInputLable>
								<CreateRoomTextArea
									id='roomDescription'
									name='roomDescription'
									onChange={handleRoomDescription}
									defaultValue={
										autoAddDescription
											? 'Experience the epitome of luxury and comfort in our Double Superior room. This spacious and elegantly appointed room is designed to provide you with the utmost relaxation and convenience during your stay. With a modern and stylish decor, it offers a serene oasis in the heart of the city.'
											: ''
									}
								></CreateRoomTextArea>
								<ADDCTA onClick={quickAddDescription}>
									FILL
								</ADDCTA>
							</ModalInnerLeftInfo>
							<ModalInnerRightInfo>
								<CreateRoomInputLable htmlFor='roomPrice'>
									Price per nigth:
								</CreateRoomInputLable>
								<CreateRoomInput
									id='roomPrice'
									name='roomPrice'
									type='number'
									placeholder='e.g: $196'
									onChange={handleRoomPrice}
								/>
								<br />
								<br />
								<br />
								<fieldset style={{ border: 'none' }}>
									<CreateRoomInputLable as='legend'>
										Offer
									</CreateRoomInputLable>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='radioNo'
									>
										No
									</CreateRoomInputLable>
									<CreateRoomInput
										checked={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='radioNo'
										name='offer'
										value='false'
										onChange={handleRadioOffer}
									/>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='radioYes'
									>
										Yes
									</CreateRoomInputLable>
									<CreateRoomInput
										radio='radio'
										type='radio'
										id='radioYes'
										name='offer'
										value='true'
										onChange={handleRadioOffer}
									/>
								</fieldset>
								<fieldset
									style={{
										border: 'none',
										opacity:
											newRoomOffer === 'false'
												? '0.4'
												: '1',
									}}
								>
									<CreateRoomInputLable as='legend'>
										Discount ammount:
									</CreateRoomInputLable>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='5'
									>
										5%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='5'
										name='discount_ammount'
										value='5'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='10'
									>
										10%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='10'
										name='discount_ammount'
										value='10'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='15'
									>
										15%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='15'
										name='discount_ammount'
										value='15'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='20'
									>
										20%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='20'
										name='discount_ammount'
										value='20'
										onChange={handleRadioDiscount}
									/>
								</fieldset>
								<br />
								<br />
								<br />

								<CreateRoomInputLable
									types='name'
									htmlFor='roomAmenitiesSelector'
								>
									Amenities Pack:
								</CreateRoomInputLable>
								<RoomTypeSelector
									name='roomAmenitiesSelector'
									id='roomAmenitiesSelector'
									onChange={handleNewRoomAmenities}
									defaultValue='byamenities'
								>
									<option value='byamenities' disabled hidden>
										Select the amenities pack:
									</option>
									<option value='premium'>
										Premium Package
									</option>
									<option value='full'>Full Package</option>
									<option value='midrange'>
										Midrange Package
									</option>
									<option value='basic'>Basic Package</option>
								</RoomTypeSelector>
							</ModalInnerRightInfo>
						</>
					)}
					<SaveCTA onClick={handleCreateOneRoom}>Create Room</SaveCTA>
				</ModalInnerInfo>
			</MainContainer>
		</>
	)
}

export default CreateRoom

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 40%;
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

const ModalInnerInfo = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: start;
	width: 100%;
	height: 600px;
	background-color: white;
	border-radius: 0px 0px 20px 20px;
`
const ModalInnerLeftInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`
const ModalInnerRightInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`

interface CreateRoomInputLableProps {
	readonly radio?: string
	readonly types?: string
}

const CreateRoomInputLable = styled.label<CreateRoomInputLableProps>`
	display: ${(props) => (props.radio === 'radio' ? 'inline' : 'block')};
	text-align: left;
	font: normal normal 500 17px Poppins;
	color: ${color.strongPurple};
	padding: 15px 0 10px 0;
`

interface CreateRoomInputProps {
	readonly radio?: string
}

const CreateRoomInput = styled.input<CreateRoomInputProps>`
	${(props) => {
		switch (props.radio) {
			case 'radio':
				return css`
					margin: 0 25px 0 5px;
				`
			default:
				return css`
					font: 500 16px Poppins;
					height: 47px;
					width: 400px;
					background-color: #fff;
					border: 2px solid ${color.ligthPurple};
					color: ${color.softer_strongPurple};
					outline: none;
					border-radius: 8px;
					padding-left: 15px;
					&:focus {
						outline: 2px solid ${color.softer_ligthPurple};
					}
				`
		}
	}}
`

const Info = styled.p`
	width: 400px;
	color: ${color.normalPinkie};
	font: 200 11px Poppins;
	text-align: justify;
`

const CreateRoomTextArea = styled.textarea`
	font: 500 16px Poppins;
	height: 141px;
	width: 400px;
	resize: none;
	background-color: #fff;
	border: 2px solid ${color.ligthPurple};
	color: ${color.softer_strongPurple};
	outline: none;
	border-radius: 8px;
	padding: 5px 15px 5px 15px;
	text-align: justify;
	&:focus {
		outline: 2px solid ${color.softer_ligthPurple};
	}
	&::-webkit-scrollbar {
		width: 10px;
		background-color: #ebf1ef;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
		background-color: rgba(102, 51, 153, 0.153);
	}
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
		border-radius: 2px;
		background-color: rgba(235, 241, 239, 0.612);
	}
`

const RoomTypeSelector = styled.select`
	height: 47px;
	width: 400px;
	background-color: #fff;
	border: 2px solid ${color.ligthPurple};
	color: ${color.softer_strongPurple};
	outline: none;
	font: 500 16px Poppins;
	border-radius: 8px;
	cursor: pointer;
	padding-left: 15px;
	&:focus {
		outline: 2px solid ${color.softer_ligthPurple};
	}
`
const SaveCTA = styled.button`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 0px;
	width: 90%;
	height: 47px;
	color: ${color.normalPurple};
	background-color: ${color.softer_ligthPurple};
	border: none;
	border-radius: 8px;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: white;
		background-color: ${color.normalPurple};
	}
`

const ADDCTA = styled.button`
	position: absolute;
	left: 34.4%;
	top: 47.5%;
	border: none;
	width: 100px;
	border-radius: 2px;
	color: white;
	background-color: ${color.normalPurple};
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		background-color: ${color.softer_normalPurple};
	}
`

interface MainContainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MainContainerProps>`
	position: relative;
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

interface TitleTextProps {
	readonly newroom: string
}

const TitleText = styled.h1<TitleTextProps>`
	background-color: #fff;
	border-radius: 20px 20px 0px 0px;
	border-bottom: 1px dashed ${color.ligthPurple};
	color: ${color.strongPurple};
	font: ${(props) =>
		props.newroom === 'title' ? '600 25px Poppins' : '500 25px Poppins'};
	text-align: center;
	padding: 5px;
`
