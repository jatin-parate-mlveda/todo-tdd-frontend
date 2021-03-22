import React, { useState, useEffect, createContext } from 'react';
import { TextStyle, Frame, Page } from '@shopify/polaris';
import { connect } from 'react-redux';

import AppTopBar from './AppTopBar';
import Todos from './Todos';
import addTodoAction from '../../store/actions/todo/addTodos';
import logoutThunkAction from '../../store/thunk/logout';
import loadTodosThunkAction from '../../store/thunk/loadTodos';

export const SearchContext = createContext();

function Home({ user, todos, addTodo, logout, loadTodos, path }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    loadTodos()
      .catch(err => {
        if (err.response && err.response.status === 401) {
          logout();
        } else {
          setError(
            err.response
              ? err.response.data.error.message
              : 'Internal server error',
          );
        }
      })
      .finally(() => setIsLoading(false));
  }, [logout, loadTodos]);

  return (
    <Frame
      topBar={
        <AppTopBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          logout={logout}
          user={user}
        />
      }
    >
      <Page>
        {isLoading ? (
          <TextStyle variation='strong'>Loading...</TextStyle>
        ) : (
          <>
            {error && <TextStyle variation='negative'>{error}</TextStyle>}
            <SearchContext.Provider value={searchValue}>
              <Todos todos={todos} addTodo={addTodo} />
            </SearchContext.Provider>
          </>
        )}
      </Page>
    </Frame>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  todos: state.todos,
});

export default connect(mapStateToProps, {
  addTodo: addTodoAction,
  logout: logoutThunkAction,
  loadTodos: loadTodosThunkAction,
})(Home);
