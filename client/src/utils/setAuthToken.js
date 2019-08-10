import axios from 'axios';

/** Comprueba si hay un token, si hay, lo agrega al header, sino, lo borra. */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
