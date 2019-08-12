import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Actions */
import { signIn } from '../../../actions/authAction';

const Login = ({ signIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    await signIn({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/tours" />;
  }

  return (
    <div className="login">
      <div className="login__form">
        <h2 className="heading-secundary u-margin-bottom-small">
          Ingrese a su cuenta
        </h2>

        <form className="form form--login" onSubmit={e => onSubmit(e)}>
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
              onChange={e => handleChange(e)}
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
              value={password}
              onChange={e => handleChange(e)}
            />
            <label className="form-label">Password</label>
          </div>

          <input type="submit" className="btn btn--green" value="Ingresar" />
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { signIn }
)(Login);

/*

  <div className="bg-video">
    <video className="bg-video__content" autoPlay muted loop>
      <source src="/images/bg-video2.webm" type="video/webm" />
      Tu navegador no soporta esto!
    </video>
  </div>

*/
