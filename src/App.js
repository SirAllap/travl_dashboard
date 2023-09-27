import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'

const App = () => {
    const location = useLocation()
    const [toggleSideBar, setToggleSideBar] = useState('false')
    const [headerTitle, setHeaderTitle] = useState('Dashboard')
    const [profilePicture, setProfilePicture] = useState('Dashboard')

    return (
        <>
            {location.pathname !== '/login' && <SideBar toggle={toggleSideBar} setHeaderTitle={setHeaderTitle} setProfilePicture={setProfilePicture} />}
            {location.pathname !== '/login' && <Header title={headerTitle} setToggleSideBar={setToggleSideBar} profilepicture={profilePicture} />}
            <Routes toggle={toggleSideBar} />
        </>
    )
}
export default App
