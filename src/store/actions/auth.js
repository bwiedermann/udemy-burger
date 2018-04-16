import * as actionTypes from './types';
import axios from 'axios';

const API_KEY = 'AIzaSyCgsC22lRVQf1F-8be3LFy6e5An1bHI7LA';

export const authStart = () => ({
  type: actionTypes.AUTH_START,  
});

export const authSuccess = (data) => ({
  type: actionTypes.AUTH_SUCCESS,
  data: data,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

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
       .then(response => dispatch(authSuccess(response.data)))
       .catch(error => dispatch(authFail(error)));
}

