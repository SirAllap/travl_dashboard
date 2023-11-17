import React, { useState } from 'react'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'
import AuthenticationContextProvider from './context/AutheContext'
import styled from 'styled-components'
import ToggleContext from './context/ToggleContext'
import * as color from './components/Variables'

const App: React.FC = () => {
	const [appColorMode, setAppColoMode] = useState<boolean>(true)
	return (
		<>
			<AuthenticationContextProvider>
				<ToggleContext>
					<AppContainer appMode={appColorMode}>
						<SideBar />
						<Header />
						<Routes />
					</AppContainer>
				</ToggleContext>
			</AuthenticationContextProvider>
		</>
	)
}
interface AppContainerProps {
	readonly appMode: boolean
}
const AppContainer = styled.div<AppContainerProps>`
	min-width: 1920px;
	min-height: 100vh;
	background-color: ${(props) =>
		props.appMode === true
			? `${color.clearAppBackground}`
			: `${color.darkAppBackground}`};
`
export default App
