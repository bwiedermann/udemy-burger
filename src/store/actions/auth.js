import * as actionTypes from './types';
import axios from 'axios';

const API_KEY = 'AIzaSyCgsC22lRVQf1F-8be3LFy6e5An1bHI7LA';

export const authStart = () => ({
  type: actionTypes.AUTH_START,  
});

export const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: idToken,
  userId: localId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  return { type: actionTypes.AUTH_LOGOUT };
}

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => dispatch(logout()), expirationTime); // TODO request a fresh token
}

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  const localId = localStorage.localId;
  if (!token || expirationDate <= new Date()) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(token, localId));
    dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
  }
}

export const auth = (email, password, isRegister) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  const url = 
    isRegister ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
               : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  axios.post(url, authData)
       .then(response => {
         localStorage.setItem('token', response.data.idToken);
         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
         localStorage.setItem('expirationDate', expirationDate);
         localStorage.setItem('localId', response.data.localId);
         dispatch(authSuccess(response.data.idToken, response.data.localId));
         dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
       })
       .catch(error => dispatch(authFail(error.response.data.error)));
}

