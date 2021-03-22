import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import todoReducer from './reducers/todo';
import userReducer from './reducers/user';

const store = createStore(
  combineReducers({
    user: userReducer,
    todos: todoReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
