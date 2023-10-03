import React, { useEffect, useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import logo from '../assets/logo_dashboard.png'
import { NavLink } from 'react-router-dom'
import { LuLayoutDashboard } from 'react-icons/lu'
import { SlKey } from 'react-icons/sl'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { SlPeople } from 'react-icons/sl'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supertoggleContext } from '../context/supertoggleContext'

const SideBar = (props) => {
	const { state } = useContext(supertoggleContext)

	const [toggleModal, setToggleModal] = useState(false)
	// const [togglePhotoModal, setTogglePhotoModal] = useState(false)
	const [userUpdatedName, setUpdatedUserName] = useState('')
	const [userUpdatedEmail, setUpdatedUserEmail] = useState('')

	const [userName1, setUserName1] = useState('')
	const [userEmail1, setUserEmail1] = useState('')

	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	const [profPic, setProfPic] = useState('')
	const [file2Upload, setFile2Upload] = useState()

	// eslint-disable-next-line
	const handleProfilePictureChange = (newPictureUrl) => {
		localStorage.setItem('profilePicture', newPictureUrl)
	}

	const handleChange = (e) => {
		const newPictureUrl = URL.createObjectURL(e.target.files[0])
		setFile2Upload(newPictureUrl)
		handleProfilePictureChange(newPictureUrl)
	}

	const currentUser = JSON.parse(localStorage.getItem('currentUser'))
	let fetchCurrentUser = {}
	if (currentUser) {
		fetchCurrentUser = currentUser
	}

	const handleUpdateUserName = (event) => {
		setUpdatedUserName(event.target.value)
	}
	const handleUpdateUserEmail = (event) => {
		setUpdatedUserEmail(event.target.value)
	}

	useEffect(() => {
		setProfPic('https://robohash.org/Admin.png?set=any')
		const savedProfilePicture = localStorage.getItem('profilePicture')
		setProfPic(
			savedProfilePicture || 'https://robohash.org/oxygen.png?set=any'
		)
		props.setProfilePicture(
			savedProfilePicture || 'https://robohash.org/oxygen.png?set=any'
		)
		fetchCurrentUser.userName !== null &&
			setUserName1(fetchCurrentUser.userName)
		fetchCurrentUser.email !== null && setUserEmail1(fetchCurrentUser.email)
	}, [
		profPic,
		props,
		handleProfilePictureChange,
		currentUser,
		fetchCurrentUser.email,
		fetchCurrentUser.userName,
	])

	const handleHeaderTitle = (titleName) => {
		props.setHeaderTitle(titleName)
	}
	const handleToggleModal = () => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
	}

	const handleUpdateAndCloseModal = () => {
		if (userUpdatedName === '') {
			setUserName(currentUser.userName)
		} else setUserName(userUpdatedName)
		if (userUpdatedEmail === '') {
			setUserEmail(currentUser.email)
		} else setUserEmail(userUpdatedEmail)
		setToggleModal(false)
		const updateUser = {
			userName:
				userUpdatedName === '' ? currentUser.userName : userUpdatedName,
			email:
				userUpdatedEmail === '' ? currentUser.email : userUpdatedEmail,
		}
		localStorage.setItem('currentUser', JSON.stringify(updateUser))
	}

	return (
		<>
			<Container toggle={state.position}>
				<EditUserModalOverlay open={toggleModal} />
				<EditUserModal open={toggleModal}>
					<EditUserInputLable type='name'>Name</EditUserInputLable>
					<Input
						type='name'
						placeholder='name'
						onChange={handleUpdateUserName}
					/>
					<EditUserInputLable type='email'>Email</EditUserInputLable>

					<Input
						type='email'
						placeholder='email'
						onChange={handleUpdateUserEmail}
					/>

					<UserCardProfilePictureModal
						src={!file2Upload ? profPic : file2Upload}
					/>
					<InputFile
						type='file'
						onChange={handleChange}
						alt='a photo of the user profile'
					/>
					<SaveCTA onClick={handleUpdateAndCloseModal}>Save</SaveCTA>
					<CloseCTA onClick={handleToggleModal}>
						<AiOutlineCloseCircle />
					</CloseCTA>
				</EditUserModal>
				<LogoSection>
					<NavLink to={'/dashboard'}>
						<LogoImage
							src={logo}
							alt='a logo of the hotel dashboard'
						/>
					</NavLink>
				</LogoSection>
				<IconSection>
					<MenuItems
						onClick={() => handleHeaderTitle('Dashboard')}
						to='/'
					>
						<VerticalDivider />
						<LuLayoutDashboard />
						<MenuItemText>Dashboard</MenuItemText>
					</MenuItems>
					<MenuItems
						onClick={() => handleHeaderTitle('Room List')}
						to='/rooms'
					>
						<VerticalDivider className='left-decoration' />
						<SlKey />
						<MenuItemText>Rooms</MenuItemText>
					</MenuItems>
					<MenuItems
						onClick={() => handleHeaderTitle('Bookings')}
						to='/bookings'
					>
						<VerticalDivider className='left-decoration' />
						<LuCalendarCheck2 />
						<MenuItemText>Bookings</MenuItemText>
					</MenuItems>
					<MenuItems
						onClick={() => handleHeaderTitle('Contact List')}
						to='/contact'
					>
						<VerticalDivider className='left-decoration' />
						<MdOutlineRateReview />
						<MenuItemText>Contact</MenuItemText>
					</MenuItems>
					<MenuItems
						onClick={() => handleHeaderTitle('Users')}
						to='/users'
					>
						<VerticalDivider className='left-decoration' />
						<SlPeople />
						<MenuItemText>Users</MenuItemText>
					</MenuItems>
				</IconSection>
				<UserCardInfo>
					<UserCardProfilePictureVoid src={profPic} />
					<UserCardText type='name'>
						{!userName ? userName1 : userName}
					</UserCardText>
					<UserCardText>
						{!userEmail ? userEmail1 : userEmail}
					</UserCardText>
					<UserCardButton onClick={handleToggleModal}>
						Edit user
					</UserCardButton>
				</UserCardInfo>
				<SideBarFooter>
					<SideBarFooterText type='title'>
						Travl Hotel Admin Dashboard
					</SideBarFooterText>
					<SideBarFooterText type='copyright'>
						© 2020 All Rights Reserved
					</SideBarFooterText>
					<SideBarFooterText>Made with ♥ by DPR</SideBarFooterText>
				</SideBarFooter>
				<NavLink to='/contact'></NavLink>
			</Container>
		</>
	)
}

