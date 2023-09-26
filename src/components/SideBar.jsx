import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import logo from '../assets/logo_dashboard.png'
import { NavLink } from 'react-router-dom'
import { LuLayoutDashboard } from 'react-icons/lu'
import { SlKey } from 'react-icons/sl'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { BiUser } from 'react-icons/bi'
import { IoExtensionPuzzleOutline } from 'react-icons/io5'

const Container = styled.aside`
	min-width: 345px;
	height: 100%;
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
	min-height: 395px;
`

const VerticalDivider = styled.div`
	visibility: hidden;
	width: 8px;
	height: 67px;
	background-color: #e23428;
	border-radius: 0 6px 6px 0;
	position: relative;
	right: 63px;
	transition: 0.1s;
`

const MenuItems = styled(NavLink)`
	height: 67px;
	margin: 0 0 15px 63px;
	display: flex;
	align-items: center;
	text-align: center;
	font-size: 25px;
	color: #799283;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: #e23428;
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
	margin-top: 41px;
`

const UserCardProfilePictureVoid = styled.div`
	background-color: #c5c5c5;
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
	margin: 62px auto 62px auto;
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
          margin: 0 0 67px 0;
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
	min-height: 400px;
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
const CloseCTA = styled.button`
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

const Input = styled.input`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	top: ${(props) => (props.type === 'email' ? '45%' : '20%')};
	transform: translate(-50%, -50%);
	width: 90%;
	height: 47px;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #135846;
	padding: 20px;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
`

const EditUserInputLable = styled.label`
	position: absolute;
	left: 3%;
	margin-right: -50%;
	top: ${(props) => (props.type === 'email' ? '38%' : '13%')};
	transform: translate(-50%, -50%);
	font: normal normal 500 17px Poppins;
	display: block;
	color: #135846;
	margin-left: 40px;
`

const SideBar = (props) => {
	const [toggleModal, setToggleModal] = useState(false)
	const [userUpdatedName, setUpdatedUserName] = useState('')
	const [userUpdatedEmail, setUpdatedUserEmail] = useState('')
	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	const currentUser = JSON.parse(localStorage.getItem('currentUser'))

	useEffect(() => {
		setUserName(currentUser.userName)
		setUserEmail(currentUser.email)
	}, [currentUser.userName, currentUser.email])

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
		if (userUpdatedName.length > 3 && userUpdatedEmail.length > 3) {
			setUserName(userUpdatedName)
			setUserEmail(userUpdatedEmail)
			setToggleModal(false)
			const updateUser = {
				userName: userUpdatedName,
				email: userUpdatedEmail,
			}
			localStorage.setItem('currentUser', JSON.stringify(updateUser))
		}
	}

	const handleUpdateUserName = (event) => {
		setUpdatedUserName(event.target.value)
	}
	const handleUpdateUserEmail = (event) => {
		setUpdatedUserEmail(event.target.value)
	}

	return (
		<>
			<Container toggle={props.toggle}>
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
					<CloseCTA onClick={handleUpdateAndCloseModal}>
						Save
					</CloseCTA>
				</EditUserModal>
				<LogoSection>
					<LogoImage src={logo} alt='a logo of the hotel dashboard' />
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
						<MenuItemText>Room</MenuItemText>
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
						onClick={() => handleHeaderTitle('Guest List')}
						to='/users'
					>
						<VerticalDivider className='left-decoration' />
						<BiUser />
						<MenuItemText>Guest</MenuItemText>
					</MenuItems>
					<MenuItems
						onClick={() => handleHeaderTitle('Concierge List')}
						to='/concierge'
					>
						<VerticalDivider className='left-decoration' />
						<IoExtensionPuzzleOutline />
						<MenuItemText>Concierge</MenuItemText>
					</MenuItems>
				</IconSection>
				<UserCardInfo>
					<UserCardProfilePictureVoid />
					<UserCardText type='name'>{userName}</UserCardText>
					<UserCardText>{userEmail}</UserCardText>
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
