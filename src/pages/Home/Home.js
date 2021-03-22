import React, { useState, createContext } from 'react';
import { Frame, Page } from '@shopify/polaris';
import { connect } from 'react-redux';

import AppTopBar from './AppTopBar';
import Todos from './Todos';
import addTodoAction from '../../store/actions/todo/addTodos';
import logoutThunkAction from '../../store/thunk/logout';

export const SearchContext = createContext();

function Home({ user, todos, addTodo, logout }) {
  const [searchValue, setSearchValue] = useState('');

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
        <SearchContext.Provider value={searchValue}>
          <Todos todos={todos} addTodo={addTodo} />
        </SearchContext.Provider>
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
})(Home);
