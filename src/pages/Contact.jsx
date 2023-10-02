import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'
import client_review from '../data/client_review.json'
import { supertoggleContext } from '../context/supertoggleContext'

const Contact = (props) => {
	const { toggle } = useContext(supertoggleContext)
	const whoAmI = {
		name: 'contact',
		redirect: false,
	}
	const cols = [
		{
			property: 'id',
			label: 'Date',
			display: ({ date, dateTime, id }) => (
				<>
					<TextFormatter name='name'>{date}</TextFormatter>
					<TextFormatter small='small'>{dateTime}</TextFormatter>
					<TextFormatter small='small'>#{id}</TextFormatter>
				</>
			),
		},
		{
			property: 'full_name',
			label: 'Customer',
		},
		{
			property: 'subject_of_review',
			label: 'Subject',
		},
		{
			property: 'review_body',
			label: 'Comment',
		},
		{
			property: 'isArchived',
			label: 'Archive',
			display: ({ isArchived }) => (
				<>
					<Status status={isArchived}>Archived</Status>
				</>
			),
		},
	]

	const [filter, setFilter] = useState('')
	const manageFilterTab = (param) => {
		switch (param) {
			case 'nonarchived':
				setFilter({
					property: 'isArchived',
					value: 'false',
				})
				break
			case 'archived':
				setFilter({
					property: 'isArchived',
					value: 'true',
				})
				break
			case 'all':
				setFilter({
					property: 'all',
				})
				break
			default:
				break
		}
	}
	return (
		<>
			<MainContainer toggle={toggle}>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<button
								onClick={() => {
									manageFilterTab('all')
								}}
							>
								All Contact
							</button>
							<button
								onClick={() => {
									manageFilterTab('archived')
								}}
							>
								Archived
							</button>
							<button
								onClick={() => {
									manageFilterTab('nonarchived')
								}}
							>
								Non Archived
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<InputSearch />
						<Icons search='search'>
							<BiSearch />
						</Icons>
					</TableSearchAndFilterContainer>
				</TopTableContainer>
				<Table
					cols={cols}
					datas={client_review}
					whoAmI={whoAmI}
					filter={filter}
				/>
			</MainContainer>
		</>
	)
}

export default Contact

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

const TextFormatter = styled.span`
	display: block;
	text-align: center;
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
	color: ${(props) => (props.status === 'true' ? '#E23428' : '#5AD07A')};
`
