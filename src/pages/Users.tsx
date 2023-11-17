import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from '../components/Table'
import { BiSearch } from 'react-icons/bi'
import { supertoggleContext } from '../context/ToggleContext'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {
	fetchUserState,
	initialUsers,
	resetState,
	deleteUserStatus,
} from '../features/users/userSlice'
import {
	deleteUser,
	fetchInitialUsers,
	fetchOneUser,
} from '../features/users/userThunks'
import { NavLink } from 'react-router-dom'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IUser } from '../features/interfaces/interfaces'
import { IsAny } from '@reduxjs/toolkit/dist/tsHelpers'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()
	const initialUserData = useAppSelector(initialUsers)

	const initialUserState = useAppSelector(fetchUserState)
	const deleteUserCurentStatus = useAppSelector(deleteUserStatus)
	const { state } = useContext(supertoggleContext)!
	const [displayData, setDisplayData] = useState<IUser[]>([])
	const [toggleMoreOptions, setToggleMoreOptions] = useState<any>(false)
	const [currentId, setCurrentId] = useState<string>('')
	const [spinner, setSpinner] = useState<boolean>(true)
	const [deleteSpinner, setDeleteSpinner] = useState<boolean>(false)

	useEffect(() => {
		dispatch(fetchInitialUsers())
	}, [dispatch])

	useEffect(() => {
		if (initialUserState === 'pending') {
			setSpinner(true)
		} else if (initialUserState === 'fulfilled') {
			setSpinner(false)
			setDisplayData(initialUserData)
		}
		if (deleteUserCurentStatus === 'pending') {
			setDeleteSpinner(true)
		} else {
			setDeleteSpinner(false)
		}
	}, [initialUserData, initialUserState, deleteUserCurentStatus])

	const handleMoreOptions = (id: string) => {
		setToggleMoreOptions((prevToggleMoreOptions: any) => ({
			...prevToggleMoreOptions,
			[id]: !prevToggleMoreOptions[id],
		}))
		setCurrentId(id)
	}

	const handleDelete = (id: string) => {
		dispatch(deleteUser(currentId))
		handleMoreOptions(id)
	}

	const whoAmI = {
		name: 'users',
		redirect: false,
	}

	interface IPhoto {
		photo: string
	}

	interface IName {
		full_name: string
	}

	interface IInfo {
		email: string
		_id: string
		phone_number: string
	}

	interface IStartDate {
		start_date: string
	}

	interface IPosition {
		description: string
	}

	interface IStatus {
		status: string
	}

	interface IMore {
		_id: string
	}

	const cols = [
		{
			property: 'photo',
			label: 'Photo',
			display: ({ photo }: IPhoto) => (
				<>
					<CustomerPhoto src={photo} />
				</>
			),
		},
		{
			property: 'full_name',
			label: 'Name',
			display: ({ full_name }: IName) => (
				<>
					<TextFormatter types='name'>{full_name}</TextFormatter>
				</>
			),
		},
		{
			property: 'email',
			label: 'Info',
			display: ({ email, _id, phone_number }: IInfo) => (
				<>
					<TextFormatter types='small'>{email}</TextFormatter>
					<TextFormatter types='small'>{phone_number}</TextFormatter>
					<TextFormatter types='small'>#{_id}</TextFormatter>
				</>
			),
		},
		{
			property: 'start_date',
			label: 'Start-Date',
			display: ({ start_date }: IStartDate) => (
				<>
					<TextFormatter types='normal'>
						{start_date.replace(
							/\d{2}:\d{2}:\d{2} GMT\+0000 \(GMT\)/,
							''
						)}
					</TextFormatter>
				</>
			),
		},
		{
			property: 'description',
			label: 'Position',
			display: ({ description }: IPosition) => (
				<>
					<TextFormatter types='normal'>{description}</TextFormatter>
				</>
			),
		},
		{
			property: 'status',
			label: 'Status',
			display: ({ status }: IStatus) => (
				<>
					<Status status={status}>
						{status === 'active' ? 'Active' : 'Inactive'}
					</Status>
				</>
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
								to={`/users/edit-employee/${_id}`}
							>
								<OptionsButton
									onClick={() => {
										dispatch(fetchOneUser(_id))
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
		value: 'All Employees',
	})
	const manageFilterTab = (param: string) => {
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

	const filterUsersByName = (result: string) => {
		let filteredUsers

		if (!result) {
			filteredUsers = initialUserData
		} else {
			filteredUsers = initialUserData.filter((user) =>
				user.full_name?.toLowerCase().includes(result.toLowerCase())
			)
		}

		setDisplayData(filteredUsers)
	}

	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
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
										filter.value === 'All Employees'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'All Employees'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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
										filter.value === 'active'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'active'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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
										filter.value === 'inactive'
											? `3px solid ${color.softer_strongPurple}`
											: `3px solid transparent`,
									color:
										filter.value === 'inactive'
											? `${color.softer_strongPurple}`
											: `${color.normalGrey}`,
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

interface MainContainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MainContainerProps>`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

interface OptionsButtonProps {
	readonly button_type?: string
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

interface IIcons {
	readonly search: string
}

const Icons = styled.div<IIcons>`
	font-size: 30px;
	cursor: pointer;
	color: #6e6e6e;
	position: ${(props) => props.search === 'search' && 'absolute'};
	top: 12px;
	left: 105px;
`

interface ITextFormatter {
	readonly types: string
}

const TextFormatter = styled.span<ITextFormatter>`
	display: block;
	text-align: center;
	color: ${(props) =>
		props.types === 'small'
			? `${color.softer_strongGrey}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.types === 'small' ? '300 13px Poppins' : '500 16px Poppins'};
	margin: 10px 0 0 0;
`

interface IStatus {
	readonly status: string
}

const Status = styled.button<IStatus>`
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
