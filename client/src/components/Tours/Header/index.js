import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <div>
      <header className="tour-header">
        <nav className="nav nav--tours">
          <Link to="/tours" className="nav__el">
            Nuestros Tours
          </Link>
        </nav>
        <div className="header__logo">Logo</div>
        <nav className="nav nav--user">
          <Link to="#" className="nav__el nav__el--logout">
            Iniciar sesion
          </Link>
          <Link to="#" className="nav__el">
            <img className="nav_user-img" src="#" alt="Img" />
            User
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
