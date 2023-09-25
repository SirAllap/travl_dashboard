import React, { useState } from 'react'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'

const App = () => {
    const [toggleSideBar, setToggleSideBar] = useState('false')
    return (
        <>
            <SideBar toggle={toggleSideBar} />
            <Header title='Dashboard' setToggleSideBar={setToggleSideBar} />
            <Routes />
        </>
    )
}
export default App
