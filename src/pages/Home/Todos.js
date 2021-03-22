import React, { useState } from 'react';
import { Card, DisplayText, TextStyle } from '@shopify/polaris';
import { connect } from 'react-redux';

import CreateTodoModal from './CreateTodoModal';
import Todo from './Todo';
import deleteTodoAction from '../../store/actions/todo/deleteTodo';
import replaceTodoAction from '../../store/actions/todo/replaceTodo';
import UpdateTodoModal from './UpdateTodoModal';
import { SearchContext } from './Home';

function Todos({ todos = [], addTodo, removeTodo, replaceTodo }) {
  const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  const [isUpdateTodoModalOpen, setIsUpdateTodoModalOpen] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState(null);

  return [
    <Card key='card'>
      <Card.Header
        title={
          <DisplayText size='medium'>
            <TextStyle variation='strong'>Your Tasks</TextStyle>
          </DisplayText>
        }
        actions={[
          { content: 'create', onAction: () => setIsCreateTodoModalOpen(true) },
        ]}
      />
      <SearchContext.Consumer>
        {searchValue =>
          (searchValue
            ? todos.filter(todo => todo.title.includes(searchValue))
            : todos
          ).map(todo => (
            <Todo
              key={todo._id}
              todo={todo}
              replace={updatedTodo => replaceTodo({ todo, updatedTodo })}
              remove={() => removeTodo(todo)}
              openUpdateTodoModal={() => {
                setTodoToUpdate(todo);
                setIsUpdateTodoModalOpen(true);
              }}
            />
          ))
        }
      </SearchContext.Consumer>
    </Card>,
    <UpdateTodoModal
      key='updateModal'
      open={isUpdateTodoModalOpen}
      todo={todoToUpdate}
      update={updatedTodo => replaceTodo({ todo: todoToUpdate, updatedTodo })}
      onClose={() => setIsUpdateTodoModalOpen(false)}
    />,
    <CreateTodoModal
      open={isCreateTodoModalOpen}
      onClose={() => setIsCreateTodoModalOpen(false)}
      addTodo={todo => addTodo([todo])}
      key='createModal'
    />,
  ];
}

export default connect(null, {
  removeTodo: deleteTodoAction,
  replaceTodo: replaceTodoAction,
})(Todos);
