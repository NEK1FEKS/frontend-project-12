import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';
import MainPage from './MainPage.jsx';
import { useAuth } from '../hooks/index.jsx';
import Navbar from './Navbar.jsx';
import ProviderAuth from './ProviderAuth.jsx';
import SignupPage from './SignupPage.jsx';

const CheckLogged = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => (
  <ProviderAuth>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <CheckLogged>
                <MainPage />
              </CheckLogged>
            )}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ProviderAuth>
);

export default App;
