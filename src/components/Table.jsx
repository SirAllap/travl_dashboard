import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Triangle } from 'react-loader-spinner'

const Table = (props) => {
	const [filterToApply, setFilterToApply] = useState({})
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

	const displayRow = (row, index) => {
		const rowContent = (
			<>
				{props.cols.map((col, i) => (
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
				<TableHeadContainer>
					<TableHeadLabel whoami={props.whoAmI.name}>
						{props.cols.map((colLabel, index) => (
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
							color='red'
							ariaLabel='triangle-loading'
							visible={props.spinner}
						/>
					)}
				</SpinnerContainer>

				<TableAllRowsContainer whoami={props.whoAmI.name}>
					{property === 'all'
						? props.datas.map((filteredRow, index) =>
								displayRow(filteredRow, index)
						  )
						: props.datas
								.filter((row) => row[property] === value)
								.map((filteredRow, index) =>
									displayRow(filteredRow, index)
								)}
				</TableAllRowsContainer>
			</TableData>
		</>
	)
}

export default Table

const TableData = styled.div`
	background-color: #fff;
	min-width: 1494px;
	max-width: 1894px;
	height: ${(props) => (props.whoami === 'contact' ? '550px' : '670px')};
	margin-top: 30px;
	border-radius: 20px 20px 0px 20px;
`
const TableHeadContainer = styled.div`
	min-width: 100%;
	height: 65px;
	border-radius: 20px 20px 0 0;
`

const TableHeadLabel = styled.div`
	${(props) => {
		switch (props.whoami) {
			case 'bookings':
				return css`
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					height: 65px;
					border-bottom: 2px solid #f5f5f5;
					p {
						width: calc(1494px / 5);
						font: 600 18px Poppins;
						color: #393939;
						&:last-child {
							margin-right: 10px;
						}
					}
					:last-child {
						width: 12%;
					}
				`
			case 'rooms':
				return css`
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					height: 65px;
					border-bottom: 2px solid #f5f5f5;
					p {
						width: calc(1494px / 5);
						font: 600 18px Poppins;
						color: #393939;
						&:last-child {
							margin-right: 10px;
						}
					}
					:last-child {
						width: 12%;
					}
				`
			default:
				return css`
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
					}
				`
		}
	}}
`

const TableAllRowsContainer = styled.div`
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
	}
`

const SpinnerContainer = styled.div`
	${(props) => {
		switch (props.whoami) {
			case 'contact':
				return css`
					position: absolute;
					right: 50%;
					top: 70%;
					transform: translate(-50%, -50%);
				`
			default:
				return css`
					position: absolute;
					left: 50%;
					bottom: 50%;
					transform: translate(-50%, -50%);
				`
		}
	}}
`

const TableSingleRowContainer = styled.div`
	${(props) => {
		switch (props.whoami) {
			case 'contact':
				return css`
					border-bottom: 3px solid #f5f5f5;
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin: 0;
					height: auto;
					transition: 0.3s all;
					&:hover {
						box-shadow: 0px 4px 30px #0000001a;
					}
					:nth-child(7) {
						padding: 20px 5px 20px 5px;
						text-align: justify;
					}
				`
			case 'bookings':
				return css`
					border-bottom: 1px solid #f5f5f5;
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin: 0;
					height: 121px;
					transition: 0.3s all;
					&:hover {
						box-shadow: 0px 4px 30px #0000001a;
					}
					:nth-child(15) {
						width: 12%;
					}
				`
			case 'rooms':
				return css`
					border-bottom: 1px solid #f5f5f5;
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin: 0;
					height: 250px;
					transition: 0.3s all;
					&:hover {
						box-shadow: 0px 4px 30px #0000001a;
					}
					:nth-child(13) {
						width: 12%;
					}
				`
			default:
				return css`
					border-bottom: 1px solid #f5f5f5;
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin: 0;
					height: ${(props) =>
						props.whoami === 'rooms' ? '250px' : '121px'};
					transition: 0.3s all;
					&:hover {
						box-shadow: 0px 4px 30px #0000001a;
					}
				`
		}
	}}
`

const VerticalDivider = styled.div`
	height: 100%;
	border-left: solid 1px #ebebeb;
	&:last-child {
		display: none;
	}
`
