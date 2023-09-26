import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LoginContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	border: 2px solid #79928362;
	padding-top: 40px;
	border-radius: 8px;
	background-color: #f8f8f8;
	width: 500px;
	height: 460px;
`

const LoginInput = styled.input`
	width: 86%;
	height: 47px;
	margin: 5px 35px 35px 35px;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #000;
	color: #135846;
	padding: 10px;
	font-size: 17px;
	outline: 2px solid #79928362;
	transition: 0.3s;
`

const LoginInputLable = styled.label`
	font: normal normal 500 17px Poppins;
	display: block;
	color: #135846;
	margin-left: 40px;
`

const CTA = styled.button`
	width: 86%;
	height: 47px;
	margin: 10px 35px 35px 35px;
	background-color: #f8a756;
	border: none;
	outline: 2px solid #ff9c3a;
	border-radius: 8px;
	color: #fff;
	font: normal normal 600 14px/21px Poppins;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #799283;
		background-color: #fb9f4498;
		outline: 2px solid #fb9f4498;
	}
`

const LoginHardCodeAuth = styled.p`
	font: normal normal 500 17px Poppins;
	color: #135846;
	margin-left: 40px;
	padding-bottom: 10px;
`

// const Login = (props) => {
const Login = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')

	const authUser = () => {
		if ((userName === 'dpr') & (userPassword === '123')) {
			localStorage.setItem('authenticated', true)
			navigate('/')
		} else {
			return alert('nain')
		}
	}
	return (
		<>
			<LoginContainer>
				<LoginInputLable>User</LoginInputLable>
				<LoginInput onChange={(e) => setUserName(e.target.value)} />
				<LoginInputLable>Password</LoginInputLable>
				<LoginInput
					type='password'
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<CTA onClick={authUser}>Log in</CTA>
				<LoginHardCodeAuth>- User : * dpr *</LoginHardCodeAuth>
				<LoginHardCodeAuth>- Password : * 123 *</LoginHardCodeAuth>
			</LoginContainer>
		</>
	)
}

export default Login
