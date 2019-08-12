import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  LOG_OUT
} from '../actions/type';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
    case LOG_OUT:
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, loading: true, token: null };
    default:
      return state;
  }
};
