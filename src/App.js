import React, { useState } from 'react'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ToggleContext from './context/ToggleContext.jsx'
import AuthenticationContext from './context/AutheContext'

const App = () => {
    const [newBreadCrumb, setNewBreadCrumb] = useState('')
    return (
        <>
            <AuthenticationContext>
                <ToggleContext>
                    <SideBar />
                    <Header newBreadCrumb={newBreadCrumb} />
                    <Routes setNewBreadCrumb={setNewBreadCrumb} />
                </ToggleContext>
            </AuthenticationContext>
        </>
    )
}
export default App
