import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Triangle } from 'react-loader-spinner'
import * as color from './Variables'
import { IBooking, IContact, IRoom, IUser } from '../features/interfaces/interfaces';

const Table = (props: { cols: any, datas: IBooking[] | IRoom[] | IUser[] | IContact[], whoAmI: {name: string, redirect: boolean}, filter: {property: string, value: string,}, spinner: boolean, loadingSpinner: boolean}) => {
	const [filterToApply, setFilterToApply] = useState({property: 'all', value: ''})
	const [noMoreData, setNoMoreData] = useState(false)
	let property = 'all'
	let value = ''

	if (filterToApply) {
		property = filterToApply.property
		value = filterToApply.value
	}

	useEffect(() => {
		setFilterToApply(props.filter)
		props.datas.length === 0 ? setNoMoreData(true) : setNoMoreData(false)
	}, [props.filter, props.datas.length])

	const displayRow = (row: any, index: number) => {
		const rowContent = (
			<>
				{props.cols.map((col: {property: string, label: string, display?: Function}, i: number) => (
					<React.Fragment key={i}>
						<p>
							{typeof col.display === 'function'
								? col.display(row)
								: row[col.property]}
						</p>
						<VerticalDivider />
					</React.Fragment>
				))}
			</>
		)
		const key = `${props.whoAmI.name}-${row.id}-${index}`
		return (
			<TableSingleRowContainer whoami={props.whoAmI.name} key={key}>
				{rowContent}
			</TableSingleRowContainer>
		)
	}

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
								{props.cols.map((colLabel: {label: string}, index: number) => (
									<p key={index}>{colLabel.label}</p>
								))}
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
						<TableAllRowsContainer
							whoami={props.whoAmI.name}
						>
							{property === 'all'
								? props.datas.map((filteredRow, index) =>
										displayRow(filteredRow, index)
								  )
								: props.datas
										.filter(
											(row) => (row as any)[property] === value
										)
										.map((filteredRow, index) =>
											displayRow(filteredRow, index)
										)}
						</TableAllRowsContainer>
					</>
				)}
			</TableData>
		</>
	)
}

export default Table

interface TableDataProps {
	readonly whoami: string
}

const TableData = styled.div<TableDataProps>`
	transition: 0.3s all;
	position: relative;
	background-color: #fff;
	min-width: 1494px;
	max-width: 1894px;
	height: ${(props) => (props.whoami === 'contact' ? '550px' : '670px')};
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
	height: 550px;
	min-width: 100%;
	height: ${(props) => (props.whoami === 'contact' ? '485px' : '605px')};
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
					transform: translate(-50%, -50%);
				`
			default:
				return css`
					position: absolute;
					left: 50%;
					bottom: 30%;
					transform: translate(-50%, -50%);
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
	height: ${(props) => props.whoami === 'rooms' ? '250px' : props.whoami === 'contact' ? 'auto' : '121px' };
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
