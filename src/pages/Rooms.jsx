import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchRoomState,
	initialRooms,
	initialRoomsPlusNewRooms,
	resetState,
	deleteRoomStatus,
} from '../features/rooms/roomSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { supertoggleContext } from '../context/supertoggleContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	deleteRoom,
	fetchInitialRooms,
	fetchOneRoom,
} from '../features/rooms/roomThunks'
import { NavLink } from 'react-router-dom'
import * as color from '../components/Variables'

const Rooms = (props) => {
	const dispatch = useDispatch()
	const initialRoomsPlusLatestRooms = useSelector(initialRoomsPlusNewRooms)
	const initialRoomData = useSelector(initialRooms)
	const initialRoomState = useSelector(fetchRoomState)
	const deleteRoomCurrentStatus = useSelector(deleteRoomStatus)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(true)
	const [deleteSpinner, setDeleteSpinner] = useState(false)
	const [displayData, setDisplayData] = useState([])
	const [toggleMoreOptions, setToggleMoreOptions] = useState(false)
	const [currentId, setCurrentId] = useState('')

	useEffect(() => {
		dispatch(fetchInitialRooms())
	}, [dispatch])

	useEffect(() => {
		if (initialRoomState === 'pending') {
			setSpinner(true)
		} else if (initialRoomState === 'fulfilled') {
			setSpinner(false)
			if (initialRoomsPlusLatestRooms.length !== 0) {
				setDisplayData(initialRoomsPlusLatestRooms)
			} else {
				setDisplayData(initialRoomData)
			}
		}
		if (deleteRoomCurrentStatus === 'pending') {
			setDeleteSpinner(true)
		} else {
			setDeleteSpinner(false)
		}
	}, [
		initialRoomData,
		initialRoomState,
		initialRoomsPlusLatestRooms,
		deleteRoomCurrentStatus,
	])

	const handleMoreOptions = (id) => {
		setToggleMoreOptions((prevToggleMoreOptions) => ({
			...prevToggleMoreOptions,
			[id]: !prevToggleMoreOptions[id],
		}))
		setCurrentId(id)
	}

	const handleDelete = (id) => {
		dispatch(deleteRoom(currentId))
		handleMoreOptions(id)
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
					<span
						style={{
							font: '300 14px Poppins',
							color: offer_price && `${color.normalPinkie}`,
							textDecoration: offer_price && 'line-through',
						}}
					>
						/night
					</span>
				</>
			),
		},
		{
			property: 'offer_price',
			label: 'Offer Price',
			display: ({ offer_price, price, discount }) => (
				<>
					<TextFormatter
						small='offer_price'
						style={{
							font: offer_price && '600 23px Poppins',
							color: offer_price && `${color.normalPurple}`,
						}}
					>
						{offer_price
							? applyDiscount(price, discount)
							: 'There is NO discount to be applied to the current price.'}
					</TextFormatter>
					<span
						style={{
							font: '600 15px Poppins',
							color: offer_price && `${color.normalPurple}`,
						}}
					>
						{offer_price && '/night'}
					</span>
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
								handleMoreOptions(id)
							}}
							style={{
								fontSize: '30px',
								cursor: 'pointer',
								display: toggleMoreOptions[id]
									? 'none'
									: 'inline-block',
							}}
						/>
						<MoreOptions open={toggleMoreOptions[id]}>
							<OptionsButton
								onClick={() => {
									handleDelete(id)
								}}
							>
								DELETE
							</OptionsButton>
							<NavLink
								style={{ textDecoration: 'none' }}
								to={`/rooms/edit-room/${id}`}
							>
								<OptionsButton
									onClick={() => {
										dispatch(fetchOneRoom(id))
										dispatch(resetState())
									}}
									button_type='edit'
								>
									EDIT
								</OptionsButton>
							</NavLink>
							<CloseCTA
								onClick={() => {
									handleMoreOptions(id)
								}}
							>
								<AiOutlineCloseCircle />
							</CloseCTA>
						</MoreOptions>
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

	return (
		<>
			<MainContainer toggle={state.position}>
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'All Rooms' &&
										`${color.softer_strongPurple}`,
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'Available' &&
										`${color.softer_strongPurple}`,
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'Booked' &&
										`${color.softer_strongPurple}`,
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
								Filter by price >
							</option>
							<option value='pricedown'>Down</option>
							<option value='priceup'>Up</option>
						</FilterSelector>
					</TableSearchAndFilterContainer>
				</TopTableContainer>
				<Table
					cols={cols}
					datas={sortRooms.length !== 0 ? sortRooms : displayData}
					whoAmI={whoAmI}
					filter={filter}
					spinner={deleteSpinner}
					loadingSpinner={spinner}
				/>
			</MainContainer>
		</>
	)
}

