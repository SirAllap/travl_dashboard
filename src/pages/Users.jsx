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
import { Triangle } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'

const Users = (props) => {
	const dispatch = useDispatch()
	const initialUserData = useSelector(initialUsers)
	const initialUsersPlusLatestUsers = useSelector(initialUsersPlusNewUsers)
	const initialUserState = useSelector(fetchUserState)
	const deleteUserCurentStatus = useSelector(deleteUserStatus)
	const { state } = useContext(supertoggleContext)
	const [displayData, setDisplayData] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
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

	const handleModalMore = (id) => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
		setCurrentId(id)
	}

	const handleDelete = () => {
		dispatch(deleteUser(currentId))
		setToggleModal(false)
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
			display: ({ full_name, employee_id, phone_number }) => (
				<>
					<TextFormatter name='name'>{full_name}</TextFormatter>
					<TextFormatter small='small'>{phone_number}</TextFormatter>
					<TextFormatter small='small'>#{employee_id}</TextFormatter>
				</>
			),
		},
		{
			property: 'email',
			label: 'Email',
			display: ({ email }) => (
				<>
					<TextFormatter small='small'>{email}</TextFormatter>
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
			label: 'Archive',
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
								handleModalMore(employee_id)
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
										filter.value === 'All Employees' &&
										'3px solid #135846',
									color:
										filter.value === 'All Employees' &&
										'#135846',
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
										'3px solid #135846',
									color:
										filter.value === 'active' && '#135846',
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
										'3px solid #135846',
									color:
										filter.value === 'inactive' &&
										'#135846',
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
						spinner={deleteSpinner}
					/>
				)}
			</MainContainer>
		</>
	)
}

export default Users

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
	width: 251px;
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
	color: ${(props) => (props.status === 'inactive' ? '#E23428' : '#5AD07A')};
	background-color: transparent;
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
	border: 1px solid #135846;
	color: #135846ab;
	border: 2px solid #1358465c;
	border-radius: 12px;
	margin-right: 20px;
	cursor: pointer;
	outline: none;
	padding: 0 15px 0 15px;
	background-color: #eef9f296;
	transition: 0.3s all;
	&:hover {
		background-color: #13584663;
		color: #ffffffc4;
		border: 2px solid #79928381;
	}
`
