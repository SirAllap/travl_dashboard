import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { LiaBedSolid } from 'react-icons/lia'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { IoLogInOutline } from 'react-icons/io5'
import { FaRegEnvelopeOpen } from 'react-icons/fa'
import { FaRegEnvelope } from 'react-icons/fa'
import './styles.css'
import { supertoggleContext } from '../context/ToggleContext'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
	archiveStatus,
	fetchContactState,
	initialContacts,
} from '../features/contact/contactSlice'
import {
	archiveContacts,
	fetchInitialContacts,
} from '../features/contact/contactThunks'
import { Triangle } from 'react-loader-spinner'
import * as color from '../components/Variables'
import { useAppDispatch, useAppSelector } from '../app/hooks'

const Dashboard: React.FC = () => {
	const dispatch = useAppDispatch()
	const initialContactData = useAppSelector(initialContacts)
	const initialContactState = useAppSelector(fetchContactState)
	const archiveCurrentStatus = useAppSelector(archiveStatus)
	const { state } = useContext(supertoggleContext)!
	const [toggleModal, setToggleModal] = useState<boolean>(false)
	const [toggleModalUser, setToggleModalUser] = useState<IModalUser>({})
	const [currentId, setCurrentId] = useState<string>('')
	const [spinner, setSpinner] = useState<boolean>(true)
	const [archiveSpinner, setArchiveSpinner] = useState<boolean>(false)

	interface IModalUser {
		id?: string
		subject_of_review?: string
		review_body?: string
		full_name?: string
		email?: string
		phone_number?: string
		state?: string
	}
	useEffect(() => {
		dispatch(fetchInitialContacts())
	}, [dispatch])

	useEffect(() => {
		if (initialContactState === 'pending') {
			setSpinner(true)
		} else if (initialContactState === 'fulfilled') {
			setSpinner(false)
		}
		if (archiveCurrentStatus === 'pending') {
			setArchiveSpinner(true)
		} else {
			setArchiveSpinner(false)
			setToggleModal(false)
		}
	}, [initialContactState, archiveCurrentStatus])

	const handleToggleModal = (userReview?: { id: string }): void => {
		if (userReview !== undefined) {
			setCurrentId(userReview.id)
			if (!toggleModal) {
				setToggleModal(true)
				setToggleModalUser(userReview)
			} else {
				handleMarkAsRead(currentId)
			}
		} else {
			if (!toggleModal) {
				setToggleModal(true)
			} else {
				handleMarkAsRead(currentId)
			}
		}
	}

	const handleMarkAsRead = (id: string) => {
		dispatch(archiveContacts(id))
	}

	return (
		<>
			<CustomerReviewModalOverlay
				onClick={() => {
					handleToggleModal()
				}}
				open={toggleModal}
			/>
			<CustomerReviewModal open={toggleModal}>
				<SpinnerContainerInsideModal>
					<Triangle
						height='150'
						width='150'
						color={color.normalPinkie}
						ariaLabel='triangle-loading'
						visible={archiveSpinner}
					/>
				</SpinnerContainerInsideModal>
				<CloseCTA
					onClick={() => {
						handleToggleModal()
					}}
				>
					<FaRegEnvelopeOpen />
				</CloseCTA>
				{toggleModalUser && (
					<>
						<CustomerCardText
							type={{
								text: 'cardSubject',
							}}
						>
							{toggleModalUser.subject_of_review}
						</CustomerCardText>
						<HorizontalDivider />
						<CustomerReviewCardTopData modal={'true'}>
							<CustomerCardText
								type={{
									text: 'cardBody',
								}}
							>
								{toggleModalUser.review_body}
							</CustomerCardText>
						</CustomerReviewCardTopData>
						<CustomerReviewCardBottomData>
							<CustomerReviewCardUserPhoto
								src={`https://robohash.org/${toggleModalUser.full_name}.png?set=any`}
							/>
							<CustomerCardText
								type={{
									text: 'cardUserName',
								}}
							>
								{toggleModalUser.full_name}
							</CustomerCardText>
							<CustomerCardText
								type={{
									text: 'cardUserEmail',
								}}
							>
								{toggleModalUser.email}
							</CustomerCardText>
							<CustomerCardText
								type={{
									text: 'cardUserPhoneNumber',
								}}
							>
								{toggleModalUser.phone_number}
							</CustomerCardText>
							<CustomerCardText
								style={{ zIndex: '100' }}
								type={{
									text: 'cardReadChecker',
								}}
								read={toggleModalUser.state ? 'true' : 'false'}
							></CustomerCardText>
						</CustomerReviewCardBottomData>
					</>
				)}
			</CustomerReviewModal>
			<MainContainer toggle={state.position}>
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
					<CustomerCardText
						type={{
							text: 'cardTitle',
						}}
					>
						Latest Review by Customers
					</CustomerCardText>
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
							<Swiper
								modules={[Navigation, A11y]}
								spaceBetween={0}
								slidesPerView={3}
								navigation
							>
								{initialContactData.map((elem, index) => (
									<SwiperSlide key={index}>
										<CustomerReviewCard
											onClick={() =>
												handleToggleModal(elem)
											}
										>
											<CustomerCardText
												type={{
													text: 'cardSubject',
												}}
											>
												{elem.subject_of_review}
											</CustomerCardText>
											<HorizontalDivider />
											<CustomerReviewCardTopData
												modal={'false'}
											>
												<CustomerCardText
													type={{
														text: 'cardBodyNoModal',
													}}
												>
													{elem.review_body}
												</CustomerCardText>
											</CustomerReviewCardTopData>
											<CustomerReviewCardBottomData>
												<CustomerReviewCardUserPhoto
													src={`https://robohash.org/${elem.full_name}.png?set=any`}
												/>
												<CustomerCardText
													type={{
														text: 'cardUserName',
													}}
												>
													{elem.full_name}
												</CustomerCardText>
												<CustomerCardText
													type={{
														text: 'cardUserEmail',
													}}
												>
													{elem.email}
												</CustomerCardText>
												<CustomerCardText
													type={{
														text: 'cardUserPhoneNumber',
													}}
												>
													{elem.phone_number}
												</CustomerCardText>
												<CustomerCardText
													type={{
														text: 'cardReadChecker',
													}}
													read={elem.isArchived}
												>
													{elem.isArchived ===
													'true' ? (
														<FaRegEnvelopeOpen
														// style={{
														// 	color: `${color.normalOrange}`,
														// }}
														/>
													) : (
														<FaRegEnvelope />
													)}
												</CustomerCardText>
											</CustomerReviewCardBottomData>
										</CustomerReviewCard>
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
				</CustomerReviewContainer>
			</MainContainer>
		</>
	)
}

export default Dashboard

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, 60%);
`

const SpinnerContainerInsideModal = styled.div`
	z-index: 100;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

interface MainContainerProps {
	readonly toggle: string
}

const MainContainer = styled.main<MainContainerProps>`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`
const ContainerCardKPI = styled.div`
	min-width: 100%;
	max-height: 135px;
	flex-shrink: 0;
	white-space: nowrap;
`

const KPICardInfo = styled.div`
	display: inline-block;
	min-width: 340px;
	min-height: 125px;
	margin-right: 38px;
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0px 4px 4px #00000005;
	transition: 0.3s;
	&:hover .icon-square {
		background-color: ${color.normalPinkie};
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
	background-color: ${color.softer_ligthPinkie};
	border-radius: 8px;
	font-size: 35px;
	padding: 15px;
	transition: 0.3s;
	color: ${color.normalPinkie};
`

interface CardTextProps {
	readonly type?: string
}

const CardText = styled.p<CardTextProps>`
	${(props) => {
		switch (props.type) {
			case 'title':
				return css`
					font: normal normal 600 30px/1.2 Poppins;
					color: ${color.strongGrey};
				`
			default:
				return css`
					font: normal normal 300 14px/1.4 Poppins;
					color: ${color.softer_strongGrey};
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
	max-height: 433px;
	min-width: 1494px;
`

const CustomerReviewCard = styled.div`
	cursor: pointer;
	border: 1px solid red;
	position: relative;
	width: 431px;
	min-height: 275px;
	background-color: #fff;
	border: 1px solid ${color.softer_ligthGrey};
	border-radius: 20px;
	margin: 88px 40px 20px 20px;
	transition: 0.3s;
	vertical-align: top;
	&:last-child {
		margin-right: 0px;
	}
	&:hover {
		transform: scale(1.01);
		box-shadow: 0px 16px 30px #00000014;
	}
`

interface CustomerCardTextProps {
	readonly type: { text: string }
	readonly read?: string
}

const CustomerCardText = styled.p<CustomerCardTextProps>`
	${(props) => {
		switch (props.type.text) {
			case 'cardTitle':
				return css`
					font: normal normal 500 20px/1.5 Poppins;
					color: ${color.strongGrey};
					text-align: left;
					position: absolute;
					left: 50px;
					top: 30px;
				`
			case 'cardBody':
				return css`
					font: normal normal 300 16px/1.5 Poppins;
					color: ${color.strongGrey};
					text-align: justify;
				`
			case 'cardBodyNoModal':
				return css`
					font: normal normal 300 16px/1.5 Poppins;
					color: ${color.strongGrey};
					text-align: justify;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
				`
			case 'cardUserName':
				return css`
					font: normal normal 600 16px/1.5 Poppins;
					color: ${color.strongGrey};
					text-align: left;
					margin: 10px 0 5px 0;
				`
			case 'cardSubject':
				return css`
					font: normal normal 500 16px/1.5 Poppins;
					color: ${color.softer_strongPurple};
					text-align: center;
					margin: 5px 0 0 0;
				`
			case 'cardReadChecker':
				return css`
					position: absolute;
					bottom: 0;
					right: 10px;
					font: normal normal 600 26px/1.5 Poppins;
					color: ${props.read === 'true'
						? `${color.softer_normalPurple}`
						: `${color.normalPinkie}`};
					text-align: left;
					transition: 0.3s all;
					&:hover {
						scale: 1.1;
						color: ${props.read === 'true'
							? `${color.normalPurple}`
							: `${color.softer_normalPinkie}`};
					}
				`
			default:
				return css`
					font: normal normal 400 14px/1.5 Poppins;
					color: ${color.softer_strongGrey};
					text-align: left;
				`
		}
	}}
`

interface CustomerReviewCardTopDataProps {
	readonly modal: string
}

const CustomerReviewCardTopData = styled.div<CustomerReviewCardTopDataProps>`
	width: 371px;
	height: ${(props) => (props.modal === 'true' ? 'fitContent' : '110px')};
	overflow-y: auto;
	margin: 10px auto 0 auto;
	scrollbar-width: auto;
	scrollbar-color: #8f54a0 #ffffff;

	/* Webkit-specific styles for scrollbar */
	&::-webkit-scrollbar {
		width: 15px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ebf1ef;
		border-radius: 10px;
		border: 3px solid #ffffff;
	}
`

const CustomerReviewCardBottomData = styled.div`
	position: relative;
	border: 1px solid transparent;
	width: 371px;
	height: 90px;
	margin: 15px auto 25px auto;
`
const CustomerReviewCardUserPhoto = styled.img`
	float: left;
	margin: 18px;
	height: 56px;
	width: 56px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
`

const HorizontalDivider = styled.div`
	width: 230px;
	border-bottom: dashed 1px #ebebeb;
	margin: 5px auto 0 auto;
`

interface CustomerReviewModalProps {
	readonly open: boolean
}

const CustomerReviewModal = styled.div<CustomerReviewModalProps>`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 431px;
	min-height: 275px;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
interface CustomerReviewModalOverlayProps {
	readonly open: boolean
}
const CustomerReviewModalOverlay = styled.div<CustomerReviewModalOverlayProps>`
	z-index: 100;
	position: absolute;
	top: 0px;
	width: 100%;
	height: 100%;
	background-color: ${color.softer_normalGrey};
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const CloseCTA = styled.button`
	z-index: 100;
	position: absolute;
	right: 20px;
	bottom: 13px;
	cursor: pointer;
	width: 50px;
	height: 50px;
	border: none;
	transition: 0.3s all;
	font-size: 25px;
	background-color: white;
	color: ${color.strongPurple};
	&:hover {
		scale: 1.1;
		color: ${color.normalPurple};
	}
`
