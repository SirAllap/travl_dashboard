import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { supertoggleContext } from '../context/ToggleContext'
import { Triangle } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserState } from '../features/users/userSlice'
import { createOneUser } from '../features/users/userThunks'
import * as color from '../components/Variables'

const CreateUser = (props) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const createUserCurretState = useSelector(createUserState)
	const { state } = useContext(supertoggleContext)
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

	const [newUserPosition, setNewUserPosition] = useState('')
	const handleNewUserPosition = (event) => {
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

	const [newUserName, setNewUserName] = useState('')
	const handleNewUserName = (event) => {
		setNewUserName(event.target.value)
	}

	const [newUserPhoneNumber, setNewUserPhoneNumber] = useState(0)
	const handleNewPhoneNumber = (event) => {
		setNewUserPhoneNumber(parseInt(event.target.value))
	}

	const [newUserStartDate, setNewUserStartDate] = useState('')
	const handleUserStartDate = (event) => {
		setNewUserStartDate(event.target.value)
	}

	const [newRoomOffer, setNewUserEmail] = useState('')
	const handleNewUserEmail = (event) => {
		setNewUserEmail(event.target.value)
	}

	function randomID() {
		return Math.floor(Math.random() * 1000000).toString()
	}
	const handleCreateOneRoom = () => {
		const newUser = {
			employee_id: randomID(),
			full_name: newUserName,
			email: newRoomOffer,
			photo: 'https://robohash.org/JohnDoe.png?set=any',
			start_date: newUserStartDate,
			description: newUserPosition,
			phone_number: newUserPhoneNumber,
			status: 'active',
		}
		dispatch(createOneUser(newUser))
		handleToggleModalNewRoom()
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
								wrapperClassName=''
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
									<option
										value='userPosition'
										disabled
										hidden
									>
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
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />

								<CreateRoomInputLable
									type='name'
									htmlFor='roomAmenitiesSelector'
								>
									Profile Photo:
									<button
										name='roomAmenitiesSelector'
										id='roomAmenitiesSelector'
										// onChange={handleNewUserProfilePhoto}
									>
										Upload a profile photo
									</button>
								</CreateRoomInputLable>
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

const CreateRoomInputLable = styled.label`
	display: ${(props) => (props.radio === 'radio' ? 'inline' : 'block')};
	text-align: left;
	font: normal normal 500 17px Poppins;
	color: ${color.strongPurple};
	padding: 15px 0 10px 0;
`
const CreateRoomInput = styled.input`
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

const MainContainer = styled.main`
	position: relative;
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const TitleText = styled.h1`
	background-color: #fff;
	border-radius: 20px 20px 0px 0px;
	border-bottom: 1px dashed ${color.ligthPurple};
	color: ${color.strongPurple};
	font: ${(props) =>
		props.newroom === 'title' ? '600 25px Poppins' : '500 25px Poppins'};
	text-align: center;
	padding: 5px;
`
