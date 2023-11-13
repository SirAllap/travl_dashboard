import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import { AiOutlineHeart } from 'react-icons/ai'
import { LuMail } from 'react-icons/lu'
import { BiBell } from 'react-icons/bi'
import { BiMessageAltDetail } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import * as color from './Variables'
import { supertoggleContext } from '../context/ToggleContext'
import { authenticationContext } from '../context/AutheContext'

const Header: React.FC = () => {
	const { dispatch, state, stateBread } = useContext(supertoggleContext)!
	const { logout, authState } = useContext(authenticationContext)!
	const location = useLocation()
	const [currentBreadCrumb, setCurrentBreadCrumb] = useState<string>('')
	const [curentTitle, setCurrentTitle] = useState<string>('Dashboard')

	const handleToggleOfSideBar = () => {
		return state.position === 'open'
			? dispatch({ type: 'close' })
			: dispatch({ type: 'open' })
	}

	const handleLogOut = () => {
		logout()
	}

	useEffect(() => {
		setCurrentTitle(stateBread.headerTitle)
		if (location.pathname.startsWith('/bookings/')) {
			setCurrentBreadCrumb(stateBread.bookingBreadCrumb)
		} else if (location.pathname === '/rooms/edit-room/') {
			setCurrentBreadCrumb(stateBread.roomEditioBreadCrumb)
		} else if (location.pathname === '/rooms/create-room') {
			setCurrentBreadCrumb('Rooms/Create New Room')
		} else if (location.pathname === '/users/create-employee') {
			setCurrentBreadCrumb('Employees/Create New Employee')
		} else if (location.pathname.startsWith('/rooms/')) {
			setCurrentBreadCrumb(stateBread.roomBreadCrumb)
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
				setCurrentTitle('Employees')
				break
			case '/users/create-employee':
				setCurrentTitle('New User Form')
				break
			case '/rooms/create-room':
				setCurrentTitle('New Room Form')
				break
			default:
				break
		}
	}, [
		location.pathname,
		stateBread.roomBreadCrumb,
		stateBread.headerTitle,
		stateBread.bookingBreadCrumb,
		stateBread.roomEditioBreadCrumb,
	])

	if (authState.auth)
		return (
			<>
				<HeaderBar>
					<LeftContainer>
						<IconStyle menu='menu' onClick={handleToggleOfSideBar}>
							<HiArrowsRightLeft />
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
							<AiOutlineHeart />
						</IconStyle>
						<IconStyle groupofrigthicons='groupofrigthicons'>
							<LuMail />
						</IconStyle>
						<IconStyle groupofrigthicons='groupofrigthicons'>
							<BiBell />
						</IconStyle>
						<IconStyle groupofrigthicons='groupofrigthicons'>
							<BiMessageAltDetail />
						</IconStyle>
						<ProfilePictureVoid
							src={
								authState.profilePicture
									? typeof authState.profilePicture ===
									  'function'
										? ' '
										: authState.profilePicture
									: undefined
							}
						/>
						<VerticalDivider />
						<IconStyle logout='logout'>
							<HiOutlineLogout
								data-cy='icon-trigger-logout'
								onClick={handleLogOut}
							/>
						</IconStyle>
					</RightContainer>
				</HeaderBar>
			</>
		)
	return null
}

export default Header

const HeaderBar = styled.nav`
	height: 120px;
	font-size: 18px;
	padding-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${color.clearBackground};
	box-shadow: 0px 3px 10px ${color.softer_ligthGrey};
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
interface IconStyleProps {
	readonly menu?: string
	readonly logout?: string
	readonly groupofrigthicons?: string
	readonly search?: string
}
export const IconStyle = styled.div<IconStyleProps>`
	display: flex;
	align-items: center;
	font-size: 30px;
	color: ${color.softer_strongGrey};
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
	&:last-child {
		color: ${color.softer_normalPinkie};
		&:hover {
			color: ${color.normalPinkie};
		}
	}
`

const DashboardTitle = styled.p`
	font: normal 600 30px Poppins;
	color: ${color.strongGrey};
`

const DashboardSubtitle = styled.p`
	font: normal normal 400 14px Poppins;
	color: ${color.normalGrey};
	max-height: 1px;
`

const ProfilePictureVoid = styled.img`
	background: ${(props) =>
		props.src ? 'transparent' : '${color.normalGrey}'};
	width: 60px;
	height: 60px;
	border-radius: 8px;
	margin-right: 28px;
`

const VerticalDivider = styled.div`
	width: 3px;
	height: 55px;
	border-left: dashed 1px ${color.softer_normalGrey};
	margin-right: 20px;
`
