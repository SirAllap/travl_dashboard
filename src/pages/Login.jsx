import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo_dashboard.png'
import { FiCopy } from 'react-icons/fi'
import { authenticationContext } from '../context/authenticationContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const { login, authState } = useContext(authenticationContext)

	useEffect(() => {
		if (authState.auth) {
			navigate('/')
		} else {
			navigate('/login')
		}
	}, [authState.auth, navigate])

	const getUserEmail = (name) => {
		return name === 'Admin' ? 'super@admin.com' : 'davidpr@travl.com'
	}
	const getProfilePicture = (name) => {
		return `https://robohash.org/${name}.png?set=any`
	}

	const authUser = () => {
		if (userName === 'Admin' && userPassword === 'oxygen') {
			login({
				userName,
				email: getUserEmail(userName),
				profilePicture: getProfilePicture(userName),
			})
		} else if (userName === 'David' && userPassword === 'travl') {
			login({
				userName,
				email: getUserEmail(userName),
				profilePicture: getProfilePicture(userName),
			})
		} else {
			alert('You introduce wrong credentials')
		}
	}

	const copyAdmin = 'Admin'
	const copyAdminPass = 'oxygen'
	const copyUser = 'David'
	const copyUserPass = 'travl'

	const [quick, setQuick] = useState(false)
	const quickLogin = () => {
		setQuick(true)
		setUserName('Admin')
		setUserPassword('oxygen')
	}

	return (
		<>
			<LogoSection>
				<LogoImage src={logo} alt='a logo of the hotel dashboard' />
			</LogoSection>
			<LoginContainer>
				<LoginInputLable>User</LoginInputLable>
				<LoginInput
					data-cy='input-user'
					defaultValue={quick ? 'Admin' : ''}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<LoginInputLable>Password</LoginInputLable>
				<LoginInput
					data-cy='input-password'
					defaultValue={quick ? 'oxygen' : ''}
					type='password'
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<CTAXtra onClick={quickLogin} data-cy='xtraquick-login-button'>
					XtraQuick - LOGIN
				</CTAXtra>
				<CTA data-cy='trigger-login-button' onClick={authUser}>
					Log in
				</CTA>
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
	margin: 0px 35px 35px 35px;
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
const CTAXtra = styled(CTA)`
	width: 86%;
	height: 47px;
	background-color: #8400ff;
	border: none;
	outline: none;
	border-radius: 8px;
	color: #fff;
	font: normal normal 600 14px/21px Poppins;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ffffff;
		background-color: #8400ff7a;
		outline: none;
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