export default Rooms

const MoreOptions = styled.span`
	position: relative;
	z-index: 100;
	width: 100%;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	padding: 35px 20px 20px 20px;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

const OptionsButton = styled.button`
	display: block;
	cursor: pointer;
	font: 400 16px Poppins;
	width: 110px;
	height: 48px;
	border: none;
	border-radius: 8px;
	margin: 0 auto;
	margin-top: ${(props) => props.button_type === 'edit' && '10px'};
	color: ${(props) =>
		props.button_type === 'edit'
			? `${color.softer_strongPurple}`
			: `${color.normalPinkie}`};
	background-color: ${(props) =>
		props.button_type === 'edit'
			? `${color.softerPLus_ligthPurple}`
			: `${color.softer_ligthPinkie}`};
	transition: 0.3s all;
	&:hover {
		color: ${(props) => (props.button_type === 'edit' ? 'white' : 'white')};
		background-color: ${(props) =>
			props.button_type === 'edit'
				? `${color.softer_strongPurple}`
				: `${color.normalPinkie}`};
	}
`

const CloseCTA = styled.button`
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: 0px;
	font-size: 25px;
	border: none;
	background-color: transparent;
	transition: 0.3s all;
	&:hover {
		color: ${color.normalPinkie};
	}
`

const AddRoomCTA = styled.button`
	font: 500 16px Poppins;
	width: 364px;
	height: 50px;
	border: none;
	color: ${color.normalPinkie};
	background-color: ${color.softer_ligthPinkie};
	border-radius: 12px;
	margin-right: 20px;
	cursor: pointer;
	outline: none;
	padding: 0 15px 0 15px;
	transition: 0.3s all;
	&:hover {
		color: white;
		background-color: ${color.softer_normalPinkie};
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
		transition: 0.3s all;
		cursor: pointer;
		&:hover {
			border-bottom: 3px solid ${color.strongPurple};
			color: ${color.strongPurple};
		}
	}
`

const FilterSelector = styled.select`
	-webkit-appearance: none;
	width: 175px;
	height: 50px;
	border: 1px solid #135846;
	font: 500 16px Poppins;

	color: ${color.strongPurple};
	border: none;
	border-radius: 12px;
	margin-right: 20px;
	background-color: ${color.softer_ligthPurple};
	cursor: pointer;
	outline: none;
	padding-left: 25px;
`

const TextFormatter = styled.span`
	display: ${(props) =>
		props.small === 'price'
			? 'inline'
			: props.small === 'offer_price'
			? 'inline'
			: 'block'};
	color: ${(props) =>
		props.small === 'small'
			? `${color.softer_normalGrey}`
			: props.offer === 'true'
			? `${color.normalPinkie}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.small === 'small' ? '400 13px Poppins' : '500 19px Poppins'};
	text-align: center;
	text-decoration: ${(props) => props.offer === 'true' && 'line-through'};
`

export const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: ${(props) =>
		props.status === 'Available'
			? `${color.softer_strongPurple}`
			: props.status === 'Booked'
			? `${color.normalPinkie}`
			: '#FFEDEC'};
	transition: 0.3s all;
	&:hover {
		scale: 1.05;
	}
`

const AmenitiesTag = styled.button`
	font: 500 12.5px Poppins;
	padding: 8px;
	border: none;
	border-radius: 6px;
	color: ${(props) =>
		props.type === 'Suite'
			? `${color.normalOrange}`
			: props.type === 'Double Superior'
			? `${color.softer_strongPurple}`
			: `${color.normalGrey}`};
	background-color: ${(props) =>
		props.type === 'Suite'
			? `${color.softer_ligthOrange}`
			: props.type === 'Double Superior'
			? `${color.softer_ligthPurple}`
			: `${color.softer_ligthGrey}`};
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
