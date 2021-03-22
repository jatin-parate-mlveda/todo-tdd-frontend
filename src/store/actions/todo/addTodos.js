import { ADD_TODOS } from './types';

const addTodoAction = payload => ({
  type: ADD_TODOS,
  payload,
});

export default addTodoAction;
