import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'
import { supertoggleContext } from '../context/supertoggleContext'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	fetchUserState,
	initialUsers,
	initialUsersPlusNewUsers,
	resetState,
	deleteUserStatus,
} from '../features/users/userSlice'
import { deleteUser, fetchInitialUsers } from '../features/users/userThunks'
import { NavLink } from 'react-router-dom'
import * as color from '../components/Variables'

const Users = (props) => {
	const dispatch = useDispatch()
	const initialUserData = useSelector(initialUsers)
	const initialUsersPlusLatestUsers = useSelector(initialUsersPlusNewUsers)
	const initialUserState = useSelector(fetchUserState)
	const deleteUserCurentStatus = useSelector(deleteUserStatus)
	const { state } = useContext(supertoggleContext)
	const [displayData, setDisplayData] = useState([])
	const [toggleMoreOptions, setToggleMoreOptions] = useState(false)
	const [currentId, setCurrentId] = useState('')
	const [spinner, setSpinner] = useState(true)
	const [deleteSpinner, setDeleteSpinner] = useState(false)

	useEffect(() => {
		dispatch(fetchInitialUsers())
	}, [dispatch])

	useEffect(() => {
		if (initialUserState === 'pending') {
			setSpinner(true)
		} else if (initialUserState === 'fulfilled') {
			setSpinner(false)
			if (initialUsersPlusLatestUsers.length !== 0) {
				setDisplayData(initialUsersPlusLatestUsers)
			} else {
				setDisplayData(initialUserData)
			}
		}
		if (deleteUserCurentStatus === 'pending') {
			setDeleteSpinner(true)
		} else {
			setDeleteSpinner(false)
		}
	}, [
		initialUserData,
		initialUserState,
		initialUsersPlusLatestUsers,
		deleteUserCurentStatus,
	])

	const handleMoreOptions = (id) => {
		setToggleMoreOptions((prevToggleMoreOptions) => ({
			...prevToggleMoreOptions,
			[id]: !prevToggleMoreOptions[id],
		}))
		setCurrentId(id)
	}

	const handleDelete = (id) => {
		dispatch(deleteUser(currentId))
		handleMoreOptions(id)
	}

	const whoAmI = {
		name: 'users',
		redirect: false,
	}
	const cols = [
		{
			property: 'photo',
			label: 'Photo',
			display: ({ photo }) => (
				<>
					<CustomerPhoto src={photo} />
				</>
			),
		},
		{
			property: 'full_name',
			label: 'Name',
			display: ({ full_name }) => (
				<>
					<TextFormatter name='name'>{full_name}</TextFormatter>
				</>
			),
		},
		{
			property: 'email',
			label: 'Info',
			display: ({ email, employee_id, phone_number }) => (
				<>
					<TextFormatter small='small'>{email}</TextFormatter>
					<TextFormatter small='small'>{phone_number}</TextFormatter>
					<TextFormatter small='small'>#{employee_id}</TextFormatter>
				</>
			),
		},
		{
			property: 'start_date',
			label: 'Start-Date',
		},
		{
			property: 'description',
			label: 'Position',
		},
		{
			property: 'status',
			label: 'Status',
			display: ({ status }) => (
				<>
					<Status status={status}>
						{status === 'active' ? 'Active' : 'Inactive'}
					</Status>
				</>
			),
		},
		{
			label: 'More',
			display: ({ employee_id }) => {
				return (
					<>
						<BsThreeDotsVertical
							onClick={() => {
								handleMoreOptions(employee_id)
							}}
							style={{
								fontSize: '30px',
								cursor: 'pointer',
								display: toggleMoreOptions[employee_id]
									? 'none'
									: 'inline-block',
							}}
						/>
						<MoreOptions open={toggleMoreOptions[employee_id]}>
							<OptionsButton
								onClick={() => {
									handleDelete(employee_id)
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
									handleMoreOptions(employee_id)
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
		value: 'All Employees',
	})
	const manageFilterTab = (param) => {
		switch (param) {
			case 'active':
				setFilter({
					property: 'status',
					value: 'active',
				})
				break
			case 'inactive':
				setFilter({
					property: 'status',
					value: 'inactive',
				})
				break
			case 'all':
				setFilter({
					property: 'all',
					value: 'All Employees',
				})
				break
			default:
				break
		}
	}

	const filterUsersByName = (result) => {
		let filteredUsers

		if (!result) {
			filteredUsers =
				initialUsersPlusLatestUsers.length !== 0
					? initialUsersPlusLatestUsers
					: initialUserData
		} else {
			filteredUsers =
				initialUsersPlusLatestUsers.length !== 0
					? initialUsersPlusLatestUsers.filter((user) =>
							user.full_name
								?.toLowerCase()
								.includes(result.toLowerCase())
					  )
					: initialUserData.filter((user) =>
							user.full_name
								?.toLowerCase()
								.includes(result.toLowerCase())
					  )
		}

		setDisplayData(filteredUsers)
	}

	const handleSearchInputChange = (event) => {
		const result = event.target.value
		filterUsersByName(result)
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
										filter.value === 'All Employees' &&
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'All Employees' &&
										`${color.softer_strongPurple}`,
								}}
							>
								All Employees
							</button>
							<button
								onClick={() => {
									manageFilterTab('active')
								}}
								style={{
									borderBottom:
										filter.value === 'active' &&
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'active' &&
										`${color.softer_strongPurple}`,
								}}
							>
								Active
							</button>
							<button
								onClick={() => {
									manageFilterTab('inactive')
								}}
								style={{
									borderBottom:
										filter.value === 'inactive' &&
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'inactive' &&
										`${color.softer_strongPurple}`,
								}}
							>
								Inactive
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer>
						<InputSearch onChange={handleSearchInputChange} />
						<Icons search='search'>
							<BiSearch />
						</Icons>
						<NavLink to={'/users/create-employee'}>
							<AddRoomCTA
								onClick={() => {
									dispatch(resetState())
								}}
							>
								+ Add Employee{' '}
							</AddRoomCTA>
						</NavLink>
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

export default Users

const MainContainer = styled.main`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const OptionsButton = styled.button`
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

const MoreOptions = styled.span`
	position: relative;
	z-index: 100;
	width: 100%;
	padding: 10px;
	display: ${(props) => (props.open ? 'block' : 'none')};
`

const CloseCTA = styled.button`
	position: absolute;
	right: 13px;
	top: 13px;
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
			border-bottom: 3px solid ${color.strongPurple};
			color: ${color.strongPurple};
		}
	}
`

const InputSearch = styled.input`
	position: absolute;
	left: 90px;
	background-color: #fff;
	font: 500 16px Poppins;
	color: ${color.strongPurple};
	padding: 10px 10px 10px 50px;
	width: 251px;
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

const Icons = styled.div`
	font-size: 30px;
	cursor: pointer;
	color: #6e6e6e;
	position: ${(props) => props.search === 'search' && 'absolute'};
	top: 12px;
	left: 105px;
`

const TextFormatter = styled.span`
	display: block;
	text-align: center;
	color: ${(props) =>
		props.small === 'small'
			? `${color.softer_strongGrey}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 16px Poppins'};
`

const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: white;
	background-color: ${(props) =>
		props.status === 'inactive'
			? `${color.normalPinkie}`
			: `${color.normalPurple}`};
`

const CustomerPhoto = styled.img`
	margin: 18px 10px 18px 18px;
	height: 100px;
	width: 100px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
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
