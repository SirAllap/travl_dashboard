import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchRoomState,
	initialRooms,
	initialRoomsPlusNewRooms,
	resetState,
} from '../features/rooms/roomSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { supertoggleContext } from '../context/supertoggleContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	deleteRoom,
	fetchInitialRooms,
	fetchOneRoom,
} from '../features/rooms/roomThunks'
import { Triangle } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'

const Rooms = (props) => {
	const dispatch = useDispatch()
	const initialRoomStatePlusNewRooms = useSelector(initialRoomsPlusNewRooms)
	const initialRoomData = useSelector(initialRooms)
	const initialRoomState = useSelector(fetchRoomState)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(true)
	const [displayData, setDisplayData] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
	const [currentId, setCurrentId] = useState('')

	console.log(initialRoomStatePlusNewRooms)
	useEffect(() => {
		dispatch(fetchInitialRooms())
	}, [dispatch])

	useEffect(() => {
		if (initialRoomState === 'pending') {
			setSpinner(true)
		} else if (initialRoomState === 'fulfilled') {
			setSpinner(false)
			if (initialRoomStatePlusNewRooms.length !== 0) {
				setDisplayData(initialRoomStatePlusNewRooms)
			} else {
				setDisplayData(initialRoomData)
			}
		}
	}, [initialRoomData, initialRoomState, initialRoomStatePlusNewRooms])

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
						<NavLink to={'/rooms/create-room'}>
							<AddRoomCTA
								onClick={() => {
									dispatch(resetState())
								}}
							>
								+ Add Room{' '}
							</AddRoomCTA>
						</NavLink>
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
	left: ${(props) => (props.isfor === 'newroom' ? '50%' : '60%')};
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
