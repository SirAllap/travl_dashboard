import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchBookingState,
	initialBookings,
} from '../features/bookings/bookingSlice'
import { NavLink } from 'react-router-dom'
import {
	deleteBooking,
	fetchInitialBookings,
	fetchOneBooking,
} from '../features/bookings/bookingThunks'
import { supertoggleContext } from '../context/supertoggleContext'
import { Triangle } from 'react-loader-spinner'

const Bookings = () => {
	const dispatch = useDispatch()
	const initialBookingData = useSelector(initialBookings)
	const initialBookingState = useSelector(fetchBookingState)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(true)
	const [displayData, setDisplayData] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
	const [currentId, setCurrentId] = useState('')

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
	}, [initialBookingData, initialBookingState])

	const handleModalMore = (id) => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
		setCurrentId(id)
	}

	const handleDelete = () => {
		dispatch(deleteBooking(currentId))
		setToggleModal(false)
	}

	const whoAmI = {
		name: 'bookings',
		redirect: true,
	}

	const cols = [
		{
			property: 'guest',
			label: 'Guest Details',
			display: ({ guest, phone_number, id }) => (
				<>
					<NavLink
						style={{ textDecoration: 'none' }}
						to={`/bookings/${id}`}
					>
						<span
							onClick={() => {
								dispatch(fetchOneBooking(id))
							}}
						>
							<CustomerPhoto
								src={`https://robohash.org/${guest}.png?set=any`}
							/>
							<TextFormatter name='name'>{guest}</TextFormatter>
							<TextFormatter small='small'>
								{phone_number}
							</TextFormatter>
							<TextFormatter small='small'>#{id}</TextFormatter>
						</span>
					</NavLink>
				</>
			),
		},
		{
			property: 'order_date',
			label: 'Order Date',
		},
		{
			property: 'check_in',
			label: 'Check In',
		},
		{
			property: 'check_out',
			label: 'Check Out',
		},
		{
			property: 'special_request',
			label: 'Special Request',
			display: ({ special_request, id }) =>
				special_request.length !== 0 ? (
					<NavLink
						onClick={() => {
							dispatch(fetchOneBooking(id))
						}}
						style={{ textDecoration: 'none' }}
						to={`/bookings/${id}`}
					>
						<SpecialRequest
							selectionable='true'
							specialrequest={special_request.length}
						>
							View Notes
						</SpecialRequest>
					</NavLink>
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
		value: 'All Bookings',
	})
	const manageFilterTab = (param) => {
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

	const filterBookingsByName = (result) => {
		if (!result) {
			setDisplayData(initialBookingData)
		} else {
			const filteredBookings = initialBookingData.filter((booking) =>
				booking.guest.toLowerCase().includes(result.toLowerCase())
			)
			setDisplayData(filteredBookings)
		}
	}

	const handleSearchInputChange = (event) => {
		const result = event.target.value
		filterBookingsByName(result)
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
										filter.value === 'All Bookings' &&
										'3px solid #135846',
									color:
										filter.value === 'All Bookings' &&
										'#135846',
								}}
							>
								All Bookings
							</button>
							<button
								onClick={() => {
									manageFilterTab('checkin')
								}}
								style={{
									borderBottom:
										filter.value === 'CheckIn' &&
										'3px solid #135846',
									color:
										filter.value === 'CheckIn' && '#135846',
								}}
							>
								Check In
							</button>
							<button
								onClick={() => {
									manageFilterTab('checkout')
								}}
								style={{
									borderBottom:
										filter.value === 'CheckOut' &&
										'3px solid #135846',
									color:
										filter.value === 'CheckOut' &&
										'#135846',
								}}
							>
								Check Out
							</button>
							<button
								onClick={() => {
									manageFilterTab('inprogress')
								}}
								style={{
									borderBottom:
										filter.value === 'In Progress' &&
										'3px solid #135846',
									color:
										filter.value === 'In Progress' &&
										'#135846',
								}}
							>
								In Progress
							</button>
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
						datas={displayData}
						whoAmI={whoAmI}
						filter={filter}
					/>
				)}
			</MainContainer>
		</>
	)
}

export default Bookings

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

const CloseCTA = styled.button`
	position: absolute;
	right: 5px;
	top: 5px;
	font-size: 25px;
	border: none;
	background-color: transparent;
	&:hover {
		color: red;
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
			border-bottom: 3px solid green;
			color: #135846;
		}
	}
`
const InputSearch = styled.input`
	position: absolute;
	left: 90px;
	background-color: #fff;
	font: 500 16px Poppins;
	color: #135846;
	padding: 10px 10px 10px 50px;
	width: 351px;
	height: 50px;
	border: none;
	border-radius: 12px;
	outline: none;
	&:focus {
		outline: 2px solid #135846;
	}
	&:hover {
		outline: 2px solid #799283;
	}
`

const Icons = styled.div`
	font-size: 30px;
	cursor: pointer;
	color: ${(props) => (props.search === 'search' ? '#6E6E6E' : 'red')};
	position: ${(props) => props.search === 'search' && 'absolute'};
	top: 12px;
	left: 105px;
`

const FilterSelector = styled.select`
	width: 134px;
	height: 50px;
	border: 1px solid green;
	font: 500 16px Poppins;
	color: #135846;
	border: 2px solid #135846;
	border-radius: 12px;
	margin-right: 20px;
	cursor: pointer;
	outline: none;
	padding-left: 15px;
	option {
		font: 500 16px Poppins;
		color: #135846;
	}
	&:hover {
		border: 2px solid #799283;
	}
`

const TextFormatter = styled.span`
	display: block;
	text-align: left;
	color: ${(props) => (props.small === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 16px Poppins'};
`

const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) =>
		props.status === 'CheckIn'
			? '#5AD07A'
			: props.status === 'CheckOut'
			? '#E23428'
			: props.status === 'In Progress'
			? '#fff'
			: 'transparent'};
	background-color: ${(props) =>
		props.status === 'CheckIn'
			? '#E8FFEE'
			: props.status === 'CheckOut'
			? '#FFEDEC'
			: props.status === 'In Progress'
			? '#FF9C3A'
			: 'transparent'};
	&:hover {
	}
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

const CustomerPhoto = styled.img`
	float: left;
	margin: 18px 10px 18px 18px;
	height: 40px;
	width: 40px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
`
