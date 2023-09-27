import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo_dashboard.png'
import { FiCopy } from 'react-icons/fi'

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
	height: 440px;
`

const LogoSection = styled.section`
	height: fit-content;
	width: fit-content;
	text-align: center;
	margin: 50px auto;
`

const LogoImage = styled.img`
	min-width: 320px;
	object-fit: contain;
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
	margin: 75px 35px 35px 35px;
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

const Credentials = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: fit-content;
	max-height: fit-content;
`
const LoginHardCodeAuth = styled.p`
	font: normal normal 500 22px Poppins;
	color: #135846;
	margin-left: 40px;
	padding-bottom: 20px;
	&:nth-child(2) {
		margin-bottom: 60px;
	}
`

// const Login = (props) => {
const Login = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')

	const adminUser = {
		userName: 'Admin',
		email: 'super@admin.com',
	}
	const davidUser = {
		userName: 'David',
		email: 'davidpr@travl.com',
	}

	const authUser = () => {
		if (userName === 'Admin') {
			if (userPassword === 'oxygen') {
				localStorage.setItem('currentUser', JSON.stringify(adminUser))
				localStorage.setItem('authenticated', true)
				navigate('/')
			}
		} else if (userName === 'David') {
			if (userPassword === 'travl') {
				localStorage.setItem('currentUser', JSON.stringify(davidUser))
				localStorage.setItem('authenticated', true)
				navigate('/')
			}
		} else {
			alert('You introduce wrong credentials')
		}
	}

	const copyAdmin = 'Admin'
	const copyAdminPass = 'oxygen'
	const copyUser = 'David'
	const copyUserPass = 'travl'

	return (
		<>
			<LogoSection>
				<LogoImage src={logo} alt='a logo of the hotel dashboard' />
			</LogoSection>
			<LoginContainer>
				<LoginInputLable>User</LoginInputLable>
				<LoginInput onChange={(e) => setUserName(e.target.value)} />
				<LoginInputLable>Password</LoginInputLable>
				<LoginInput
					type='password'
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<CTA onClick={authUser}>Log in</CTA>
			</LoginContainer>
			<Credentials>
				<LoginHardCodeAuth>
					User: Admin{' '}
					<FiCopy
						onClick={() => {
							navigator.clipboard.writeText(copyAdmin)
						}}
						style={{ cursor: 'pointer', fontSize: '35px' }}
					/>
				</LoginHardCodeAuth>
				<LoginHardCodeAuth>
					Password: oxygen{' '}
					<FiCopy
						onClick={() => {
							navigator.clipboard.writeText(copyAdminPass)
						}}
						style={{ cursor: 'pointer', fontSize: '35px' }}
					/>
				</LoginHardCodeAuth>
				<LoginHardCodeAuth>
					User: David{' '}
					<FiCopy
						onClick={() => {
							navigator.clipboard.writeText(copyUser)
						}}
						style={{
							cursor: 'pointer',
							fontSize: '35px',
						}}
					/>
				</LoginHardCodeAuth>
				<LoginHardCodeAuth>
					Password: travl{' '}
					<FiCopy
						onClick={() => {
							navigator.clipboard.writeText(copyUserPass)
						}}
						style={{ cursor: 'pointer', fontSize: '35px' }}
					/>
				</LoginHardCodeAuth>
			</Credentials>
		</>
	)
}

export default Login
