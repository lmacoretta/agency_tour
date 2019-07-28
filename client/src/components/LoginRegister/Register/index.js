import React from 'react';
import PropTypes from 'prop-types';

import '../Login/login.scss';

const Register = () => {
  return (
    <div className="login">
      <div className="login__form">
        <h2 className="heading-secundary u-margin-bottom-small">
          Crea tu cuenta!
        </h2>
        <form className="form form--login">
          <div className="form-group">
            <label className="form-text">Nombre</label>
            <input
              type="text"
              name="name"
              className="form-input"
              autoComplete="off"
              required
              placeholder="Nombre"
            />
          </div>

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
          </div>

          <div className="form-group">
            <label className="form-text">Confirmacion del Password</label>
            <input
              type="password2"
              name="password2"
              required
              placeholder="Confirmacion del Password"
              className="form-input"
              minLength="6"
            />
          </div>

          <a href="" className="btn btn--green u-margin-top-small">
            Ingresar
          </a>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
