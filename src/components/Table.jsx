import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

// const Table = (props) => {
// 	const displayRow = (row) => {
// 		const rowContent = (
// 			<>
// 				{props.cols.map((col, i) => (
// 					<React.Fragment key={i}>
// 						<p>
// 							{typeof col.display === 'function'
// 								? col.display(row)
// 								: row[col.property]}
// 						</p>
// 						<VerticalDivider />
// 					</React.Fragment>
// 				))}
// 			</>
// 		)

// 		if (props.whoAmI.redirect) {
// 			return (
// 				<NavLink
// 					style={{ textDecoration: 'none' }}
// 					to={`/${props.whoAmI.name}/${row.id}`}
// 					key={row.id} // Key on the top-level element
// 				>
// 					<TableSingleRowContainer whoami={props.whoAmI.name}>
// 						{rowContent}
// 					</TableSingleRowContainer>
// 				</NavLink>
// 			)
// 		} else {
// 			return (
// 				<TableSingleRowContainer
// 					whoami={props.whoAmI.name}
// 					key={row.id}
// 				>
// 					{rowContent}
// 				</TableSingleRowContainer>
// 			)
// 		}
// 	}

// 	return (
// 		<>
// 			<TableData>
// 				<TableHeadContainer>
// 					<TableHeadLabel>
// 						{props.cols.map((colLabel) => (
// 							<p key={colLabel.property}>{colLabel.label}</p>
// 						))}
// 					</TableHeadLabel>
// 				</TableHeadContainer>
// 				<TableAllRowsContainer>
// 					{props.datas.map(displayRow)}
// 				</TableAllRowsContainer>
// 			</TableData>
// 		</>
// 	)
// }

const Table = (props) => {
	const displayRow = (row, index) => {
		// Use the index parameter for the key
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

		const key = `${props.whoAmI.name}-${row.id}-${index}` // Generate a unique key

		if (props.whoAmI.redirect) {
			return (
				<NavLink
					style={{ textDecoration: 'none' }}
					to={`/${props.whoAmI.name}/${row.id}`}
					key={key}
				>
					<TableSingleRowContainer whoami={props.whoAmI.name}>
						{rowContent}
					</TableSingleRowContainer>
				</NavLink>
			)
		} else {
			return (
				<TableSingleRowContainer whoami={props.whoAmI.name} key={key}>
					{rowContent}
				</TableSingleRowContainer>
			)
		}
	}

	return (
		<>
			<TableData>
				<TableHeadContainer>
					<TableHeadLabel>
						{props.cols.map((colLabel) => (
							<p key={colLabel.property}>{colLabel.label}</p>
						))}
					</TableHeadLabel>
				</TableHeadContainer>
				<TableAllRowsContainer>
					{props.datas.map((row, index) => displayRow(row, index))}
				</TableAllRowsContainer>
			</TableData>
		</>
	)
}

export default Table

const TableData = styled.div`
	background-color: #fff;
	min-width: 1494px;
	height: 670px;
	margin-top: 30px;
	border-radius: 20px 20px 0px 20px;
`
const TableHeadContainer = styled.div`
	min-width: 100%;
	height: 65px;
	border-radius: 20px 20px 0 0;
`

const TableHeadLabel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 65px;
	border-bottom: 2px solid #f5f5f5;
	p {
		width: calc(1494px / 4);
		font: 600 18px Poppins;
		color: #393939;
		&:last-child {
			margin-right: 10px;
		}
	}
`

const TableAllRowsContainer = styled.div`
	min-width: 100%;
	height: 605px;
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
		width: calc(1494px / 4);
		color: #393939;
		font: 300 16px Poppins;
	}
`

const TableSingleRowContainer = styled.div`
	${(props) => {
		switch (props.whoami) {
			case 'contact':
				return css`
					border-bottom: 1px solid #f5f5f5;
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin: 0;
					height: ${(props) =>
						props.whoami === 'rooms'
							? '250px'
							: props.whoami === 'contact'
							? 'fit-content'
							: '121px'};
					transition: 0.3s all;
					&:hover {
						box-shadow: 0px 4px 30px #0000001a;
					}
					:nth-child(7) {
						padding: 20px 0 20px 0;
						text-align: justify;
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
						props.whoami === 'rooms'
							? '250px'
							: props.whoami === 'contact'
							? 'fit-content'
							: '121px'};
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
