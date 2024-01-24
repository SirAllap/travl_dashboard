import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Triangle } from 'react-loader-spinner'
import * as color from './Variables'
import {
	IBooking,
	IContact,
	IRoom,
	IUser,
} from '../features/interfaces/interfaces'

const Table = (props: {
	cols: any
	datas: IBooking[] | IRoom[] | IUser[] | IContact[]
	whoAmI: { name: string; redirect: boolean }
	filter: { property: string; value: string }
	spinner: boolean
	loadingSpinner: boolean
}) => {
	const [filterToApply, setFilterToApply] = useState({
		property: 'all',
		value: '',
	})
	const [noMoreData, setNoMoreData] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	let property = 'all'
	let value = ''

	if (filterToApply) {
		property = filterToApply.property
		value = filterToApply.value
	}

	useEffect(() => {
		setFilterToApply(props.filter)
		setCurrentPage(1)
		props.datas.length === 0 ? setNoMoreData(true) : setNoMoreData(false)
	}, [props.filter, props.datas.length])

	const filteredData =
		property === 'all'
			? props.datas
			: props.datas.filter((row) => (row as any)[property] === value)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

	const displayRow = (row: any, index: number) => {
		const rowContent = (
			<>
				{props.cols.map(
					(
						col: {
							property: string
							label: string
							display?: Function
						},
						i: number
					) => (
						<React.Fragment key={i}>
							<p>
								{typeof col.display === 'function'
									? col.display(row)
									: row[col.property]}
							</p>
							<VerticalDivider />
						</React.Fragment>
					)
				)}
			</>
		)
		const key = `${props.whoAmI.name}-${row.id}-${index}`
		return (
			<TableSingleRowContainer whoami={props.whoAmI.name} key={key}>
				{rowContent}
			</TableSingleRowContainer>
		)
	}

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
	return (
		<>
			<TableData whoami={props.whoAmI.name}>
				{props.loadingSpinner ? (
					<SpinnerContainer whoami={props.whoAmI.name}>
						<Triangle
							height='150'
							width='150'
							color={color.softer_strongPurple}
							ariaLabel='triangle-loading'
							visible={props.loadingSpinner}
						/>
					</SpinnerContainer>
				) : (
					<>
						<TableHeadContainer>
							<TableHeadLabel whoami={props.whoAmI.name}>
								{props.cols.map(
									(
										colLabel: { label: string },
										index: number
									) => (
										<p key={index}>{colLabel.label}</p>
									)
								)}
							</TableHeadLabel>
						</TableHeadContainer>
						<SpinnerContainer whoami={props.whoAmI.name}>
							{noMoreData ? (
								<h1>No more data on the DB!</h1>
							) : (
								<Triangle
									height='150'
									width='150'
									color={color.softer_normalPinkie}
									ariaLabel='triangle-loading'
									visible={props.spinner}
								/>
							)}
						</SpinnerContainer>
						<TableAllRowsContainer whoami={props.whoAmI.name}>
							{currentItems.map((filteredRow, index) =>
								displayRow(filteredRow, index)
							)}
						</TableAllRowsContainer>
					</>
				)}
			</TableData>
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={
					property === 'all'
						? props.datas.length
						: props.datas.filter(
								(row) => (row as any)[property] === value
						  ).length
				}
				currentPage={currentPage}
				paginate={paginate}
			/>
		</>
	)
}
const Pagination = ({
	itemsPerPage,
	totalItems,
	currentPage,
	paginate,
}: PaginationProps) => {
	const pageNumbers: number[] = []

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i)
	}

	const renderPageNumbers = () => {
		const maxPagesToShow = 3
		const pages = []

		if (pageNumbers.length <= maxPagesToShow) {
			return pageNumbers.map((number) => (
				<PaginationItem
					key={number}
					onClick={() => paginate(number)}
					active={number === currentPage}
				>
					{number}
				</PaginationItem>
			))
		}

		// Show first 3 pages
		for (let i = 1; i <= maxPagesToShow; i++) {
			pages.push(
				<PaginationItem
					key={i}
					onClick={() => paginate(i)}
					active={i === currentPage}
				>
					{i}
				</PaginationItem>
			)
		}

		// Show arrow to navigate left
		pages.push(
			<PaginationItem
				key='left-arrow'
				onClick={() => paginate(currentPage - 1)}
				active={false}
			>
				{'<'}
			</PaginationItem>
		)

		// Show ellipses
		pages.push(
			<PaginationItem key='ellipsis' onClick={() => {}} active={false}>
				...
			</PaginationItem>
		)

		// Show arrow to navigate right
		pages.push(
			<PaginationItem
				key='right-arrow'
				onClick={() => paginate(currentPage + 1)}
				active={false}
			>
				{'>'}
			</PaginationItem>
		)

		// Show the last page
		pages.push(
			<PaginationItem
				key={pageNumbers.length}
				onClick={() => paginate(pageNumbers.length)}
				active={pageNumbers.length === currentPage}
			>
				{pageNumbers.length}
			</PaginationItem>
		)

		return pages
	}

	return <PaginationContainer>{renderPageNumbers()}</PaginationContainer>
}

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
`

interface PaginationItemProps {
	active: boolean
}

const PaginationItem = styled.div<PaginationItemProps>`
	margin: 0 5px;
	padding: 5px 10px;
	cursor: pointer;
	${(props) =>
		props.active &&
		css`
			background-color: #007bff;
			color: #fff;
		`}
