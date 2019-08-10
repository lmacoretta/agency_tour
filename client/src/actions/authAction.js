import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import { AUTH_ROUTE } from '../utils/misc';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, USER_LOADED } from './type';

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

    /** Tiro el alerta */
  } catch (err) {
    console.log(err.response.data);
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
  } catch (err) {
    console.log(err.response.data.message);
  }
};
