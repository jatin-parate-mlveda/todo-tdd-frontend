import { REPLACE_TODO } from './types';

const replaceTodoAction = ({ todo, updatedTodo }) => ({
  type: REPLACE_TODO,
  payload: { todo, updatedTodo },
});

export default replaceTodoAction;