`

export default Table

interface PaginationProps {
	itemsPerPage: number
	totalItems: number
	currentPage: number
	paginate: (pageNumber: number) => void
}

interface TableDataProps {
	readonly whoami: string
}

const TableData = styled.div<TableDataProps>`
	position: relative;
	outline: 1px solid white;
	transition: 0.3s all;
	background-color: ${color.clearBackground};
	width: 100%;
	max-height: 100%;
	margin: 30px auto 0 auto;
	border-radius: 20px 20px 0px 20px;
`
const TableHeadContainer = styled.div`
	min-width: 100%;
	height: 65px;
	border-radius: 20px 20px 0 0;
`

interface TableHeadLabelProps {
	readonly whoami: string
}

const TableHeadLabel = styled.div<TableHeadLabelProps>`
	transition: 0.3s all;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 65px;
	border-bottom: 2px solid #f5f5f5;
	p {
		width: ${(props) =>
			props.whoami === 'contact'
				? 'calc(1494px / 4)'
				: 'calc(1494px / 5)'};
		font: 600 18px Poppins;
		color: #393939;
		&:last-child {
			margin-right: 10px;
		}
		&:first-child {
			min-width: 300px;
		}
	}
`

interface TableAllRowsContainerProps {
	readonly whoami: string
}

const TableAllRowsContainer = styled.div<TableAllRowsContainerProps>`
	transition: 0.3s all;
	position: relative;
	min-width: 100%;
	min-height: ${(props) => (props.whoami === 'contact' ? '485px' : '605px')};
	max-height: ${(props) => (props.whoami === 'contact' ? '56vh' : '60dvh')};
	border-radius: 0 0 0 20px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 10px;
		background-color: #ebf1ef;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
		background-color: rgba(102, 51, 153, 0.153);
	}
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
		border-radius: 2px;
		background-color: rgba(235, 241, 239, 0.612);
	}
	p {
		width: ${(props) =>
			props.whoami === 'contact'
				? 'calc(1494px / 4)'
				: 'calc(1494px / 5)'};
		color: #393939;
		font: 300 16px Poppins;
		&:first-child {
			min-width: 300px;
		}
	}
`

interface SpinnerContainerProps {
	readonly whoami: string
}

const SpinnerContainer = styled.div<SpinnerContainerProps>`
	transition: 0.3s all;
	z-index: 100;
	${(props) => {
		switch (props.whoami) {
			case 'contact':
				return css`
					position: absolute;
					right: 40%;
					top: 50%;
					transform: translate(-50%, +150%);
				`
			default:
				return css`
					position: absolute;
					left: 50%;
					top: 100%;
					transform: translate(-50%, +250%);
				`
		}
	}}
`

interface TableSingleRowContainerProps {
	readonly whoami: string
}

const TableSingleRowContainer = styled.div<TableSingleRowContainerProps>`
	transition: 0.3s all;
	border-bottom: 2px solid #f5f5f5;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	&:hover {
		box-shadow: 0px 4px 30px #0000001a;
	}
	height: ${(props) =>
		props.whoami === 'rooms'
			? '250px'
			: props.whoami === 'contact'
			? 'auto'
			: '121px'};
	transition: 0.3s all;
	margin: 0;
`

const VerticalDivider = styled.div`
	transition: 0.3s all;
	height: 100%;
	border-left: solid 1px #ebebeb;
	&:last-child {
		display: none;
	}
`
