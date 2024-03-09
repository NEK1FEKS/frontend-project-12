import React from 'react';
import { useAuth } from '../hooks/index.jsx';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();
  const logOutBtn = user ? <button type="button" onClick={() => logOut()} className="btn btn-primary">{t('logout')}</button> : null;
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('appName')}</a>
        {logOutBtn}
      </div>
    </nav>
  );
};
export default NavBar;
