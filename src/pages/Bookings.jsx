import React from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'
import bookings from '../data/bookings.json'

const Bookings = (props) => {
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
					<CustomerPhoto
						src={`https://robohash.org/${guest}.png?set=any`}
					/>
					<TextFormatter name='name'>{guest}</TextFormatter>
					<TextFormatter small='small'>{phone_number}</TextFormatter>
					<TextFormatter small='small'>#{id}</TextFormatter>
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
			display: ({ special_request }) => (
				<SpecialRequest
					onClick={() => {
						console.log('im herer')
					}}
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
	]
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<button
								onClick={() => {
									console.log('all bookings')
								}}
							>
								All Bookings
							</button>
							<button
								onClick={() => {
									console.log('check in')
								}}
							>
								Check In
							</button>
							<button
								onClick={() => {
									console.log('check out')
								}}
							>
								Check Out
							</button>
							<button
								onClick={() => {
									console.log('in progress')
								}}
							>
								In Progress
							</button>
							<button
								onClick={() => {
									console.log('empty')
								}}
							>
								Empty
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<InputSearch />
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
				<Table cols={cols} datas={bookings} whoAmI={whoAmI} />
			</MainContainer>
		</>
	)
}

export default Bookings
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
	vertical-align: middle;
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
const CustomerPhoto = styled.img`
	float: left;
	margin: 18px 10px 18px 18px;
	height: 40px;
	width: 40px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
`
