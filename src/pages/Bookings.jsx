import React from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'

const MainContainer = styled.main`
	text-align: center;
	min-height: 100%;
	min-width: 1474px;
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
	min-height: 40px;
	p {
		font: 500 16px Poppins;
		color: #6e6e6e;
		display: inline-block;
		padding: 0 30px 15px 30px;
		border-bottom: 3px solid transparent;
		&:hover {
			border-bottom: 3px solid green;
			color: #135846;
		}
	}
`

const InputSearch = styled.input`
	position: absolute;
	bottom: 3px;
	left: 90px;
	background-color: #fff;
	font: 500 16px Poppins;
	color: #135846;
	padding: 10px 10px 10px 50px;
	width: 351px;
	height: 57px;
	border: none;
	border-radius: 12px;
	outline: none;
	&:focus {
		outline: 2px solid green;
	}
`

const Icons = styled.div`
	font-size: 30px;
	cursor: pointer;
	color: ${(props) => (props.search === 'search' ? '#6E6E6E' : 'red')};
	position: ${(props) => props.search === 'search' && 'absolute'};
	top: 8px;
	left: 105px;
`

const FilterSelector = styled.select`
	width: 134px;
	height: 49px;
	border: 1px solid green;
	font: 500 16px Poppins;
	color: #135846;
	border: 1px solid #135846;
	border-radius: 12px;
	margin-right: 20px;
	margin-bottom: 5px;
	cursor: pointer;
	outline: none;
	padding-left: 15px;
	option {
		font: 500 16px Poppins;
		color: #135846;
	}
`

const Bookings = (props) => {
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<p>All Bookings</p>
							<p>Check In</p>
							<p>Check Out</p>
							<p>In Progress</p>
							<p>Empty</p>
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
				{/* <Table /> */}
			</MainContainer>
		</>
	)
}

export default Bookings
