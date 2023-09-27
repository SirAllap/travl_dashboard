import React from 'react'
import styled from 'styled-components'

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
	/* background-color: papayawhip; */
`

const TableHeadLable = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 65px;
	border-bottom: 2px solid #f5f5f5;
	p {
		width: 200px;
		font: 600 18px Poppins;
		text-align: left;
		color: #393939;
		margin-left: 10px;
		&:first-child {
			margin-left: 20px;
			width: 300px;
		}
		&:nth-child(5) {
			width: 600px;
		}
		&:last-child {
			margin-right: 10px;
		}
	}
`

const TableAllRowsContainer = styled.div`
	min-width: 100%;
	height: 605px;
	/* background-color: #66339927; */
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
		border: 1px solid red;
		width: 200px;
		text-align: left;
		color: #393939;
		font: 300 16px Poppins;
		margin-left: 10px;
		&:first-child {
			margin-left: 20px;
			width: 300px;
		}
		&:nth-child(5) {
			width: 600px;
		}
	}
`

const TableSingleRowContainer = styled.div`
	border-bottom: 1px solid #f5f5f5;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin: 0;
	height: 121px;
	transition: 0.3s all;
	&:hover  {
		box-shadow: 0px 4px 30px #0000001a;
	}
`

const Table = ({ datas, dataFunc, cols }) => {
	const displayRow = (row) => (
		<TableSingleRowContainer key={row.id}>
			{cols.map((col) => (
				<p key={col.property}>
					{col.datas ? dataFunc(row) : row[col.property]}
				</p>
			))}
		</TableSingleRowContainer>
	)

	return (
		<>
			<TableData>
				<TableHeadContainer>
					<TableHeadLable>
						{cols.map((colLable) => (
							<p key={colLable.property}>{colLable.label}</p>
						))}
					</TableHeadLable>
				</TableHeadContainer>
				<TableAllRowsContainer>
					{datas.map(displayRow)}
				</TableAllRowsContainer>
			</TableData>
		</>
	)
}

export default Table
