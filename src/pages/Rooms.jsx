import React from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import rooms from '../data/rooms.json'
import { BiSearch } from 'react-icons/bi'

const Rooms = (props) => {
	const whoAmI = {
		name: 'rooms',
		redirect: true,
	}
	const cols = [
		{
			property: 'id',
			label: 'Room Name',
			display: ({ id, room_photo }) => (
				<>
					<RoomPhoto src={room_photo} />
					<TextFormatter small='small'>#{id}</TextFormatter>
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
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<p>All Bookings</p>
							<p>Check In</p>
							<p>Check Out</p>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<InputSearch />
						<Icons search='search'>
							<BiSearch />
						</Icons>
						<FilterSelector name='bookingFilter' id='bookingFilter'>
							<option value='volvo'>State</option>
							<option value='volvo'>By Price Down</option>
							<option value='volvo'>By Price Up</option>
						</FilterSelector>
					</TableSearchAndFilterContainer>
				</TopTableContainer>
				<Table cols={cols} datas={rooms} whoAmI={whoAmI} />
			</MainContainer>
		</>
	)
}

export default Rooms

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
	max-height: 730px;
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
	p {
		font: 500 16px Poppins;
		color: #6e6e6e;
		display: inline-block;
		margin: 0 50px 0 50px;
		padding: 0 30px 24px 30px;
		border-radius: 0 0 3px 3px;
		border-bottom: 3px solid transparent;
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
	display: ${(props) => (props.small === 'price' ? 'inline' : 'block')};
	text-align: left;
	color: ${(props) => (props.small === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 19px Poppins'};
	text-align: center;
	padding: ${(props) => props.small === 'offer' && '20px'};
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
