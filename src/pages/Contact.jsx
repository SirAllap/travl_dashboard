import React from 'react'
import styled from 'styled-components'

const MainContainer = styled.main`
	border: 5px dashed papayawhip;
	text-align: center;
	min-height: 100%;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const Contact = (props) => {
	return (
		<>
			<MainContainer toggle={props.toggle}>
				<h1>Contact List</h1>
			</MainContainer>
		</>
	)
}

export default Contact
