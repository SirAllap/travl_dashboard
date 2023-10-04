import React, { useState } from 'react'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ToggleContext from './context/ToggleContext.jsx'
import AuthenticationContext from './context/AutheContext'

const App = () => {
    const [headerTitle, setHeaderTitle] = useState('Dashboard')
    const [profilePicture, setProfilePicture] = useState('Dashboard')
    const [newBreadCrumb, setNewBreadCrumb] = useState('')
    return (
        <>
            <AuthenticationContext>
                <ToggleContext>
                    <SideBar setHeaderTitle={setHeaderTitle} setProfilePicture={setProfilePicture} />
                    <Header newBreadCrumb={newBreadCrumb} title={headerTitle} profilepicture={profilePicture} />
                    <Routes setNewBreadCrumb={setNewBreadCrumb} />
                </ToggleContext>
            </AuthenticationContext>
        </>
    )
}
export default App
