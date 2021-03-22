import axios from 'axios';
import addTodoAction from '../actions/todo/addTodos';
import deleteAllTodosAction from '../actions/todo/deleteAllTodos';

const loadTodosThunkAction = () => async dispatch => {
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/todo`);
  dispatch(deleteAllTodosAction());
  dispatch(addTodoAction(res.data.todos));
};

export default loadTodosThunkAction;
