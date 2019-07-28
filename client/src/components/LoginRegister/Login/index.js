import React from 'react';
import PropTypes from 'prop-types';

import './login.scss';

const Login = () => {
  return (
    <div className="login">
      <div className="login__form">
        <h2 className="heading-secundary u-margin-bottom-small">
          Ingrese a su cuenta
        </h2>
        <form className="form form--login">
          <div className="form-group">
            <label className="form-text">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              autoComplete="off"
              required
              placeholder="Email"
            />
            <label className="form-label">Email</label>
          </div>

          <div className="form-group">
            <label className="form-text">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="form-input"
              minLength="6"
            />
            <label className="form-label">Password</label>
          </div>

          <a href="" className="btn btn--green">
            Ingresar
          </a>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;

/*

  <div className="bg-video">
    <video className="bg-video__content" autoPlay muted loop>
      <source src="/images/bg-video2.webm" type="video/webm" />
      Tu navegador no soporta esto!
    </video>
  </div>

*/
