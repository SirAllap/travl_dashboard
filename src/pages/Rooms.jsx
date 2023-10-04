import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { initialRooms } from '../features/rooms/roomSlice'
import { supertoggleContext } from '../context/supertoggleContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { fetchInitialRooms } from '../features/rooms/roomThunks'
import { Triangle } from 'react-loader-spinner'

const Rooms = (props) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchInitialRooms())
	}, [dispatch])
	const { state } = useContext(supertoggleContext)
	const initialRoomData = useSelector(initialRooms)
	const sortedResult = [...initialRoomData]
	const [toggleModal, setToggleModal] = useState(false)
	const whoAmI = {
		name: 'rooms',
		redirect: true,
	}
	const cols = [
		{
			property: 'id',
			label: 'Room Info',
			display: ({ id, room_photo }) => (
				<>
					<RoomPhoto src={room_photo} />
					<TextFormatter small='small'>#{id}</TextFormatter>
				</>
			),
		},
		{
			property: 'room_type',
			label: 'Room',
			display: ({ room_type }) => (
				<>
					<TextFormatter small='bold'>{room_type}</TextFormatter>
				</>
			),
		},
		{
			property: 'amenities',
			label: 'Amenities',
			display: ({ amenities }) =>
				amenities.map((e, i) => (
					<AmenitiesTag key={i}>{e.name}</AmenitiesTag>
				)),
		},
		{
			property: 'price',
			label: 'Price',
			display: ({ price }) => (
				<>
					<TextFormatter small='price'>${price}</TextFormatter>
					<span>/night</span>
				</>
			),
		},
		{
			property: 'offer_price',
			label: 'Offer Price',
			display: ({ offer_price }) => (
				<>
					<TextFormatter small='offer'>
						{offer_price
							? 'There is a discount available to apply to the existing price.'
							: 'There is NO discount to be applied to the current price.'}
					</TextFormatter>
				</>
			),
		},

		{
			property: 'status',
			label: 'Status',
			display: ({ status }) => <Status status={status}>{status}</Status>,
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

	const handleToggleModal = () => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
	}

	const [spinner, setSpinner] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setSpinner(false)
		}, 500)
	}, [])

	return (
		<>
			<MainContainer toggle={state.position}>
				<EditUserModalOverlay open={toggleModal} />
				<EditUserModal open={toggleModal}>
					<TitleText>Create Room:</TitleText>
					<EditUserInputLable type='name'>Name</EditUserInputLable>
					<Input type='name' placeholder='name' />
					<EditUserInputLable type='email'>Email</EditUserInputLable>

					<Input type='email' placeholder='email' />

					<InputFile type='file' alt='a photo of the user profile' />
					<SaveCTA
						onClick={() => {
							console.log('I will create the new room')
						}}
					>
						Save
					</SaveCTA>
					<CloseCTA onClick={handleToggleModal}>
						<AiOutlineCloseCircle />
					</CloseCTA>
				</EditUserModal>
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
						<AddRoomCTA onClick={handleToggleModal}>
							+ Add Room{' '}
						</AddRoomCTA>
						<FilterSelector
							name='bookingFilter'
							id='bookingFilter'
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
						datas={
							sortRooms.length !== 0 ? sortRooms : initialRoomData
						}
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

const EditUserModalOverlay = styled.div`
	z-index: 99;
	position: absolute;
	min-width: 100%;
	min-height: 100% !important;
	background-color: rgba(0, 0, 0, 0.434);
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const EditUserModal = styled.div`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: ${(props) => (props.toggle === 'close' ? '50%' : '59.9%')};
	transform: translate(-50%, -50%);
	width: 70%;
	min-height: 60%;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const EditUserInputLable = styled.label`
	position: absolute;
	left: 3%;
	margin-right: -50%;
	top: ${(props) => (props.type === 'email' ? '30%' : '10%')};
	transform: translate(-50%, -50%);
	font: normal normal 500 17px Poppins;
	display: block;
	color: #135846;
	margin-left: 40px;
`
const InputFile = styled.input`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	top: 80%;
	transform: translate(-50%, -50%);
	max-width: 54.4%;
	color: #135846;
	transition: 0.3s;
	color: #444;
	background: #fff;
	&::file-selector-button {
		font: normal normal 500 14px Poppins;
		border: none;
		background: #135846;
		padding: 10px 20px;
		border-radius: 8px;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}
	&::file-selector-button:hover {
		background: #ebf1ef;
		color: #135846;
	}
`
const Input = styled(InputFile)`
	top: ${(props) => (props.type === 'email' ? '35%' : '15%')};
	height: 47px;
	width: 350px;
	max-width: 90%;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	padding: 20px;
	margin-top: 16px;
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
	color: ${(props) => (props.small === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 19px Poppins'};
	text-align: center;
	padding: ${(props) => props.small === 'offer' && '20px'};
`

const TitleText = styled.h1`
	color: #393939;
	font: 500 25px Poppins;
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
	padding: 10px;
	border: none;
	border-radius: 6px;
	color: #135846;
	background-color: #eef9f2;
	margin: 5px;
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
