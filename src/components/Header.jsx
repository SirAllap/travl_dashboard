import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supertoggleContext } from '../context/supertoggleContext'
import styled from 'styled-components'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import { AiOutlineHeart } from 'react-icons/ai'
import { LuMail } from 'react-icons/lu'
import { BiBell } from 'react-icons/bi'
import { BiMessageAltDetail } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { authenticationContext } from '../context/authenticationContext'

const Header = (props) => {
	const { dispatch, state } = useContext(supertoggleContext)
	const { logout } = useContext(authenticationContext)
	const location = useLocation()
	const [currentBreadCrumb, setCurrentBreadCrumb] = useState('')
	const [curentTitle, setCurrentTitle] = useState('Dashboard')

	const handleToggleOfSideBar = () => {
		return state.position === 'open'
			? dispatch({ type: 'close' })
			: dispatch({ type: 'open' })
	}

	const handleLogOut = () => {
		logout()
	}

	useEffect(() => {
		const idNumb = props.newBreadCrumb.split('/')
		if (location.pathname.startsWith('/bookings/')) {
			setCurrentBreadCrumb(props.newBreadCrumb)
		} else if (location.pathname.startsWith('/rooms/')) {
			setCurrentBreadCrumb(props.newBreadCrumb)
		} else {
			setCurrentBreadCrumb('')
		}
		switch (location.pathname) {
			case '/':
				setCurrentTitle('Dashboard')
				break
			case '/rooms':
				setCurrentTitle('Rooms')
				break
			case '/bookings':
				setCurrentTitle('Bookings')
				break
			case '/contact':
				setCurrentTitle('Contact')
				break
			case '/users':
				setCurrentTitle('Users')
				break
			case `/bookings/${idNumb[1]}`:
				setCurrentTitle('Booking Details')
				break
			case `/rooms/${idNumb[1]}`:
				setCurrentTitle('Room Details')
				break
			default:
				break
		}
	}, [props.newBreadCrumb, location.pathname])

	return (
		<>
			<HeaderBar>
				<LeftContainer>
					<IconStyle menu='menu'>
						<HiArrowsRightLeft onClick={handleToggleOfSideBar} />
					</IconStyle>
					<div>
						<DashboardTitle>{curentTitle}</DashboardTitle>
						<DashboardSubtitle>
							{currentBreadCrumb}
						</DashboardSubtitle>
					</div>
				</LeftContainer>
				<RightContainer>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<AiOutlineHeart color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<LuMail color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<BiBell color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<BiMessageAltDetail color='#135846' />
					</IconStyle>
					<ProfilePictureVoid src={props.profilepicture} />
					<VerticalDivider />
					<IconStyle logout='logout'>
						<HiOutlineLogout
							color='#E23428'
							onClick={handleLogOut}
						/>
					</IconStyle>
				</RightContainer>
			</HeaderBar>
		</>
	)
}

export default Header

const HeaderBar = styled.nav`
	height: 120px;
	font-size: 18px;
	padding-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	box-shadow: 0px 3px 10px #00000009;
`

const LeftContainer = styled.div`
	min-width: fit-content;
	display: flex;
	align-items: center;
	margin-right: 10px;
`

const RightContainer = styled.div`
	min-width: fit-content;
	display: flex;
	align-items: center;
`

const IconStyle = styled.div`
	display: flex;
	align-items: center;
	font-size: 30px;
	color: black;
	margin: ${(props) =>
		props.menu === 'menu'
			? '0 50px 0 41px'
			: props.logout === 'logout'
			? '0 50px 0 16px '
			: props.groupofrigthicons === 'groupofrigthicons' && '0 51px 0 0 '};
	cursor: pointer;
	position: ${(props) => props.search === 'search' && 'relative'};
	left: -40px;
	transition: 0.3s;
	&:hover {
		transform: scale(1.1);
	}
`

const DashboardTitle = styled.p`
	font: normal normal 600 28px/42px Poppins;
`

const DashboardSubtitle = styled.p`
	font: normal normal 400 14px Poppins;
	color: #6e6e6e;
	max-height: 1px;
`

const ProfilePictureVoid = styled.img`
	background: ${(props) => (props.src ? 'transparent' : '#79928382')};
	width: 60px;
	height: 60px;
	border-radius: 8px;
	margin-right: 28px;
`

const VerticalDivider = styled.div`
	width: 3px;
	height: 55px;
	border-left: solid 3px #ebebeb;
	margin-right: 20px;
`
