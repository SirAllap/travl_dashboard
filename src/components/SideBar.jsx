import React from 'react'
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

const SideBar = (props) => {
	const handleHeaderTitle = (titleName) => {
		props.setHeaderTitle(titleName)
	}

	return (
		<>
			<Container toggle={props.toggle}>
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
					<UserCardText type='name'>David Pallarés</UserCardText>
					<UserCardText>david.pr.developer@gmail.com</UserCardText>
					<NavLink to='/contact'>
						<UserCardButton
							onClick={() => handleHeaderTitle('Contact')}
						>
							Contact Us
						</UserCardButton>
					</NavLink>
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
