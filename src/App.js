import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'

const App = () => {
    const location = useLocation()
    const [isAuthenticated, setIsAuthenticated] = useState('false')
    const [toggleSideBar, setToggleSideBar] = useState('false')
    const [headerTitle, setHeaderTitle] = useState('Dashboard')
    const [profilePicture, setProfilePicture] = useState('Dashboard')

    return (
        <>

            {(isAuthenticated && location.pathname !== '/login') && <SideBar toggle={toggleSideBar} setHeaderTitle={setHeaderTitle} setProfilePicture={setProfilePicture} />}
            {(isAuthenticated && location.pathname !== '/login') && <Header title={headerTitle} setToggleSideBar={setToggleSideBar} profilepicture={profilePicture} />}
            <Routes toggle={toggleSideBar} authenticated={setIsAuthenticated} />
        </>
    )
}
export default App
