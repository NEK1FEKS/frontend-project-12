import React from 'react';
import useAuth from '../hooks';

const NavBar = () => {
  const { loggedIn, logOut } = useAuth();
  const logOutBtn = loggedIn ? <button type="button" onClick={() => logOut()} className="btn btn-primary">Выйти</button> : null;
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {logOutBtn}
      </div>
    </nav>
  );
};

export default NavBar;