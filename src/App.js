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
    const [newBreadCrumb, setNewBreadCrumb] = useState('')
    return (
        <>
            {location.pathname !== '/login' && <SideBar toggle={toggleSideBar} setHeaderTitle={setHeaderTitle} setProfilePicture={setProfilePicture} />}
            {location.pathname !== '/login' && <Header newBreadCrumb={newBreadCrumb} title={headerTitle} setToggleSideBar={setToggleSideBar} profilepicture={profilePicture} />}
            <Routes setNewBreadCrumb={setNewBreadCrumb} toggle={toggleSideBar} />
        </>
    )
}
export default App
