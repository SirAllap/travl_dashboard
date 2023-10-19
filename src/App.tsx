import React from 'react';
import Routes from './router/Routes';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AuthenticationContextProvider from './context/AutheContext';
import ToggleContext from './context/ToggleContext';

const App: React.FC = () => {
  return (
    <>
      <AuthenticationContextProvider>
        <ToggleContext>
          <SideBar />
          <Header />
          <Routes />
        </ToggleContext>
      </AuthenticationContextProvider>
    </>
  );
};

export default App;
