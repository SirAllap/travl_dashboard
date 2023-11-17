import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { supertoggleContext } from '../context/ToggleContext'
import { Triangle } from 'react-loader-spinner'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {
	createUserState,
	fetchUserState,
	singleUser,
} from '../features/users/userSlice'
import { createOneUser } from '../features/users/userThunks'
import * as color from '../components/Variables'
import { useAppDispatch } from '../app/hooks'
import { IUser } from '../features/interfaces/interfaces'

const EditUser: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const fetchUserCurrentState = useSelector(fetchUserState)
	const createUserCurrentState = useSelector(createUserState)
	const singleUserSelector = useSelector(singleUser)
	const { state } = useContext(supertoggleContext)!
	const { userId } = useParams()
	const [spinner, setSpinner] = useState(false)
	const [savedLastId, setSavedLastId] = useState<string>('')
	const [toggleModalNewRoom, setToggleModalNewRoom] = useState(false)
	const [currentUser, setCurrentUser] = useState<IUser>()

	useEffect(() => {
		if (createUserCurrentState === 'pending') {
			setSpinner(true)
		} else if (createUserCurrentState === 'fulfilled') {
			setSpinner(false)
			navigate('/rooms')
		}
		if (fetchUserCurrentState === 'pending') {
			setSpinner(true)
		} else if (fetchUserCurrentState === 'fulfilled') {
			setSpinner(false)
			setCurrentUser(singleUserSelector)
		}
	}, [createUserCurrentState, navigate, singleUserSelector])

	const [newUserPosition, setNewUserPosition] = useState<string>('')
	const handleNewUserPosition = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		console.log('here')

		switch (event.target.value) {
			case 'Recepcionist':
				setNewUserPosition('Recepcionist')
				break
			case 'Cleaner':
				setNewUserPosition('Cleaner')
				break
			case 'Sales':
				setNewUserPosition('Sales')
				break
			case 'Director':
				setNewUserPosition('Director')
				break
			default:
				break
		}
	}

	const [newUserName, setNewUserName] = useState<string>('')
	const handleNewUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserName(event.target.value)
	}

	const [newUserPhoneNumber, setNewUserPhoneNumber] = useState<number>(0)
	const handleNewPhoneNumber = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewUserPhoneNumber(parseInt(event.target.value))
	}

	const [newUserStartDate, setNewUserStartDate] = useState<string>('')
	const handleUserStartDate = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewUserStartDate(event.target.value)
	}

	const [newRoomOffer, setNewUserEmail] = useState<string>('')
	const handleNewUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserEmail(event.target.value)
	}

	const handleCreateOneRoom = () => {
		if (currentUser !== undefined) {
			const newUser: IUser = {
				full_name:
					newUserName === '' ? currentUser.full_name : newUserName,
				email: newRoomOffer === '' ? currentUser.email : newRoomOffer,
				photo: currentUser.photo,
				start_date:
					newUserStartDate === ''
						? currentUser.start_date
						: newUserStartDate,
				description:
					newUserPosition === ''
						? currentUser.description
						: newUserPosition,
				phone_number:
					newUserPhoneNumber.toString() === ''
						? currentUser.phone_number
						: newUserPhoneNumber.toString(),
				status: currentUser.status,
			}
			dispatch(createOneUser(newUser))
		}
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<NavLink to={'/users'}>
					<CTA>Back</CTA>
				</NavLink>
				<TitleText newroom='title'>Edit Employee</TitleText>
				<ModalInnerInfo>
					{spinner ? (
						<SpinnerContainer>
							<Triangle
								height='150'
								width='150'
								color={color.softer_strongPurple}
								ariaLabel='triangle-loading'
								visible={spinner}
							/>
						</SpinnerContainer>
					) : (
						<>
							<ModalInnerLeftInfo>
								<CreateRoomInputLable htmlFor='userPosition'>
									Position
								</CreateRoomInputLable>
								<PositionSelector
									name='userPosition'
									id='userPosition'
									onChange={handleNewUserPosition}
									defaultValue={
										currentUser
											? currentUser.description
											: 'userPosition'
									}
								>
									<option value='userPosition' disabled>
										Position:
									</option>
									<option value='Recepcionist'>
										Recepcionist
									</option>
									<option value='Cleaner'>Cleaner</option>
									<option value='Sales'>Sales</option>
									<option value='Director'>Director</option>
								</PositionSelector>

								<CreateRoomInputLable htmlFor='userName'>
									Full Name:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='userName'
									id='userName'
									type='text'
									placeholder='David Pallarés'
									onChange={handleNewUserName}
									defaultValue={
										currentUser !== undefined
											? currentUser.full_name
											: ''
									}
								/>

								<CreateRoomInputLable htmlFor='userPhoneNumber'>
									Phone Number:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='userPhoneNumber'
									id='userPhoneNumber'
									type='number'
									placeholder='e.g: +34 675-953-234'
									onChange={handleNewPhoneNumber}
									defaultValue={
										currentUser !== undefined
											? currentUser.phone_number
											: ''
									}
								/>
							</ModalInnerLeftInfo>

							<ModalInnerRightInfo>
								<CreateRoomInputLable htmlFor='email'>
									Email:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='email'
									id='email'
									type='email'
									placeholder='an-email@empty.com'
									onChange={handleNewUserEmail}
									defaultValue={
										currentUser !== undefined
											? currentUser.email
											: ''
									}
								/>
								<CreateRoomInputLable htmlFor='userStartDate'>
									Start Date:
								</CreateRoomInputLable>
								<CreateRoomInput
									id='userStartDate'
									name='userStartDate'
									type='date'
									onChange={handleUserStartDate}
									defaultValue={
										currentUser !== undefined
											? currentUser.start_date
											: ''
									}
								/>

								<PassCTA>Change password</PassCTA>
							</ModalInnerRightInfo>
						</>
					)}
					<SaveCTA onClick={handleCreateOneRoom}>
						Create Employee
					</SaveCTA>
				</ModalInnerInfo>
			</MainContainer>
		</>
	)
}

