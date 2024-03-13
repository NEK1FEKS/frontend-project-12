import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';
import MainPage from './MainPage.jsx';
import { useAuth } from '../hooks/index.jsx';
import Navbar from './Navbar.jsx';
import ProviderAuth from './ProviderAuth.jsx';
import SignupPage from './SignupPage.jsx';
import { ToastContainer as ToastDiv } from 'react-toastify';
import routes from '../routes.js';

const CheckLogged = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />;
};

const App = () => (
  <ProviderAuth>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.chatPagePath()}
            element={(
              <CheckLogged>
                <MainPage />
              </CheckLogged>
            )}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignupPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <ToastDiv />
      </BrowserRouter>
    </div>
  </ProviderAuth>
);

export default App;
