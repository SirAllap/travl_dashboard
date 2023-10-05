import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Table from '../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoomState, initialRooms } from '../features/rooms/roomSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { supertoggleContext } from '../context/supertoggleContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	createOneRoom,
	deleteRoom,
	fetchInitialRooms,
	fetchOneRoom,
} from '../features/rooms/roomThunks'
import { Triangle } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'

const Rooms = (props) => {
	const dispatch = useDispatch()
	const initialRoomData = useSelector(initialRooms)
	const initialRoomState = useSelector(fetchRoomState)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(true)
	const [displayData, setDisplayData] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
	const [currentId, setCurrentId] = useState('')
	const [toggleModalNewRoom, setToggleModalNewRoom] = useState(false)

	useEffect(() => {
		dispatch(fetchInitialRooms())
	}, [dispatch])

	useEffect(() => {
		if (initialRoomState === 'pending') {
			setSpinner(true)
		} else if (initialRoomState === 'fulfilled') {
			setSpinner(false)
			setDisplayData(initialRoomData)
		}
	}, [initialRoomData, initialRoomState])

	const handleModalMore = (id) => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
		setCurrentId(id)
	}

	const whoAmI = {
		name: 'rooms',
		redirect: true,
	}

	const applyDiscount = (currentPrice, discount) => {
		const result = currentPrice - currentPrice * (discount / 100)
		return `$${result}`
	}

	const [newRoomType, setNewRoomType] = useState('')
	const handleRoomTypeSelector = (event) => {
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
	const handleRoomNumber = (event) => {
		setNewRoomNumber(event.target.value)
	}

	const [newRoomDescription, setNewRoomDescription] = useState('')
	const handleRoomDescription = (event) => {
		setNewRoomDescription(event.target.value)
	}

	const [newRoomPrice, setNewRoomPrice] = useState(0)
	const handleRoomPrice = (event) => {
		setNewRoomPrice(parseInt(event.target.value))
	}

	const [newRoomOffer, setNewRoomOffer] = useState('false')
	const handleRadioOffer = (event) => {
		setNewRoomOffer(event.target.value)
	}

	const [newRoomDiscount, setNewRoomDiscount] = useState(0)
	const handleRadioDiscount = (event) => {
		setNewRoomDiscount(parseInt(event.target.value))
	}

	const [newRoomAmenities, setNewRoomAmenities] = useState([])
	const handleNewRoomAmenities = (event) => {
		switch (event.target.value) {
			case 'basic':
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Cozy bed area' },
					{ name: 'Free Wifi', description: 'Complimentary Wi-Fi' },
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
				])
				break
			case 'midrange':
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
			amenities: newRoomAmenities,
			price: newRoomPrice,
			offer_price: newRoomOffer,
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

	const cols = [
		{
			property: 'id',
			label: 'Room Info',
			display: ({ id, room_photo, room_number }) => (
				<>
					<NavLink
						style={{ textDecoration: 'none' }}
						to={`/rooms/${id}`}
					>
						<span
							onClick={() => {
								dispatch(fetchOneRoom(id))
							}}
						>
							<RoomPhoto src={room_photo} />
							<TextFormatter small='small_room_number'>
								Nº. {room_number}
							</TextFormatter>
							<TextFormatter small='small'>#{id}</TextFormatter>
						</span>
					</NavLink>
				</>
			),
		},
		{
			property: 'room_type',
			label: 'Room Type',
			display: ({ room_type }) => (
				<>
					<TextFormatter small='bold'>{room_type}</TextFormatter>
				</>
			),
		},
		{
			property: 'amenities',
			label: 'Amenities',
			display: ({ amenities, room_type }) =>
				amenities.map((e, i) => (
					<AmenitiesTag type={room_type} key={i}>
						{e.name}
					</AmenitiesTag>
				)),
		},
		{
			property: 'price',
			label: 'Price',
			display: ({ price, offer_price }) => (
				<>
					<TextFormatter
						offer={offer_price ? 'true' : 'false'}
						small='price'
					>
						${price}
					</TextFormatter>
					<span>/night</span>
				</>
			),
		},
		{
			property: 'offer_price',
			label: 'Offer Price',
			display: ({ offer_price, price, discount }) => (
				<>
					<TextFormatter small='price'>
						{offer_price
							? applyDiscount(price, discount)
							: 'There is NO discount to be applied to the current price.'}
					</TextFormatter>
					<span>{offer_price && '/night'}</span>
				</>
			),
		},
		{
			property: 'status',
			label: 'Status',
			display: ({ status }) => <Status status={status}>{status}</Status>,
		},
		{
			label: 'More',
			display: ({ id }) => {
				return (
					<>
						<BsThreeDotsVertical
							onClick={() => {
								handleModalMore(id)
							}}
							style={{ fontSize: '30px', cursor: 'pointer' }}
						/>
					</>
				)
			},
		},
	]

	const [filter, setFilter] = useState({
		property: 'all',
		value: 'All Rooms',
	})
	const manageFilterTab = (param) => {
		switch (param) {
			case 'available':
				setFilter({
					property: 'status',
					value: 'Available',
				})
				break
			case 'booked':
				setFilter({
					property: 'status',
					value: 'Booked',
				})
				break
			case 'all':
				setFilter({
					property: 'all',
					value: 'All Rooms',
				})
				break
			default:
				break
		}
	}

	const sortedResult = [...displayData]
	const [sortRooms, setSortRooms] = useState([])
	const handleSelectedFilter = (event) => {
		switch (event.target.value) {
			case 'pricedown':
				setSortRooms(sortedResult.sort((a, b) => b.price - a.price))
				break
			case 'priceup':
				setSortRooms(sortedResult.sort((a, b) => a.price - b.price))
				break
			default:
				break
		}
	}

	const handleToggleModalNewRoom = () => {
		if (!toggleModalNewRoom) {
			setToggleModalNewRoom(true)
		} else {
			setToggleModalNewRoom(false)
		}
	}

	const handleDelete = () => {
		dispatch(deleteRoom(currentId))
		setToggleModal(false)
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<MoreOptionsModal open={toggleModal}>
					<OptionsButton
						onClick={() => {
							handleDelete()
						}}
					>
						DELETE
					</OptionsButton>
					<CloseCTA onClick={handleModalMore}>
						<AiOutlineCloseCircle />
					</CloseCTA>
				</MoreOptionsModal>
				<CreateRoomModalOverlay open={toggleModalNewRoom} />
				<CreateRoomModal
					open={toggleModalNewRoom}
					toggle={state.position}
				>
					<TitleText newroom='title'>Create New Room</TitleText>
					<ModalInnerInfo>
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
								There are a total of 9 floors in the building,
								with each floor consisting of 10 rooms. To
								maintain a consistent numbering system, the
								first room on each floor is designated as room
								101, while the last room is numbered as room
								110. This numbering scheme is applied uniformly
								across all floors.
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
							<ADDCTA onClick={quickAddDescription}>FILL</ADDCTA>
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
										newRoomOffer === 'true' ? false : true
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
										newRoomOffer === 'false' ? '0.4' : '1',
								}}
							>
								<CreateRoomInputLable as='legend' htmlFor='5'>
									Discount ammount:
								</CreateRoomInputLable>
								<CreateRoomInputLable radio='radio' htmlFor='5'>
									5%
								</CreateRoomInputLable>
								<CreateRoomInput
									disabled={
										newRoomOffer === 'true' ? false : true
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
										newRoomOffer === 'true' ? false : true
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
										newRoomOffer === 'true' ? false : true
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
										newRoomOffer === 'true' ? false : true
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
								type='name'
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
								<option value='premium'>Premium Package</option>
								<option value='full'>Full Package</option>
								<option value='midrange'>
									Midrange Package
								</option>
								<option value='basic'>Basic Package</option>
							</RoomTypeSelector>
						</ModalInnerRightInfo>
						<SaveCTA onClick={handleCreateOneRoom}>
							Create Room
						</SaveCTA>
						<CloseCTA onClick={handleToggleModalNewRoom}>
							<AiOutlineCloseCircle />
						</CloseCTA>
					</ModalInnerInfo>
				</CreateRoomModal>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<button
								onClick={() => {
									manageFilterTab('all')
								}}
								style={{
									borderBottom:
										filter.value === 'All Rooms' &&
										'3px solid #135846',
									color:
										filter.value === 'All Rooms' &&
										'#135846',
								}}
							>
								All Rooms
							</button>
							<button
								onClick={() => {
									manageFilterTab('available')
								}}
								style={{
									borderBottom:
										filter.value === 'Available' &&
										'3px solid #135846',
									color:
										filter.value === 'Available' &&
										'#135846',
								}}
							>
								Available
							</button>
							<button
								onClick={() => {
									manageFilterTab('booked')
								}}
								style={{
									borderBottom:
										filter.value === 'Booked' &&
										'3px solid #135846',
									color:
										filter.value === 'Booked' && '#135846',
								}}
							>
								Booked
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<AddRoomCTA onClick={handleToggleModalNewRoom}>
							+ Add Room{' '}
						</AddRoomCTA>
						<FilterSelector
							name='priceSelector'
							id='priceSelector'
							onChange={handleSelectedFilter}
							defaultValue='byprice'
						>
							<option value='byprice' disabled hidden>
								By price
							</option>
							<option value='pricedown'>Down</option>
							<option value='priceup'>Up</option>
						</FilterSelector>
					</TableSearchAndFilterContainer>
				</TopTableContainer>
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
					<Table
						cols={cols}
						datas={sortRooms.length !== 0 ? sortRooms : displayData}
						whoAmI={whoAmI}
						filter={filter}
					/>
				)}
			</MainContainer>
		</>
	)
}

