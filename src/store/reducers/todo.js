import {
  ADD_TODOS,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  REPLACE_TODO,
} from '../actions/todo/types';

const initialState = [];

const todoReducer = (state = initialState, { type, payload }) => {
  let index;
  switch (type) {
    case ADD_TODOS:
      return [...state, ...payload];
    case DELETE_TODO:
      index = state.indexOf(payload);
      index > -1 && state.splice(index, 1);
      return [...state];
    case REPLACE_TODO:
      index = state.indexOf(payload.todo);
      if (index > -1) {
        state[index] = payload.updatedTodo;
      }
      return [...state];
    case DELETE_ALL_TODOS:
      return [];
    default:
      return state;
  }
};

export default todoReducer;
