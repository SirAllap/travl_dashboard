import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Table = (props) => {
	const displayRow = (row) => (
		<React.Fragment key={row.id}>
			{props.whoAmI.redirect ? (
				<NavLink
					style={{ textDecoration: 'none' }}
					to={`/${props.whoAmI.name}/${row.id}`}
				>
					<TableSingleRowContainer whoami={props.whoAmI.name}>
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
					</TableSingleRowContainer>
				</NavLink>
			) : (
				<TableSingleRowContainer whoami={props.whoAmI.name}>
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
				</TableSingleRowContainer>
			)}
		</React.Fragment>
	)
	return (
		<>
			<TableData>
				<TableHeadContainer>
					<TableHeadLable>
						{props.cols.map((colLable) => (
							<p key={colLable.property}>{colLable.label}</p>
						))}
					</TableHeadLable>
				</TableHeadContainer>
				<TableAllRowsContainer>
					{props.datas.map(displayRow)}
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

const TableHeadLable = styled.div`
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
		width: calc(1494px / 5);
		color: #393939;
		font: 300 16px Poppins;
	}
`

const TableSingleRowContainer = styled.div`
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

const VerticalDivider = styled.div`
	height: 100%;
	border-left: solid 1px #ebebeb;
	&:last-child {
		display: none;
	}
`