export default Rooms

const SpinnerContainer = styled.div`
	position: absolute;
	left: 60%;
	top: 50%;
	transform: translate(-50%, -50%);
`

const MoreOptionsModal = styled.span`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: 90%;
	transform: translate(-50%, -50%);
	width: 150px;
	min-height: 200px;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	padding: 35px 20px 20px 20px;
	display: ${(props) => (props.open ? 'block' : 'none')};
	box-shadow: 0px 4px 30px #0000004e;
`

const SpecialRequest = styled.button`
	cursor: ${(props) =>
		props.selectionable === 'true' ? 'pointer' : 'not-allowed'};
	font: 400 16px Poppins;
	width: 160px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) => (props.specialrequest >= 1 ? '#799283' : '#212121')};
	background-color: ${(props) =>
		props.specialrequest >= 1 ? '#fff' : '#EEF9F2'};
	border: ${(props) => props.specialrequest >= 1 && '1px solid #799283'};
`

const OptionsButton = styled(SpecialRequest)`
	font: 400 16px Poppins;
	width: 110px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: #e23428;
	background-color: #ffedec;
	transition: 0.3s all;
	&:hover {
		color: #ffedec;
		background-color: #e23428;
	}
`

const CreateRoomModalOverlay = styled.div`
	z-index: 99;
	position: absolute;
	min-width: 100%;
	min-height: 100% !important;
	background-color: transparent;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const CreateRoomModal = styled.div`
	z-index: 100;
	position: absolute;
	top: 60%;
	left: ${(props) => (props.toggle === 'close' ? '50%' : '59.9%')};
	transform: translate(-50%, -50%);
	width: 70%;
	height: 630px;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
	box-shadow: 0px 4px 30px #0000009d;
