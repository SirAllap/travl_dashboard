import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo_dashboard1.png'
import { authenticationContext } from '../context/AutheContext'
import { useNavigate } from 'react-router-dom'
import * as color from '../components/Variables'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Triangle } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { userLogin } from '../features/login/loginThunks'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { initialLoginState, resetState } from '../features/login/loginSlice'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [spinner, setSpinner] = useState(false)
	const { login, authState } = useContext(authenticationContext)!
	const dispatch = useAppDispatch()
	const loginInitialState = useAppSelector(initialLoginState)
	useEffect(() => {
		if (authState.auth) {
			navigate('/')
		} else {
			navigate('/login')
		}
		if (loginInitialState === 'fulfilled') {
			login({
				userName: userEmail,
				email: getUserEmail(userEmail),
				profilePicture: getProfilePicture(userEmail),
			})
			dispatch(resetState())
		}
	}, [authState.auth, navigate, loginInitialState])

	const getUserEmail = (name: string) => {
		return name === userEmail ? 'super@admin.com' : 'davidpr@travl.com'
	}
	const getProfilePicture = (name = 'admin') => {
		return `https://robohash.org/${name}.png?set=any`
	}

	const authUser = async () => {
		dispatch(userLogin({ email: userEmail, password: userPassword }))
	}

	const [quick, setQuick] = useState(false)
	const quickLogin = () => {
		setQuick(true)
		setUserEmail('dpr@gmail.com')
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
					<LoginInputLable>User</LoginInputLable>
					<LoginInput
						data-cy='input-user'
						defaultValue={quick ? 'dpr@gmail.com' : ''}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
					<LoginInputLable>Password</LoginInputLable>
					<LoginInput
						data-cy='input-password'
						defaultValue={quick ? 'ilovebaguettes' : ''}
						type='password'
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<CTAXtra
						onClick={quickLogin}
						data-cy='xtraquick-login-button'
					>
						XtraQuick - LOGIN
					</CTAXtra>
					<CTA data-cy='trigger-login-button' onClick={authUser}>
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
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme='light'
			/>
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
	font-size: 17px;
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
