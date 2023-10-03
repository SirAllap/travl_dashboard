import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ToggleContext from './context/ToggleContext.jsx'
import { useDispatch } from 'react-redux'
import { fetchInitialBookings } from './features/bookings/bookingThunks'
import { fetchInitialContacts } from './features/contact/contactThunks'
import { fetchInitialRooms } from './features/rooms/roomThunks'
import { fetchInitialUsers } from './features/users/userThunks'
import AuthenticationContext from './context/AutheContext'


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInitialBookings())
        dispatch(fetchInitialContacts())
        dispatch(fetchInitialRooms())
        dispatch(fetchInitialUsers())
    }, [dispatch])

    const location = useLocation()
    const [headerTitle, setHeaderTitle] = useState('Dashboard')
    const [profilePicture, setProfilePicture] = useState('Dashboard')
    const [newBreadCrumb, setNewBreadCrumb] = useState('')
    return (
        <>
            <AuthenticationContext>
                <ToggleContext>
                    {location.pathname !== '/login' && <SideBar setHeaderTitle={setHeaderTitle} setProfilePicture={setProfilePicture} />}
                    {location.pathname !== '/login' && <Header newBreadCrumb={newBreadCrumb} title={headerTitle} profilepicture={profilePicture} />}
                    <Routes setNewBreadCrumb={setNewBreadCrumb} />
                </ToggleContext>
            </AuthenticationContext>
        </>
    )
}
export default App
