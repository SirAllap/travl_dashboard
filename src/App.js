import React from 'react'
import Routes from './router/Routes'
import Header from './components/Header'
import SideBar from './components/SideBar'

const App = () => {
    return (
        <>
            <Header />
            <SideBar />
            <Routes />
        </>
    )
}
export default App
