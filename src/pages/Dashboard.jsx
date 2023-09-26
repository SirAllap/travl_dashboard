import React from 'react'
import styled, { css } from 'styled-components'
import { LiaBedSolid } from 'react-icons/lia'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { IoLogInOutline } from 'react-icons/io5'

const MainContainer = styled.main`
	text-align: center;
	min-height: 100%;
	min-width: 1450px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`
const ContainerCardKPI = styled.div`
	min-width: 1450px;
	max-height: 135px;
`

const KPICardInfo = styled.div`
	display: inline-block;
	min-width: 330px;
	min-height: 125px;
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0px 4px 4px #00000005;
	margin-right: 28px;
	transition: 0.3s;
	&:hover .iconSquare {
		background-color: #e23428;
		color: #fff;
		transform: scale(1.05);
	}
	&:hover {
		transform: scale(1.1);
	}
`

const KPICardContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 30px;
	gap: 22px;
	height: 125px;
`
const KPITextContaind = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 70px;
	text-align: left;
`

const KPICardIcon = styled.div`
	width: 65px;
	height: 65px;
	background-color: #ffedec;
	border-radius: 8px;
	font-size: 30px;
	padding: 15px;
	transition: 0.3s;
	color: #e23428;
`
const CardText = styled.p`
	${(props) => {
		switch (props.type) {
			case 'title':
				return css`
          font: normal normal 600 30px Poppins;
          color: #393939;
          }
        `
			default:
				return css`
          font: normal normal 300 14px Poppins;
		  color: #787878;
          }
        `
		}
	}}
`

const Dashboard = (props) => {
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<ContainerCardKPI>
					<KPICardInfo>
						<KPICardContainer>
							<KPICardIcon className='iconSquare'>
								<LiaBedSolid />
							</KPICardIcon>
							<KPITextContaind>
								<CardText type='title'>8,461</CardText>
								<CardText>New Booking</CardText>
							</KPITextContaind>
						</KPICardContainer>
					</KPICardInfo>

					<KPICardInfo>
						<KPICardContainer>
							<KPICardIcon className='iconSquare'>
								<LuCalendarCheck2 />
							</KPICardIcon>
							<KPITextContaind>
								<CardText type='title'>963</CardText>
								<CardText>Scheduled Room</CardText>
							</KPITextContaind>
						</KPICardContainer>
					</KPICardInfo>

					<KPICardInfo>
						<KPICardContainer>
							<KPICardIcon className='iconSquare'>
								<IoLogInOutline />
							</KPICardIcon>
							<KPITextContaind>
								<CardText type='title'>753</CardText>
								<CardText>Check In</CardText>
							</KPITextContaind>
						</KPICardContainer>
					</KPICardInfo>

					<KPICardInfo>
						<KPICardContainer>
							<KPICardIcon className='iconSquare'>
								<IoLogInOutline
									style={{ transform: 'rotate(180deg)' }}
								/>
							</KPICardIcon>
							<KPITextContaind>
								<CardText type='title'>516</CardText>
								<CardText>Check Out</CardText>
							</KPITextContaind>
						</KPICardContainer>
					</KPICardInfo>
				</ContainerCardKPI>
			</MainContainer>
		</>
	)
}

export default Dashboard
