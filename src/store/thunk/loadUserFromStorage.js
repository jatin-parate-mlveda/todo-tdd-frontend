import loginAction from '../actions/user/login';
import loadTodosThunkAction from './loadTodos';

const loadUserFromStorageThunkAction = () => async dispatch => {
  const userInLocalStorage = localStorage.getItem('user');
  if (userInLocalStorage) {
    dispatch(loginAction(JSON.parse(userInLocalStorage)));
    await dispatch(loadTodosThunkAction());
    return true;
  }
  return false;
};

export default loadUserFromStorageThunkAction;
