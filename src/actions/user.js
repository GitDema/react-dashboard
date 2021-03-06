import axios from 'axios';

const api_url = process.env.API_URL;

export const SET_CLIENT_ID = 'SET_CLIENT_ID';
export const SET_USER_TOKKEN = 'SET_USER_TOKKEN';
export const LOG_OUT = 'LOG_OUT';
export const REFRESH_TOKKEN = 'REFRESH_TOKKEN';

/* CLIENT ID FUNCTIONS */
export function getClientId() {
  return dispatch => {
    return axios
      .get(`${api_url}/client/id`)
      .then(res => {
        if (res.status === 200) {
          const id = res.data.result.clientId;

          localStorage.setItem('clientId', id);
          dispatch(setClientId(id));

          return Promise.resolve(id);
        }
        return Promise.reject(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

function setClientId(id) {
  return {
    type: SET_CLIENT_ID,
    id,
  };
}

/* LOGIN FUNCTIONS */
export function logIn(clientId, email, password) {
  return dispatch => {
    return axios
      .post(`${api_url}/user/login`, {
        clientId: clientId,
        email: email,
        password: password,
      })
      .then(res => {
        if (res.status === 200) {
          const tokken = res.data.result.access_token.token;
          const refresh_token = res.data.result.refresh_token.token

          localStorage.setItem('access_token', tokken);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('isAuthenticated', true);
          dispatch(setUserData(tokken));

          return Promise.resolve(tokken);
        }
        return Promise.reject(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

function setUserData(tokken) {
  return {
    type: SET_USER_TOKKEN,
    tokken,
  };
}

/* REFRESH TOKEN FUNCTIONS */

export function refresh() {
  return dispatch => {

    return axios
      .post(`${api_url}/user/refresh`, {
        clientId: localStorage.getItem('clientId'),
        refresh_token: localStorage.getItem('refresh_token'),
      })
      .then(res => {
        if (res.status === 200) {
          const tokken = res.data.result.token;
          localStorage.setItem('access_token', tokken);
          dispatch(refreshToken(tokken));
          return Promise.resolve(tokken);
        }
        return Promise.reject(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

function refreshToken(tokken) {
  return {
    type: REFRESH_TOKKEN,
    tokken,
  };
}

/* LOGOUT FUNCTIONS */
export function logOut() {
  localStorage.removeItem('access_token', false);
  localStorage.removeItem('isAuthenticated', false);
  localStorage.removeItem('order', null);
  location.href = '/login';
  return {
    type: LOG_OUT,
  };
}
