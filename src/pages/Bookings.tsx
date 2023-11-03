import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch, BiUnderline } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsTelephone } from 'react-icons/bs'
import {
	fetchBookingState,
	initialBookings,
	deleteBookingStatus,
} from '../features/bookings/bookingSlice'
import { NavLink } from 'react-router-dom'
import {
	deleteBooking,
	fetchInitialBookings,
	fetchOneBooking,
} from '../features/bookings/bookingThunks'
import { supertoggleContext } from '../context/ToggleContext'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IBooking } from '../features/interfaces/interfaces'
import { FaJediOrder } from 'react-icons/fa'

const Bookings: React.FC = () => {
	const dispatch = useAppDispatch()
	const initialBookingData = useAppSelector(initialBookings)
	const initialBookingState = useAppSelector(fetchBookingState)
	const deleteBookingCurrentStatus = useAppSelector(deleteBookingStatus)
	const { state } = useContext(supertoggleContext)!
	const [spinner, setSpinner] = useState<boolean>(true)
	const [deleteSpinner, setDeleteSpinner] = useState<boolean>(false)
	const [displayData, setDisplayData] = useState<IBooking[]>([])
	const [toggleMoreOptions, setToggleMoreOptions] = useState<any>(false)
	const [currentId, setCurrentId] = useState<string>('')
	const [toggleModal, setToggleModal] = useState<boolean>(false)
	const [guestSpecialRequest, setGuestSpecialRequest] = useState<string>('')

	useEffect(() => {
		dispatch(fetchInitialBookings())
	}, [dispatch])

	useEffect(() => {
		if (initialBookingState === 'pending') {
			setSpinner(true)
		} else if (initialBookingState === 'fulfilled') {
			setSpinner(false)
			setDisplayData(initialBookingData)
		}
		if (deleteBookingCurrentStatus === 'pending') {
			setDeleteSpinner(true)
		} else {
			setDeleteSpinner(false)
		}
	}, [initialBookingData, initialBookingState, deleteBookingCurrentStatus])

	const handleMoreOptions = (id: string) => {
		setToggleMoreOptions((prevToggleMoreOptions: any) => ({
			...prevToggleMoreOptions,
			[id]: !prevToggleMoreOptions[id],
		}))
		setCurrentId(id)
	}

	const handleDelete = (id: string) => {
		dispatch(deleteBooking(currentId))
		handleMoreOptions(id)
	}

	const handleSpecialRequestModal = (msg: string) => {
		if (!toggleModal) {
			setToggleModal(true)
			setGuestSpecialRequest(msg)
		} else {
			setToggleModal(false)
			setGuestSpecialRequest('')
		}
	}

	const whoAmI = {
		name: 'bookings',
		redirect: true,
	}

	interface IGuestDetails {
		_id: string
		guest: string
		phone_number: string
	}

	interface IOrderDate {
		order_date: string
	}
	interface ICheckInDate {
		check_in: string
	}
	interface ICheckOutDate {
		check_out: string
	}

	interface ISpecialRequest {
		_id: string
		special_request: string
	}

	interface IStatus {
		_id: string
		status: string
	}

	interface IMore {
		_id: string
	}

	const cols = [
		{
			property: 'guest',
			label: 'Guest Details',
			display: ({ guest, phone_number, _id }: IGuestDetails) => (
				<>
					<NavLink
						style={{ textDecoration: 'none' }}
						to={`/bookings/${_id}`}
					>
						<span
							onClick={() => {
								dispatch(fetchOneBooking(_id))
							}}
						>
							{/* <CustomerPhoto
								src={`https://robohash.org/${guest}.png?set=any`}
							/> */}
							<TextFormatter name='name'>{guest}</TextFormatter>
							<TextFormatter small='small'>
								<BsTelephone /> {phone_number}
							</TextFormatter>
							<TextFormatter small='small'>
								<br />
								id#: {_id}
							</TextFormatter>
						</span>
					</NavLink>
				</>
			),
		},
		{
			property: 'order_date',
			label: 'Order Date',
			display: ({ order_date }: IOrderDate) => (
				<Dates types='orderDate'>
					{order_date.replace(/:\d{2} GMT\+0000 \(GMT\)/, '')}
				</Dates>
			),
		},
		{
			property: 'check_in',
			label: 'Check In',
			display: ({ check_in }: ICheckInDate) => (
				<Dates types='checkIn'>
					{check_in.replace(
						/\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,
						''
					)}
				</Dates>
			),
		},
		{
			property: 'check_out',
			label: 'Check Out',
			display: ({ check_out }: ICheckOutDate) => (
				<Dates types='checkOut'>
					{check_out.replace(
						/\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,
						''
					)}
				</Dates>
			),
		},
		{
			property: 'special_request',
			label: 'Special Request',
			display: ({ special_request, _id }: ISpecialRequest) =>
				special_request.length !== 0 ? (
					<SpecialRequest
						selectionable='true'
						specialrequest={special_request.length}
						onClick={() => {
							handleSpecialRequestModal(special_request)
						}}
					>
						View Notes
					</SpecialRequest>
				) : (
					<SpecialRequest
						selectionable='false'
						specialrequest={special_request.length}
					>
						View Notes
					</SpecialRequest>
				),
		},
		{
			property: 'room_type',
			label: 'Room Type',
			display: ({ room_type }: any) => (
				<TextFormatter name='room'>{room_type}</TextFormatter>
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
								button_type='delete'
								onClick={() => {
									handleDelete(_id)
								}}
							>
								DELETE
							</OptionsButton>
							{/* <NavLink to={`/rooms/edit-room/${id}`}> */}
							<OptionsButton button_type='edit'>
								EDIT
							</OptionsButton>
							{/* </NavLink> */}
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
		value: 'All Bookings',
	})
	const manageFilterTab = (param: string) => {
		switch (param) {
			case 'checkin':
				setFilter({
					property: 'status',
					value: 'CheckIn',
				})
				break
			case 'checkout':
				setFilter({
					property: 'status',
					value: 'CheckOut',
				})
				break
			case 'inprogress':
				setFilter({
					property: 'status',
					value: 'In Progress',
				})
				break
			case 'all':
				setFilter({
					property: 'all',
					value: 'All Bookings',
				})
				break
			default:
				break
		}
	}

	const filterBookingsByName = (result: string) => {
		if (!result) {
			setDisplayData(initialBookingData)
		} else {
			const filteredBookings = initialBookingData.filter((booking) =>
				booking.guest.toLowerCase().includes(result.toLowerCase())
			)
			setDisplayData(filteredBookings)
		}
	}

	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const result = event.target.value
		filterBookingsByName(result)
	}

	const msg: string = ''

	return (
		<>
			<EditUserModalOverlay
				onClick={() => {
					handleSpecialRequestModal(msg)
				}}
				open={toggleModal}
			/>
			<EditUserModal
				onClick={() => {
					handleSpecialRequestModal(msg)
				}}
				open={toggleModal}
			>
				<TextFormatter>{guestSpecialRequest}</TextFormatter>
			</EditUserModal>
			<MainContainer toggle={state.position}>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<TabButton
								fil={filter.value}
								onClick={() => {
									manageFilterTab('all')
								}}
							>
								All Bookings
							</TabButton>
							<TabButton
								fil={filter.value}
								onClick={() => {
									manageFilterTab('checkin')
								}}
							>
								Check In
							</TabButton>
							<TabButton
								fil={filter.value}
								onClick={() => {
									manageFilterTab('checkout')
								}}
							>
								Check Out
							</TabButton>
							<TabButton
								fil={filter.value}
								onClick={() => {
									manageFilterTab('inprogress')
								}}
							>
								In Progress
							</TabButton>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<InputSearch onChange={handleSearchInputChange} />
						<Icons search='search'>
							<BiSearch />
						</Icons>
						<FilterSelector name='bookingFilter' id='bookingFilter'>
							<option value='volvo'>Guest</option>
							<option value='volvo'>Order Date</option>
							<option value='volvo'>Check In</option>
							<option value='volvo'>Check Out</option>
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

export default Bookings

interface MaincontainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MaincontainerProps>`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

interface EditUserModalOverlayProps {
	readonly open: boolean
}

const EditUserModalOverlay = styled.div<EditUserModalOverlayProps>`
	z-index: 99;
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.434);
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

interface EditUserModalProps {
	readonly open: boolean
}

const EditUserModal = styled.div<EditUserModalProps>`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -30%);
	width: fit-content;
	min-height: fit-content;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	padding: 30px 20px 30px 20px;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

interface MoreOptionsProps {
	readonly open: string
}

const MoreOptions = styled.span<MoreOptionsProps>`
	position: relative;
	z-index: 100;
	width: 100%;
	padding: 10px;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

interface SpecialRequestProps {
	readonly selectionable: string
	readonly specialrequest: number
}

const SpecialRequest = styled.button<SpecialRequestProps>`
	cursor: ${(props) =>
		props.selectionable === 'true' ? 'pointer' : 'not-allowed'};
	font: 500 16px Poppins;
	width: 130px;
	height: 48px;
	border: none;
	border-radius: 8px;
	transition: 0.3s all;
	color: ${(props) =>
		props.specialrequest >= 1
			? `${color.softer_strongPurple}`
			: `${color.softer_normalGrey}`};
	background-color: ${(props) =>
		props.specialrequest >= 1
			? `${color.softerPLus_ligthPurple}`
			: `${color.softer_ligthGrey}`};
	border: none;
	&:hover {
		scale: ${(props) => props.specialrequest >= 1 && '1.06'};
		color: ${(props) => props.specialrequest >= 1 && 'white'};
		background-color: ${(props) =>
			props.specialrequest >= 1 && `${color.softer_strongPurple}`};
	}
`

interface OptionsButtonProps {
	readonly button_type: string
}

const OptionsButton = styled.button<OptionsButtonProps>`
	display: block;
	cursor: pointer;
	font: 400 16px Poppins;
	width: 100px;
	height: 38px;
	border: none;
	border-radius: 8px;
	margin: ${(props) =>
		props.button_type === 'edit' ? '10px auto 0 auto' : 'auto'};
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

const TopTableContainer = styled.div`
	min-width: 100%;
	max-height: 50px;
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
	display: inline-block;
	width: 49%;
	min-height: 50px;
`

const Tabs = styled.div`
	border-bottom: 1px solid #d4d4d4;
	width: 100%;
	height: 50px;
`

interface TabButtonProps {
	readonly fil: string
}

const TabButton = styled.button<TabButtonProps>`
	font: 500 16px Poppins;
	background-color: transparent;
	color: #6e6e6e;
	display: inline-block;
	padding: 0 30px 24px 30px;
	border-radius: 0 0 3px 3px;
	transition: 0.3s all;
	border: none;
	cursor: pointer;
	&:nth-child(1) {
		border-bottom: ${(props) =>
			props.fil === 'All Bookings' &&
			`3px solid ${color.softer_strongPurple}`};
		color: ${(props) =>
			props.fil === 'All Bookings' && `${color.softer_strongPurple}`};
	}
	&:nth-child(2) {
		border-bottom: ${(props) =>
			props.fil === 'CheckIn' &&
			`3px solid ${color.softer_strongPurple}`};
		color: ${(props) =>
			props.fil === 'CheckIn' && `${color.softer_strongPurple}`};
	}
	&:nth-child(3) {
		border-bottom: ${(props) =>
			props.fil === 'CheckOut' &&
			`3px solid ${color.softer_strongPurple}`};
		color: ${(props) =>
			props.fil === 'CheckOut' && `${color.softer_strongPurple}`};
	}
	&:nth-child(4) {
		border-bottom: ${(props) =>
			props.fil === 'In Progress' &&
			`3px solid ${color.softer_strongPurple}`};
		color: ${(props) =>
			props.fil === 'In Progress' && `${color.softer_strongPurple}`};
	}

	&:hover {
		border-bottom: 3px solid ${color.strongPurple};
		color: ${color.strongPurple};
	}
`

const InputSearch = styled.input`
	position: absolute;
	left: 90px;
	background-color: #fff;
	font: 500 16px Poppins;
	color: ${color.strongPurple};
	padding: 10px 10px 10px 50px;
	width: 351px;
	height: 50px;
	border: none;
	border-radius: 12px;
	outline: none;
	&:focus {
		outline: 2px solid ${color.softer_ligthPurple};
	}
	&:hover {
		outline: 2px solid ${color.softer_normalPurple};
	}
`

interface IconsProps {
	readonly search: string
}

const Icons = styled.div<IconsProps>`
	font-size: 30px;
	cursor: pointer;
	color: ${(props) => (props.search === 'search' ? '#6E6E6E' : 'red')};
	position: ${(props) => props.search === 'search' && 'absolute'};
	top: 12px;
	left: 105px;
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
interface TextFormatterProps {
	readonly small?: string
	readonly name?: string
}

const TextFormatter = styled.span<TextFormatterProps>`
	display: block;
	/* text-align: ${(props) => (props.name === 'room' ? 'center' : 'left')}; */
	text-align: center;
	color: ${(props) =>
		props.small === 'small'
			? `${color.softer_normalGrey}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 18px Poppins'};
`

interface StatusProps {
	readonly status: string
}

const Status = styled.button<StatusProps>`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: white;
	background-color: ${(props) =>
		props.status === 'CheckIn'
			? `${color.normalPurple}`
			: props.status === 'CheckOut'
			? `${color.normalPinkie}`
			: props.status === 'In Progress' && `${color.normalOrange}`};
	&:hover {
	}
`

interface DatesProps {
	readonly types: string
}

const Dates = styled.button<DatesProps>`
	font: 600 16px Poppins;
	width: 150px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: white;
	padding: 0 5px 0 5px;
	background-color: ${(props) =>
		props.types === 'orderDate'
			? `${color.softer_strongGrey}`
			: props.types === 'checkIn'
			? `${color.softer_strongPurple}`
			: `${color.normalPinkie}`};
	&:hover {
	}
`

const CustomerPhoto = styled.img`
	float: left;
	margin: 18px 10px 18px 18px;
	height: 40px;
	width: 40px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
`
