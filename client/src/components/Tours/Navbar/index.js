import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  const isAuthenticated = false;

  return (
    <Fragment>
      <header className="tour-header">
        <img
          src="/images/logo-green-small.png"
          alt="Logo"
          className="tour-header__logo"
        />

        <nav className="nav nav--tours">
          <Link to="/tours" className="nav__el">
            Nuestros Tours
          </Link>
        </nav>

        <nav className="nav nav--user">
          {isAuthenticated ? (
            <Fragment>
              <Link to="#" className="nav__el">
                <img className="nav_user-img" src="#" alt="Img" />
                User
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/login" className="nav__el nav__el--in">
                Ingresá
              </Link>
              <Link to="/register" className="nav__el nav__el--cta">
                Registráte
              </Link>
            </Fragment>
          )}
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
