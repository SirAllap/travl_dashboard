import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { supertoggleContext } from '../context/ToggleContext'
import { Triangle } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserState } from '../features/users/userSlice'
import { createOneUser } from '../features/users/userThunks'
import * as color from '../components/Variables'
import { useAppDispatch } from '../app/hooks'
import { IUser } from '../features/interfaces/interfaces'

const CreateUser: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const createUserCurretState = useSelector(createUserState)
	const { state } = useContext(supertoggleContext)!
	const [spinner, setSpinner] = useState(false)
	const [toggleModalNewRoom, setToggleModalNewRoom] = useState(false)

	useEffect(() => {
		if (createUserCurretState === 'pending') {
			setSpinner(true)
		} else if (createUserCurretState === 'fulfilled') {
			setSpinner(false)
			navigate('/users')
		}
	}, [createUserCurretState, navigate])

	const [newUserPosition, setNewUserPosition] = useState<string>('')
	const handleNewUserPosition = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		switch (event.target.value) {
			case 'recepcionist':
				setNewUserPosition('Recepcionist')
				break
			case 'clean':
				setNewUserPosition('Cleaner')
				break
			case 'sales':
				setNewUserPosition('Sales')
				break
			case 'director':
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

	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const handleNewUserPassword = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value)
	}

	const handleNewUserPasswordConfirmation = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPasswordConfirmation(event.target.value)
	}

	const handleCreateOneRoom = () => {
		if (
			newUserName === '' ||
			newUserPosition === '' ||
			newUserPhoneNumber === 0 ||
			newUserStartDate === '' ||
			newRoomOffer === ''
		) {
			alert('Please fill all the fields')
		} else {
			if (password === passwordConfirmation) {
				console.log('Passwords match!')
			} else {
				console.log('Passwords do not match!')
			}
			const newUser: IUser = {
				full_name: newUserName,
				email: newRoomOffer,
				photo: 'https://robohash.org/JohnDoe.png?set=any',
				start_date: newUserStartDate,
				description: newUserPosition,
				phone_number: newUserPhoneNumber.toString(),
				status: 'active',
			}
			dispatch(createOneUser(newUser))
			handleToggleModalNewRoom()
		}
	}

	const handleToggleModalNewRoom = () => {
		if (!toggleModalNewRoom) {
			setToggleModalNewRoom(true)
		} else {
			setToggleModalNewRoom(false)
		}
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<NavLink to={'/users'}>
					<CTA>Back</CTA>
				</NavLink>
				<TitleText newroom='title'>Create New Employee</TitleText>
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
								<RoomTypeSelector
									name='userPosition'
									id='userPosition'
									onChange={handleNewUserPosition}
									defaultValue='userPosition'
								>
									<option value='userPosition' disabled>
										Position:
									</option>
									<option value='recepcionist'>
										Recepcionist
									</option>
									<option value='clean'>Cleaner</option>
									<option value='sales'>Sales</option>
									<option value='director'>Director</option>
								</RoomTypeSelector>

								<CreateRoomInputLable htmlFor='userName'>
									Full Name:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='userName'
									id='userName'
									type='text'
									placeholder='David Pallarés'
									onChange={handleNewUserName}
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
								/>
								<CreateRoomInputLable
									types='name'
									htmlFor='roomAmenitiesSelector'
								>
									Profile Photo:
									<InputFile
										name='roomAmenitiesSelector'
										id='roomAmenitiesSelector'
										propType='file'
										type='file'
										onChange={() => {
											console.log('iim a photo input')
										}}
										alt='a photo of the user profile'
										// onChange={handleNewUserProfilePhoto}
									/>
								</CreateRoomInputLable>
							</ModalInnerLeftInfo>

							<ModalInnerRightInfo>
								<CreateRoomInputLable htmlFor='userName'>
									Email:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='userName'
									id='userName'
									type='email'
									placeholder='an-email@empty.com'
									onChange={handleNewUserEmail}
								/>
								<CreateRoomInputLable htmlFor='userStartDate'>
									Start Date:
								</CreateRoomInputLable>
								<CreateRoomInput
									id='userStartDate'
									name='userStartDate'
									type='date'
									onChange={handleUserStartDate}
								/>

								<CreateRoomInputLable htmlFor='password'>
									Password:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='password'
									id='password'
									type='password'
									placeholder='Enter your password'
									onChange={handleNewUserPassword}
								/>

								<CreateRoomInputLable htmlFor='passwordConfirmation'>
									Confirm Password:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='passwordConfirmation'
									id='passwordConfirmation'
									type='password'
									placeholder='Confirm your password'
									onChange={handleNewUserPasswordConfirmation}
								/>
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

export default CreateUser

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

const RoomTypeSelector = styled.select`
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
