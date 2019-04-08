import { SET_CLIENT_ID, SET_USER_TOKKEN, LOG_OUT } from '../actions/user';

export default function auth(
  state = {
    clientId: null,
    access_token:null,
    isFetching: false,
    isAuthenticated: false,
  },
  action,
) {
  switch (action.type) {
    case SET_CLIENT_ID: {
      return Object.assign({}, state, {
        clientId: action.id,
      });
    }
    case SET_USER_TOKKEN: {
      return Object.assign({}, state, {
        access_token: action.tokken,
        isFetching: true,
        isAuthenticated: true,
      });
    }
    case LOG_OUT: {
      return Object.assign({}, state, {
        access_token: null,
        isFetching: false,
        isAuthenticated: false,
      });
    }
    default:
      return state;
  }
}