`
const ModalInnerInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: start;
	width: 100%;
	height: 100%;
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

const CreateRoomInputLable = styled.label`
	display: ${(props) => (props.radio === 'radio' ? 'inline' : 'block')};
	text-align: left;
	font: normal normal 500 17px Poppins;
	color: #135846;
	padding: 15px 0 10px 0;
`

const CreateRoomInput = styled.input`
	${(props) => {
		switch (props.radio) {
			case 'radio':
				return css`
					margin: 0 25px 0 5px;
				`
			default:
				return css`
					height: 47px;
					width: 400px;
					background-color: #fff;
					border: 2px solid #ebf1ef;
					border-radius: 8px;
					padding-left: 15px;
					font: 500 16px Poppins;
					color: #135846;
				`
		}
	}}
`

const Info = styled.p`
	width: 400px;
	color: #ff8000ba;
	font: 200 11px Poppins;
	text-align: justify;
`

const CreateRoomTextArea = styled.textarea`
	height: 141px;
	width: 400px;
	resize: none;
	background-color: #fff;
	border: 2px solid #ebf1ef;
	border-radius: 8px;
	padding-left: 15px;
	font: 500 16px Poppins;
	color: #135846;
`

const RoomTypeSelector = styled.select`
	height: 47px;
	width: 400px;
	border: 1px solid #135846;
	font: 500 16px Poppins;
	color: #135846;
	border: 2px solid #ebf1ef;
	border-radius: 8px;
	background-color: #fff;
	cursor: pointer;
	outline: none;
	padding-left: 15px;
	option {
		font: 500 16px Poppins;
		color: #135846;
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
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const ADDCTA = styled.button`
	position: absolute;
	left: 35%;
	top: 55%;
	border: none;
	width: 100px;
	border-radius: 2px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const CloseCTA = styled.button`
	position: absolute;
	right: 13px;
	top: 13px;
	font-size: 25px;
	border: none;
	background-color: transparent;
	&:hover {
		color: red;
	}
`

const AddRoomCTA = styled.button`
	font: 500 16px Poppins;
	width: 464px;
	height: 50px;
	border: 1px solid #135846;
	color: #135846;
	border: 2px solid #135846;
	border-radius: 12px;
	margin-right: 20px;
	cursor: pointer;
	outline: none;
	padding: 0 15px 0 15px;
	background-color: #eef9f2;
	&:hover {
		background-color: #135846;
		color: #fff;
		border: 2px solid #799283;
	}
`

const MainContainer = styled.main`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const TopTableContainer = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 100%;
	max-height: 730px;
`

const TableTabsContainer = styled.div`
	vertical-align: top;
	display: inline-block;
	width: 49%;
	min-height: 50px;
	margin-right: 10px;
`
const TableSearchAndFilterContainer = styled.div`
	text-align: right;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 49%;
	min-height: 50px;
`

const Tabs = styled.div`
	border-bottom: 1px solid #d4d4d4;
	width: 100%;
	height: 50px;
	button {
		font: 500 16px Poppins;
		background-color: transparent;
		color: #6e6e6e;
		display: inline-block;
		padding: 0 30px 24px 30px;
		border-radius: 0 0 3px 3px;
		border: 0;
		border-bottom: 3px solid transparent;
		cursor: pointer;
		&:hover {
			border-bottom: 3px solid #135846;
			color: #135846;
		}
	}
`

const FilterSelector = styled.select`
	width: 164px;
	height: 50px;
	border: 1px solid #135846;
	font: 500 16px Poppins;
	color: #135846;
	border: 2px solid #135846;
	border-radius: 12px;
	margin-right: 20px;
	background-color: #fff;
	cursor: pointer;
	outline: none;
	padding-left: 15px;
	option {
		font: 500 16px Poppins;
		color: #135846;
	}
`

const TextFormatter = styled.span`
	display: ${(props) => (props.small === 'price' ? 'inline' : 'block')};
	text-align: left;
	color: ${(props) =>
		props.small === 'small'
			? '#799283'
			: props.offer === 'true'
			? '#3939393a'
			: '#393939'};
	font: ${(props) =>
		props.small === 'small' ? '400 13px Poppins' : '500 19px Poppins'};
	text-align: center;
`

const TitleText = styled.h1`
	border-bottom: 1px dotted #1358463d;
	color: ${(props) => (props.newroom === 'title' ? '#135846' : '#393939')};
	font: ${(props) =>
		props.newroom === 'title' ? '600 25px Poppins' : '500 25px Poppins'};
	text-align: center;
	padding: 5px;
`

const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: ${(props) =>
		props.status === 'Available'
			? '#5AD07A'
			: props.status === 'Booked'
			? '#E23428'
			: '#FFEDEC'};
	&:hover {
	}
`

const AmenitiesTag = styled.button`
	font: 400 12px Poppins;
	padding: 8px;
	border: none;
	border-radius: 6px;
	color: ${(props) => (props.type === 'Suite' ? '#7801ff' : '#135846')};
	background-color: ${(props) =>
		props.type === 'Suite' ? '#7801ff16' : '#eef9f2'};
	margin: 3px;
	svg {
		font-size: 20px;
		display: block;
		margin: 0 auto;
	}
`

const RoomPhoto = styled.img`
	width: 220px;
	height: 127px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
	object-fit: cover;
`
