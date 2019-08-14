import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signUp } from '../../../actions/authAction';
import { setAlert } from '../../../actions/alertAction';

/** Components */
import Alert from '../../Alert';

const Register = ({ signUp, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  });

  const { email, name, password, passwordConfirm } = formData;

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setAlert('Los password no coinciden', 'danger');
    } else {
      await signUp({ email, name, password, passwordConfirm });
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="login">
      <div className="login__form">
        <h2 className="heading-secundary u-margin-bottom-small">
          Crea tu cuenta!
        </h2>
        <form className="form form--login" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label className="form-text">Nombre</label>
            <input
              type="text"
              name="name"
              className="form-input"
              autoComplete="off"
              required
              placeholder="Nombre"
              value={name}
              onChange={e => onChange(e)}
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
              value={email}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-text">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="●●●●●●"
              className="form-input"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-text">Confirmacion del Password</label>
            <input
              type="password"
              name="passwordConfirm"
              required
              placeholder="●●●●●●"
              className="form-input"
              minLength="6"
              value={passwordConfirm}
              onChange={e => onChange(e)}
            />
          </div>

          <div>
            <Alert />
          </div>

          <input
            type="submit"
            className="btn btn--green u-margin-top-small"
            value="Registrarse"
          />
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, signUp }
)(Register);
