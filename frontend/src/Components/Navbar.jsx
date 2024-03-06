import React from 'react';
import { useAuth } from '../hooks/index.jsx';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const logOutBtn = user ? <button type="button" onClick={() => logOut()} className="btn btn-primary">Выйти</button> : null;
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Chat</a>
        {logOutBtn}
      </div>
    </nav>
  );
};
export default NavBar;