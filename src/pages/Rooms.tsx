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
import { supertoggleContext } from '../context/ToggleContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	deleteRoom,
	fetchInitialRooms,
	fetchOneRoom,
} from '../features/rooms/roomThunks'
import { NavLink } from 'react-router-dom'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IRoom } from '../features/interfaces/interfaces'

const Rooms: React.FC = () => {
	const dispatch = useAppDispatch()
	const initialRoomsPlusLatestRooms = useAppSelector(initialRoomsPlusNewRooms)
	const initialRoomData = useAppSelector(initialRooms)
	const initialRoomState = useAppSelector(fetchRoomState)
	const deleteRoomCurrentStatus = useAppSelector(deleteRoomStatus)
	const { state } = useContext(supertoggleContext)!
	const [spinner, setSpinner] = useState<boolean>(true)
	const [deleteSpinner, setDeleteSpinner] = useState<boolean>(false)
	const [displayData, setDisplayData] = useState<IRoom[]>([])
	const [toggleMoreOptions, setToggleMoreOptions] = useState<any>(false)
	const [currentId, setCurrentId] = useState<string>('')

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

	const handleMoreOptions = (id: string) => {
		setToggleMoreOptions((prevToggleMoreOptions: any) => ({
			...prevToggleMoreOptions,
			[id]: !prevToggleMoreOptions[id],
		}))
		setCurrentId(id)
	}

	const handleDelete = (id: string) => {
		dispatch(deleteRoom(currentId))
		handleMoreOptions(id)
	}

	const whoAmI = {
		name: 'rooms',
		redirect: true,
	}

	const applyDiscount = (currentPrice: number, discount: number) => {
		const result = currentPrice - currentPrice * (discount / 100)
		return `$${result}`
	}

	interface IRoomInfo {
		_id: string
		room_photo: string
		room_number: number
	}

	interface IRoomType {
		room_type: string
	}

	interface IAmenities {
		amenities: [{ name: string; description: string }]
		room_type: string
	}

	interface IPrice {
		price: number
		offer_price: number
	}

	interface IOfferPrice {
		offer_price: number
		discount: number
		price: number
	}

	interface IStatus {
		status: string
	}

	interface IMore {
		_id: string
	}

	const cols = [
		{
			property: 'id',
			label: 'Room Info',
			display: ({ _id, room_photo, room_number }: IRoomInfo) => (
				<>
					<NavLink
						style={{ textDecoration: 'none' }}
						to={`/rooms/${_id}`}
					>
						<span
							onClick={() => {
								dispatch(fetchOneRoom(_id))
							}}
						>
							<RoomPhoto src={room_photo} />
							<TextFormatter small='small_room_number'>
								Nº. {room_number}
							</TextFormatter>
							<TextFormatter small='small'>
								id#: {_id}
							</TextFormatter>
						</span>
					</NavLink>
				</>
			),
		},
		{
			property: 'room_type',
			label: 'Room Type',
			display: ({ room_type }: IRoomType) => (
				<>
					<TextFormatter small='bold'>{room_type}</TextFormatter>
				</>
			),
		},
		{
			property: 'amenities',
			label: 'Amenities',
			display: ({ amenities, room_type }: IAmenities) =>
				amenities.map((amenitie, index: number) => (
					<AmenitiesTag types={amenities.length} key={index}>
						{amenitie.name}
					</AmenitiesTag>
				)),
		},
		{
			property: 'price',
			label: 'Price',
			display: ({ price, offer_price }: IPrice) => (
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
							color: offer_price
								? `${color.normalPinkie}`
								: `${color.strongGrey}`,
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
			display: ({ offer_price, price, discount }: IOfferPrice) => (
				<>
					<TextFormatter
						small='offer_price'
						style={{
							font: offer_price
								? '600 23px Poppins'
								: '400 18px Poppins',
							color: offer_price
								? `${color.normalPurple}`
								: `${color.strongGrey}`,
						}}
					>
						{offer_price
							? applyDiscount(price, discount)
							: 'There is NO discount to be applied to the current price.'}
					</TextFormatter>
					<span
						style={{
							font: '600 15px Poppins',
							color: offer_price
								? `${color.normalPurple}`
								: `${color.strongGrey}`,
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
			display: ({ status }: IStatus) => (
				<Status status={status}>{status}</Status>
			),
		},
		{
			label: 'More',
			display: ({ _id }: IMore) => {
				return (
					<>
						<BsThreeDotsVertical
							onClick={() => {
								handleMoreOptions(_id)
							}}
							style={{
								fontSize: '30px',
								cursor: 'pointer',
								display: toggleMoreOptions[_id]
									? 'none'
									: 'inline-block',
							}}
						/>
						<MoreOptions open={toggleMoreOptions[_id]}>
							<OptionsButton
								onClick={() => {
									handleDelete(_id)
								}}
							>
								DELETE
							</OptionsButton>
							<NavLink
								style={{ textDecoration: 'none' }}
								to={`/rooms/edit-room/${_id}`}
							>
								<OptionsButton
									onClick={() => {
										dispatch(fetchOneRoom(_id))
										dispatch(resetState())
									}}
									button_type='edit'
								>
									EDIT
								</OptionsButton>
							</NavLink>
							<CloseCTA
								onClick={() => {
									handleMoreOptions(_id)
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
	const manageFilterTab = (param: string) => {
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
	const handleSelectedFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		switch (event.target.value) {
			case 'pricedown':
				const sortPriceDown = sortedResult.sort(
					(a, b) => b.price - a.price
				)
				setDisplayData(sortPriceDown)
				break
			case 'priceup':
				const sortPriceUp = sortedResult.sort(
					(a, b) => a.price - b.price
				)
				setDisplayData(sortPriceUp)
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
										filter.value === 'All Rooms'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'All Rooms'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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
										filter.value === 'Available'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'Available'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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
										filter.value === 'Booked'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'Booked'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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
							<option value='byprice' disabled>
								Filter by price
							</option>
							<option value='pricedown'>Down</option>
							<option value='priceup'>Up</option>
						</FilterSelector>
					</TableSearchAndFilterContainer>
				</TopTableContainer>
				<Table
					cols={cols}
					datas={displayData}
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

interface IMoreOptions {
	readonly open: string
}

const MoreOptions = styled.span<IMoreOptions>`
	position: relative;
	z-index: 100;
	width: 100%;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	padding: 35px 20px 20px 20px;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

interface IOptionsButton {
	readonly button_type?: string
}

const OptionsButton = styled.button<IOptionsButton>`
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

interface IMainContainer {
	readonly toggle: string
}

const MainContainer = styled.main<IMainContainer>`
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
	appearance: none;
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

interface ITextFormatter {
	readonly small: string
	readonly offer?: string
}

const TextFormatter = styled.span<ITextFormatter>`
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

interface IStatus {
	readonly status: string
}

export const Status = styled.button<IStatus>`
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

interface IAmenitiesTag {
	readonly types: number
}

const AmenitiesTag = styled.button<IAmenitiesTag>`
	font: 500 12.5px Poppins;
	padding: 8px;
	border: none;
	border-radius: 6px;
	color: ${(props) =>
		props.types === 10
			? `${color.normalOrange}`
			: props.types === 9
			? `${color.softer_strongPurple}`
			: `${color.normalGrey}`};
	background-color: ${(props) =>
		props.types === 10
			? `${color.softer_ligthOrange}`
			: props.types === 9
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
