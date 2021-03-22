import { LOGIN, LOGOUT, REGISTER, USER_UPDATE } from '../actions/user/types';

const initialState = {
  loggedIn: false,
  user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_UPDATE:
      return { ...state, user: { ...state.user, ...payload } };
    case LOGOUT:
      return initialState;
    case LOGIN:
      return { loggedIn: true, user: { ...state.user, ...payload } };
    case REGISTER:
      return { ...state, user: { ...state.user, ...payload } };
    default:
      return state;
  }
};

export default userReducer;
