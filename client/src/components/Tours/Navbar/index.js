import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut } from '../../../actions/authAction';

const Header = ({ logOut, isAuthenticated }) => {
  const logoutUser = async e => {
    e.preventDefault();

    await logOut();
  };

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
              <Link
                to="#"
                className="nav__el nav__el--logout"
                onClick={e => logoutUser(e)}
              >
                Logout
              </Link>
              <Link to="/me" className="nav__el">
                <img
                  className="nav nav__user--img"
                  src="/images/Users/user-17.jpg"
                  alt="Img"
                />
                <span>User</span>
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

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
