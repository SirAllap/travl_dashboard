import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Table from '../components/Table'
import { supertoggleContext } from '../context/ToggleContext'
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
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import * as color from '../components/Variables'

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
					<TextFormatter text_type='name'>{date}</TextFormatter>
					<TextFormatter text_type='small'>{dateTime}</TextFormatter>
					<TextFormatter text_type='small'>#{id}</TextFormatter>
				</>
			),
		},
		{
			property: 'full_name',
			label: 'Customer',
			display: ({ full_name }) => (
				<>
					<TextFormatter text_type='customer-name'>
						{full_name}
					</TextFormatter>
				</>
			),
		},
		{
			property: 'subject_of_review',
			label: 'Subject',
		},
		{
			property: 'review_body',
			label: 'Comment',
			display: ({ review_body }) => (
				<>
					<TextFormatter text_type='comment'>
						{review_body}
					</TextFormatter>
				</>
			),
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'All Contact' &&
										`${color.softer_strongPurple}`,
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'true' &&
										`${color.softer_strongPurple}`,
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
										`3px solid ${color.softer_strongPurple}`,
									color:
										filter.value === 'false' &&
										`${color.softer_strongPurple}`,
								}}
							>
								Non Archived
							</button>
						</Tabs>
					</TableTabsContainer>
					<TableSearchAndFilterContainer></TableSearchAndFilterContainer>
				</TopTableContainer>
				<Table
					cols={cols}
					datas={initialContactData}
					whoAmI={whoAmI}
					filter={filter}
					spinner={archiveSpinner}
					loadingSpinner={spinner}
				/>
			</MainContainer>
		</>
	)
}

export default Contact

const MainContainer = styled.main`
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const TopTableContainer = styled.div`
	min-width: 100%;
	margin-top: 20px;
	max-height: 40px;
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
		transition: 0.3s all;
		cursor: pointer;
		&:hover {
			border-bottom: 3px solid ${color.strongPurple};
			color: ${color.strongPurple};
		}
	}
`

const TextFormatter = styled.span`
	text-align: ${(props) =>
		props.text_type === 'comment' && 'justify !important'};
	padding: ${(props) =>
		props.text_type === 'comment' && '15px 10px 15px 10px'};
	display: block;
	text-align: center;
	color: ${(props) =>
		props.text_type === 'small'
			? `${color.softer_strongGrey}`
			: `${color.strongGrey}`};
	font: ${(props) =>
		props.text_type === 'small'
			? '300 13px Poppins'
			: props.text_type === 'customer-name'
			? '600 18px Poppins'
			: '400 16px Poppins'};
	margin: 10px;
`

const Status = styled.button`
	font: 600 16px Poppins;
	width: 109px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) =>
		props.status === 'true'
			? `${color.normalPinkie}`
			: `${color.softer_strongGrey}`};
	background-color: ${color.softer_ligthGrey};
	cursor: ${(props) => (props.status === 'true' ? 'none' : 'pointer')};
	transition: 0.3s all;
	&:hover {
		background-color: ${(props) =>
			props.status === 'false'
				? `${color.ligthGrey}`
				: `${color.softer_ligthGrey}`};
		scale: ${(props) => (props.status === 'true' ? 'none' : '1.05')};
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
	height: 160px;
	min-width: 1494px;
`

const CustomerReviewCard = styled.div`
	position: relative;
	width: 431px;
	height: 140px;
	background-color: #fff;
	border: 1px solid ${color.softer_ligthGrey};
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
					color: ${color.strongGrey};
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
					color: ${color.strongGrey};
					text-align: justify;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				`
			case 'cardUserName':
				return css`
					font: normal normal 600 16px Poppins;
					color: ${color.strongGrey};
					text-align: left;
					margin: 10px 0 5px 0;
				`
			case 'cardSubject':
				return css`
					font: normal normal 500 16px Poppins;
					color: ${color.softer_strongPurple};
					text-align: center;
					margin: 5px 0 0px 0;
				`
			default:
				return css`
					font: normal normal 400 14px Poppins;
					color: ${color.softer_strongGrey};
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
