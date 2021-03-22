import Cookie from 'universal-cookie';
import deleteAllTodosAction from '../actions/todo/deleteAllTodos';
import logoutAction from '../actions/user/logout';

const cookies = new Cookie();

const logoutThunkAction = () => async dispatch => {
  cookies.remove('token', { path: '/' });
  localStorage.removeItem('user');

  dispatch(deleteAllTodosAction());
  dispatch(logoutAction());
};

export default logoutThunkAction;
