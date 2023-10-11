import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Table from '../components/Table'
import { supertoggleContext } from '../context/supertoggleContext'
import { useDispatch, useSelector } from 'react-redux'
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
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Contact = () => {
	const dispatch = useDispatch()
	const initialContactData = useSelector(initialContacts)
	const initialContactState = useSelector(fetchContactState)
	const archiveCurrentStatus = useSelector(archiveStatus)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(true)
	const [archiveSpinner, setArchiveSpinner] = useState(false)

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
		}
	}, [initialContactState, archiveCurrentStatus])

	const whoAmI = {
		name: 'contact',
		redirect: false,
	}

	const handleArchive = (id) => {
		dispatch(archiveContacts(id))
	}

	const cols = [
		{
			property: 'id',
			label: 'Date',
			display: ({ date, dateTime, id }) => (
				<>
					<TextFormatter name='name'>{date}</TextFormatter>
					<TextFormatter small='small'>{dateTime}</TextFormatter>
					<TextFormatter small='small'>#{id}</TextFormatter>
				</>
			),
		},
		{
			property: 'full_name',
			label: 'Customer',
		},
		{
			property: 'subject_of_review',
			label: 'Subject',
		},
		{
			property: 'review_body',
			label: 'Comment',
		},
		{
			property: 'isArchived',
			label: 'Archive',
			display: ({ isArchived, id }) => (
				<>
					<Status
						onClick={() => {
							handleArchive(id)
						}}
						status={isArchived}
					>
						Archived
					</Status>
				</>
			),
		},
	]

	const [filter, setFilter] = useState({
		property: 'all',
		value: 'All Contact',
	})
	const manageFilterTab = (param) => {
		switch (param) {
			case 'nonarchived':
				setFilter({
					property: 'isArchived',
					value: 'false',
				})
				break
			case 'archived':
				setFilter({
					property: 'isArchived',
					value: 'true',
				})
				break
			case 'all':
				setFilter({
					property: 'all',
					value: 'All Contact',
				})
				break
			default:
				break
		}
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<CustomerCardText
					type={{
						text: 'cardTitle',
					}}
				>
					Latest Review by Customers
				</CustomerCardText>
				<CustomerReviewContainer>
					{spinner ? (
						<br />
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
										<CustomerReviewCard>
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
														text: 'cardBody',
													}}
												>
													{elem.review_body}
												</CustomerCardText>
											</CustomerReviewCardTopData>
										</CustomerReviewCard>
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
				</CustomerReviewContainer>
				<TopTableContainer>
					<TableTabsContainer>
						<Tabs>
							<button
								onClick={() => {
									manageFilterTab('all')
								}}
								style={{
									borderBottom:
										filter.value === 'All Contact' &&
										'3px solid #135846',
									color:
										filter.value === 'All Contact' &&
										'#135846',
								}}
							>
								All Contact
							</button>
							<button
								onClick={() => {
									manageFilterTab('archived')
								}}
								style={{
									borderBottom:
										filter.value === 'true' &&
										'3px solid #135846',
									color: filter.value === 'true' && '#135846',
								}}
							>
								Archived
							</button>
							<button
								onClick={() => {
									manageFilterTab('nonarchived')
								}}
								style={{
									borderBottom:
										filter.value === 'false' &&
										'3px solid #135846',
									color:
										filter.value === 'false' && '#135846',
								}}
							>
								Non Archived
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer></TableSearchAndFilterContainer>
				</TopTableContainer>
				{spinner ? (
					<SpinnerContainer>
						<Triangle
							height='150'
							width='150'
							color='#135846'
							ariaLabel='triangle-loading'
							wrapperClassName=''
							visible={spinner}
						/>
					</SpinnerContainer>
				) : (
					<Table
						cols={cols}
						datas={initialContactData}
						whoAmI={whoAmI}
						filter={filter}
						spinner={archiveSpinner}
					/>
				)}
			</MainContainer>
		</>
	)
}

export default Contact

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
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

const TopTableContainer = styled.div`
	min-width: 100%;
	max-height: 20px;
`

const TableTabsContainer = styled.div`
	vertical-align: top;
	width: fit-content;
	height: 40px;
	width: 34%;
	margin-right: 10px;
`
const TableSearchAndFilterContainer = styled.div`
	text-align: right;
	position: relative;
	display: inline-block;
	width: 49%;
`

const Tabs = styled.div`
	width: 100%;
	button {
		font: 500 16px Poppins;
		background-color: transparent;
		color: #6e6e6e;
		display: inline-block;
		padding: 13px 30px 6px 30px;
		border-radius: 0 0 3px 3px;
		border: 0;
		border-bottom: 3px solid transparent;
		cursor: pointer;
		&:hover {
			border-bottom: 3px solid green;
			color: #135846;
		}
	}
`

const TextFormatter = styled.span`
	display: block;
	text-align: center;
	color: ${(props) => (props.small === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 16px Poppins'};
`

const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) => (props.status === 'true' ? '#E23428' : '#5AD07A')};
	background-color: #efefef;
	cursor: pointer;
	transition: 0.3s all;
	&:hover {
		background-color: #efefef96;
		scale: 1.05;
	}
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
	height: 200px;
	min-width: 1494px;
`

const CustomerReviewCard = styled.div`
	position: relative;
	width: 431px;
	height: 180px;
	background-color: #fff;
	border: 1px solid #ebebeb;
	border-radius: 20px;
	margin: 10px 40px 20px 20px;
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
const CustomerCardText = styled.p`
	${(props) => {
		switch (props.type.text) {
			case 'cardTitle':
				return css`
					font: normal normal 500 20px Poppins;
					color: #393939;
					text-align: left;
					position: absolute;
					left: 5px;
					top: -40px;
					z-index: 300;
				`
			case 'cardBody':
				return css`
					font: normal normal 300 16px Poppins;
					line-height: 28px;
					color: #4e4e4e;
					text-align: justify;
				`
			case 'cardUserName':
				return css`
					font: normal normal 600 16px Poppins;
					color: #262626;
					text-align: left;
					margin: 10px 0 5px 0;
				`
			case 'cardSubject':
				return css`
					font: normal normal 500 16px Poppins;
					color: #135846;
					text-align: center;
					margin: 5px 0 0px 0;
				`
			case 'cardReadChecker':
				return css`
					position: absolute;
					bottom: 0px;
					right: 10px;
					font: normal normal 600 26px Poppins;
					color: ${(props) =>
						props.read === true ? '#5AD07A' : '#E23428'};
					text-align: left;
				`
			default:
				return css`
					font: normal normal 400 14px Poppins;
					color: #799283;
					text-align: left;
				`
		}
	}}
`

const CustomerReviewCardTopData = styled.div`
	width: 371px;
	height: ${(props) => (props.modal === 'true' ? 'fitConten' : '110px')};
	overflow-y: clip;
	margin: 10px auto 0 auto;
	scrollbar-width: auto;
	scrollbar-color: #8f54a0 #ffffff;
	&::-webkit-scrollbar {
		width: 15px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ebf1ef;
		border-radius: 10px;
		border: 3px solid #ffffff;
	}
`

const HorizontalDivider = styled.div`
	width: 230px;
	border-bottom: dashed 1px #ebebeb;
	margin: 5px auto 0 auto;
`
