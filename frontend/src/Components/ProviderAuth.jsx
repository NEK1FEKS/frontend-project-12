import React, { useState, useMemo } from 'react';
import { AuthContext } from '../contexts';

const ProviderAuth = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.token));
    setUser({ username: userData.username });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (userToken) {
      return { Authorization: `Bearer ${userToken}` };
    }

    return {};
  };

  const auth = {
    logIn,
    logOut,
    getAuthHeader,
    user,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
export default ProviderAuth; 