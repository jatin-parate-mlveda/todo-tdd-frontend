import loginAction from '../actions/user/login';

const loadUserFromStorageThunkAction = () => async dispatch => {
  const userInLocalStorage = localStorage.getItem('user');
  if (userInLocalStorage) {
    dispatch(loginAction(JSON.parse(userInLocalStorage)));
    return true;
  }
  return false;
};

export default loadUserFromStorageThunkAction;
