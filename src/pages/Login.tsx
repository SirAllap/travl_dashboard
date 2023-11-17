import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo_dashboard1.png'
import { authenticationContext } from '../context/AutheContext'
import { useNavigate } from 'react-router-dom'
import * as color from '../components/Variables'
import { Triangle } from 'react-loader-spinner'
import { userLogin } from '../features/login/loginThunks'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
	initialLoginState,
	resetState,
	selectLoginInfo,
} from '../features/login/loginSlice'
import Swal from 'sweetalert2'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [spinner, setSpinner] = useState(false)
	const { login, authState } = useContext(authenticationContext)!
	const dispatch = useAppDispatch()
	const loginInitialState = useAppSelector(initialLoginState)
	const loginInfo = useAppSelector(selectLoginInfo)

	useEffect(() => {
		if (authState.auth) {
			navigate('/')
		} else {
			navigate('/login')
		}
		if (loginInitialState === 'rejected') {
			Swal.fire({
				icon: 'error',
				iconColor: `${color.normalPinkie}`,
				title: 'Oops...',
				text: 'Incorrect credentials!',
				confirmButtonColor: `${color.normalPurple}`,
				confirmButtonText: 'Try Again',
			}).then((result) => {
				if (result.isConfirmed) {
					dispatch(resetState())
					setSpinner(false)
				}
			})
		}
		if (loginInitialState === 'pending') {
			setSpinner(true)
		}
		if (loginInitialState === 'fulfilled') {
			login({
				userName: loginInfo.name,
				email: loginInfo.email,
				profilePicture: loginInfo.photo,
				role: loginInfo.role,
			})
			dispatch(resetState())
		}
	}, [authState.auth, navigate, loginInitialState])

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			authUser()
		}
	}
	const authUser = async () => {
		dispatch(userLogin({ email: userEmail, password: userPassword }))
	}

	const [quick, setQuick] = useState(false)
	const quickLogin = () => {
		setQuick(true)
		setUserEmail('david.pr.developer@gmail.com')
		setUserPassword('ilovebaguettes')
	}

	return (
		<>
			<MainContainer>
				<LoginContainer>
					<LogoSection>
						<LogoImage
							src={logo}
							alt='a logo of the hotel dashboard'
						/>
					</LogoSection>
					<LoginInputLable>Email</LoginInputLable>
					<LoginInput
						data-cy='input-user'
						defaultValue={
							quick ? 'david.pr.developer@gmail.com' : ''
						}
						onChange={(e) => setUserEmail(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
					<LoginInputLable>Password</LoginInputLable>
					<LoginInput
						data-cy='input-password'
						defaultValue={quick ? 'ilovebaguettes' : ''}
						type='password'
						onChange={(e) => setUserPassword(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
					<CTAXtra
						onClick={quickLogin}
						data-cy='xtraquick-login-button'
					>
						XtraQuick - LOGIN
					</CTAXtra>
					<CTA
						data-cy='trigger-login-button'
						onClick={authUser}
						tabIndex={0}
					>
						{spinner ? (
							<div
								style={{
									position: 'absolute',
									top: '0',
									left: '50%',
									transform: 'translate(-50%, 10%)',
								}}
							>
								<Triangle
									height='40'
									width='40'
									color={color.normalPurple}
									ariaLabel='triangle-loading'
									visible={true}
								/>
							</div>
						) : (
							'Log in'
						)}
					</CTA>
				</LoginContainer>
			</MainContainer>
		</>
	)
}

export default Login

const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const LoginContainer = styled.div`
	border: 2px solid ${color.ligthPurple};
	padding-top: 40px;
	border-radius: 8px;
	background-color: #f8f8f8;
	width: 500px;
	height: 620px;
	/* margin: auto; */
`

const LogoSection = styled.section`
	height: fit-content;
	width: fit-content;
	text-align: center;
	margin: 0 auto 20px auto;
`

const LogoImage = styled.img`
	width: 150px;
	object-fit: contain;
`

const LoginInput = styled.input`
	width: 86%;
	height: 47px;
	margin: 5px 35px 35px 35px;
	background-color: ${color.softerPLus_ligthPurple};
	border: none;
	border-radius: 8px;
	color: #000;
	color: ${color.strongPurple};
	padding: 10px;
	font: normal normal 500 17px Poppins;
	outline: 2px solid ${color.ligthPurple};
	transition: 0.3s;
`

const LoginInputLable = styled.label`
	font: normal normal 500 17px Poppins;
	display: block;
	color: ${color.normalPinkie};
	margin-left: 40px;
`

const CTA = styled.button`
	position: relative;
	width: 86%;
	height: 47px;
	margin: 0px 35px 35px 35px;
	background-color: ${color.normalPinkie};
	border: none;
	border-radius: 8px;
	color: #fff;
	font: normal normal 600 14px/21px Poppins;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ffffff;
		background-color: ${color.softer_normalPinkie};
	}
`
const CTAXtra = styled(CTA)`
	width: 86%;
	height: 47px;
	background-color: ${color.normalPurple};
	border: none;
	outline: none;
	border-radius: 8px;
	color: #fff;
	font: normal normal 600 14px/21px Poppins;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ffffff;
		background-color: ${color.softer_normalPurple};
		outline: none;
	}
`
