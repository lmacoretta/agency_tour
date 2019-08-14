import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import { AUTH_ROUTE } from '../utils/misc';
import { setAlert } from './alertAction';

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOG_OUT
} from './type';

/** Comprueba si el usuario esta logeado con el token al inicio de la aplicacion. Tambien trae la data del usuario del back end. */
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${AUTH_ROUTE}/protectUser`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err); //Hacer esto bien
  }
};

/** Registro de usuario */
export const signUp = data => async dispatch => {
  try {
    /** Envio la data */
    const res = await axios.post(`${AUTH_ROUTE}/signup`, data);

    /** Despacho */
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

/** Logeo de usuario */
export const signIn = data => async dispatch => {
  try {
    /** Envio la data */
    const res = await axios.post(`${AUTH_ROUTE}/signin`, data);
    console.log(res);

    /** Despacho */
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

/** Logout user */
export const logOut = () => async dispatch => {
  try {
    dispatch({
      type: LOG_OUT
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