export default EditUser

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
`

const CTA = styled.button`
	font: normal normal 600 18px Poppins;
	position: absolute;
	left: 0px;
	top: -40px;
	width: 138px;
	height: 33px;
	color: ${color.normalPinkie};
	background-color: ${color.softer_ligthPinkie};
	border: none;
	border-radius: 4px;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: white;
		background-color: ${color.normalPinkie};
	}
`

const ModalInnerInfo = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: start;
	width: 100%;
	height: 600px;
	background-color: white;
	border-radius: 0px 0px 20px 20px;
`
const ModalInnerLeftInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`
const ModalInnerRightInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`

interface CreateRoomInputLableProps {
	readonly radio?: string
	readonly types?: string
}

const CreateRoomInputLable = styled.label<CreateRoomInputLableProps>`
	display: ${(props) => (props.radio === 'radio' ? 'inline' : 'block')};
	text-align: left;
	font: normal normal 500 17px Poppins;
	color: ${color.strongPurple};
	padding: 15px 0 10px 0;
`

interface CreateRoomInputProps {
	readonly radio?: string
}

const CreateRoomInput = styled.input<CreateRoomInputProps>`
	${(props) => {
		switch (props.radio) {
			case 'radio':
				return css`
					margin: 0 25px 0 5px;
				`
			default:
				return css`
					font: 500 16px Poppins;
					height: 47px;
					width: 400px;
					background-color: #fff;
					border: 2px solid ${color.ligthPurple};
					color: ${color.softer_strongPurple};
					outline: none;
					border-radius: 8px;
					padding-left: 15px;
					&:focus {
						outline: 2px solid ${color.softer_ligthPurple};
					}
				`
		}
	}}
`

const PositionSelector = styled.select`
	height: 47px;
	width: 400px;
	background-color: #fff;
	border: 2px solid ${color.ligthPurple};
	color: ${color.softer_strongPurple};
	outline: none;
	font: 500 16px Poppins;
	border-radius: 8px;
	cursor: pointer;
	padding-left: 15px;
	&:focus {
		outline: 2px solid ${color.softer_ligthPurple};
	}
`
const SaveCTA = styled.button`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 0px;
	width: 90%;
	height: 47px;
	color: ${color.normalPurple};
	background-color: ${color.softer_ligthPurple};
	border: none;
	border-radius: 8px;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: white;
		background-color: ${color.normalPurple};
	}
`

const PassCTA = styled.button`
	width: 75%;
	height: 47px;
	color: ${color.normalPurple};
	background-color: ${color.softer_ligthPurple};
	border: none;
	border-radius: 8px;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: white;
		background-color: ${color.normalPurple};
	}
`

interface MainContainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MainContainerProps>`
	position: relative;
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

interface TitleTextProps {
	readonly newroom?: string
}

const TitleText = styled.h1<TitleTextProps>`
	background-color: #fff;
	border-radius: 20px 20px 0px 0px;
	border-bottom: 1px dashed ${color.ligthPurple};
	color: ${color.strongPurple};
	font: ${(props) =>
		props.newroom === 'title' ? '600 25px Poppins' : '500 25px Poppins'};
	text-align: center;
	padding: 5px;
`
interface InputFileProps {
	readonly propType?: string
}

const InputFile = styled.input<InputFileProps>`
	width: 31%;
	transition: 0.3s;
	color: ${color.normalGrey};
	background: ${color.clearBackground};
	margin-left: 20px;
	&::file-selector-button {
		font: normal normal 500 14px Poppins;
		border: none;
		color: white;
		background-color: ${color.softer_normalPurple};
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: 0.2s ease-in-out;
	}
	&::file-selector-button:hover {
		color: ${color.normalPurple};
		background-color: ${color.ligthPurple};
	}
`
