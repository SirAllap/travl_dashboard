import React from 'react'
import styled, { css } from 'styled-components'
import { LiaBedSolid } from 'react-icons/lia'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { IoLogInOutline } from 'react-icons/io5'

const MainContainer = styled.main`
	text-align: center;
	min-height: 100%;
	min-width: 1474px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`
const ContainerCardKPI = styled.div`
	min-width: 1474px;
	max-height: 135px;
	flex-shrink: 0;
	white-space: nowrap;
`

const KPICardInfo = styled.div`
	display: inline-block;
	min-width: 340px;
	min-height: 125px;
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0px 4px 4px #00000005;
	margin-right: 38px;
	transition: 0.3s;
	&:hover .icon-square {
		background-color: #e23428;
		color: #fff;
		transform: scale(1.1);
	}
	&:hover {
		transform: scale(1.03);
		box-shadow: 0px 16px 30px #00000014;
	}
	&:last-child {
		margin-right: 0px;
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
	font-size: 35px;
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

const CustomerReviewContainer = styled.div`
	position: relative;
	text-align: center;
	margin: 0 auto;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0px 4px 4px #00000005;
	margin-top: 40px;
	text-align: center;
	height: 433px;
	max-width: 1474px;
`

const CustomerReviewCard = styled.div`
	display: inline-block;
	width: 431px;
	height: 275px;
	background-color: #fff;
	border: 1px solid #ebebeb;
	border-radius: 20px;
	margin-top: 88px;
	margin-right: 40px;
	transition: 0.3s;
	&:last-child {
		margin-right: 0px;
	}
	&:hover {
		transform: scale(1.01);
		box-shadow: 0px 16px 30px #00000014;
	}
`
const CustomerCardText = styled.p`
	${(props) => {
		switch (props.type) {
			case 'cardTitle':
				return css`
          font: normal normal 500 20px Poppins;
          color: #393939;
		  text-align: left;
		  position: absolute;
		  left: 50px;
		  top: 30px
          }
        `
			case 'cardBody':
				return css`
          font: normal normal 400 16px Poppins;
          color: #4E4E4E;
		  text-align: justify;
          }
        `
			case 'cardUserName':
				return css`
          font: normal normal 600 16px Poppins;
          color: #262626;
		  text-align: left;
          }
        `
			default:
				return css`
          font: normal normal 400 14px Poppins;
		  color: #799283;
		  text-align: left;
          }
        `
		}
	}}
`
const CustomerReviewCardTopData = styled.div``
const CustomerReviewCardBody = styled.p``

const CustomerReviewCardBottomData = styled.div``
const CustomerReviewCardUserPhoto = styled.div``
const CustomerReviewCardUserName = styled.p``
const CustomerReviewCardUserEmail = styled.p``
const CustomerReviewCardUserPhoneNumber = styled.p``
const CustomerReviewCardSubject = styled.p``

const Dashboard = (props) => {
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<ContainerCardKPI>
					<KPICardInfo>
						<KPICardContainer>
							<KPICardIcon className='icon-square'>
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
							<KPICardIcon className='icon-square'>
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
							<KPICardIcon className='icon-square'>
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
							<KPICardIcon className='icon-square'>
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
				<CustomerReviewContainer>
					<CustomerCardText type='cardTitle'>
						Latest Review by Customers
					</CustomerCardText>
					<CustomerReviewCard></CustomerReviewCard>
					<CustomerReviewCard></CustomerReviewCard>
					<CustomerReviewCard></CustomerReviewCard>
				</CustomerReviewContainer>
			</MainContainer>
		</>
	)
}

export default Dashboard