export default SideBar

const Container = styled.aside`
	min-width: 345px;
	height: 100vh;
	background-color: #ffffff;
	float: left;
	margin-left: ${(props) => (props.toggle === 'close' ? '-345px' : 0)};
	transition: 0.3s all ease;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const LogoSection = styled.section`
	height: fit-content;
	width: 345px;
	text-align: center;
	margin: 32px 0 67px 0;
`

const LogoImage = styled.img`
	max-width: 220px;
	object-fit: contain;
`

const IconSection = styled.section`
	width: 100%;
	max-height: 375px;
`

const VerticalDivider = styled.div`
	visibility: hidden;
	width: 8px;
	height: 64px;
	background-color: #e23428;
	border-radius: 0 6px 6px 0;
	position: relative;
	right: 63px;
	transition: 0.1s;
`

const MenuItems = styled(NavLink)`
	height: 67px;
	margin: 0 0 0 63px;
	display: flex;
	align-items: center;
	text-align: right;
	font-size: 25px;
	color: #799283;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: #e2342891;
		${VerticalDivider} {
			transition: 0.2s;
			background-color: #e2342891;
			width: 19px;
		}
	}
	&:hover :nth-child(1) {
		visibility: visible;
	}
	&:focus,
	&:hover,
	&:visited,
	&:link {
		text-decoration: none;
	}
	&.active {
		color: #e23428;
		:nth-child(1) {
			visibility: visible;
		}
		&:hover {
			color: #e2342891;
		}
	}
`

const MenuItemText = styled.p`
	font: normal normal 600 18px/27px Poppins;
	margin-left: 26px;
`

const UserCardInfo = styled.div`
	width: 233px;
	height: 221px;
	border-radius: 18px;
	background-color: #fff;
	box-shadow: 0px 20px 30px #00000014;
	margin: 0 auto;
	text-align: center;
	margin-top: 31px;
`

const UserCardProfilePictureVoid = styled.img`
	background: ${(props) => (props.src ? 'transparent' : '#79928382')};
	width: 70px;
	height: 70px;
	border-radius: 8px;
	margin: 0 auto;
`

const UserCardText = styled.p`
	${(props) => {
		switch (props.type) {
			case 'name':
				return css`
          font: normal normal 500 16px Poppins;
          color: #393939;
          margin: 15px 0 9px 0;
		}
        `
			default:
				return css`
          font: normal normal 300 12px Poppins;
          color: #B2B2B2;
		}
        `
		}
	}}
`

const UserCardButton = styled.button`
	width: 158px;
	height: 47px;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const SideBarFooter = styled.div`
	width: 242px;
	height: 135px;
	margin: 42px auto 0px auto;
`

const SideBarFooterText = styled.p`
	${(props) => {
		switch (props.type) {
			case 'title':
				return css`
          font: normal normal 600 16px Poppins;
          color: #212121;
          margin: 0 0 5px 0;
          }
        `
			case 'copyright':
				return css`
          font: normal normal 300 14px Poppins;
          color: #799283;
          margin: 0 0 27px 0;
          }
        `
			default:
				return css`
          font: normal normal 300 14px Poppins;
          color: #799283;
          }
        `
		}
	}}
`

const EditUserModal = styled.div`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 331px;
	min-height: 500px;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const EditUserModalOverlay = styled.div`
	z-index: 99;
	position: absolute;
	min-width: 100%;
	min-height: 100% !important;
	background-color: rgba(0, 0, 0, 0.434);
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const SaveCTA = styled.button`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 0px;
	width: 90%;
	height: 47px;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const UserCardProfilePictureModal = styled(UserCardProfilePictureVoid)`
	width: 130px;
	height: 130px;
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 65px;
	&:hover {
		opacity: 0.8;
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

const InputFile = styled.input`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	top: 80%;
	transform: translate(-50%, -50%);
	max-width: 54.4%;
	color: #135846;
	transition: 0.3s;
	color: #444;
	background: #fff;
	&::file-selector-button {
		font: normal normal 500 14px Poppins;
		border: none;
		background: #135846;
		padding: 10px 20px;
		border-radius: 8px;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}
	&::file-selector-button:hover {
		background: #ebf1ef;
		color: #135846;
	}
`

const Input = styled(InputFile)`
	top: ${(props) => (props.type === 'email' ? '35%' : '15%')};
	height: 47px;
	width: 350px;
	max-width: 90%;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	padding: 20px;
	margin-top: 16px;
`

const EditUserInputLable = styled.label`
	position: absolute;
	left: 3%;
	margin-right: -50%;
	top: ${(props) => (props.type === 'email' ? '30%' : '10%')};
	transform: translate(-50%, -50%);
	font: normal normal 500 17px Poppins;
	display: block;
	color: #135846;
	margin-left: 40px;
`
