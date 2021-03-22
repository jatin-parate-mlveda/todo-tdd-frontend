import { Card, Toast, TextStyle } from '@shopify/polaris';
import { DeleteMinor, EditMinor } from '@shopify/polaris-icons';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function Todo({ todo, remove, openUpdateTodoModal }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [remainingDays] = useState(
    new Date(todo.dueDate).getDate() - new Date().getDate(),
  );

  const deleteTodo = () => {
    setDeleteLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/todo/${todo._id}`)
      .then(() => {
        remove();
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setError('Please login again');
          setIsToastVisible(true);
        } else {
          setError('Internal server error');
          setIsToastVisible(true);
        }
      });
  };

  return (
    <Card.Section
      subdued
      title={todo.title}
      actions={[
        {
          loading: deleteLoading,
          disabled: deleteLoading,
          icon: DeleteMinor,
          // content: !deleteLoading && 'remove',
          content: '',
          destructive: true,
          onAction: deleteTodo,
        },
        {
          icon: EditMinor,
          content: '',
          // content: 'edit',
          onAction: openUpdateTodoModal,
        },
      ]}
    >
      <TextStyle variation={remainingDays < 2 ? 'negative' : 'positive'}>
        {moment(todo.dueDate).fromNow()}
      </TextStyle>
      {isToastVisible && (
        <Toast onDismiss={() => setIsToastVisible(false)} error>
          {error}
        </Toast>
      )}
    </Card.Section>
  );
}

export default Todo;
