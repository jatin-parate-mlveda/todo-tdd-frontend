import { DELETE_TODO } from './types';

const deleteTodoAction = payload => ({
  type: DELETE_TODO,
  payload,
});

export default deleteTodoAction;
