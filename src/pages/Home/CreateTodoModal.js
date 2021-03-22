import React, { useState } from 'react';
import {
  Modal,
  TextStyle,
  FormLayout,
  ButtonGroup,
  Button,
} from '@shopify/polaris';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import FormField from '../../components/FormField';
import { CalendarMajor, TextMajor } from '@shopify/polaris-icons';

const initialValues = {
  title: '',
  dueDate: new Date(Date.now() + 1).toISOString().slice(0, 16),
};

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  dueDate: yup.string().required(),
});

function CreateTodoModal({ open, onClose, addTodo }) {
  const [error, setError] = useState('');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ dueDate, title }, { setSubmitting }) => {
        setSubmitting(true);
        axios
          .post(`${process.env.REACT_APP_API_ENDPOINT}/todo`, {
            title,
            dueDate,
          })
          .then(res => {
            addTodo(res.data.todo);
            onClose();
          })
          .catch(err => {
            setError(
              err.response
                ? err.response.data.error.message
                : 'Internal server error',
            );
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ submitForm, resetForm, isSubmitting, dirty, isValid }) => (
        <Modal
          open={open}
          onClose={onClose}
          loading={isSubmitting}
          title='Add Task'
        >
          <Form>
            <Modal.Section>
              <FormLayout>
                <FormField
                  icon={TextMajor}
                  name='title'
                  type='text'
                  placeholder={'Task'}
                  label='Title'
                />
                <FormField
                  icon={CalendarMajor}
                  name='dueDate'
                  type='datetime-local'
                  placeholder='Due Date'
                  label='Due Date'
                  min={new Date().toISOString().slice(0, 16)}
                />
                {error && <TextStyle variation='negative'>{error}</TextStyle>}
              </FormLayout>
            </Modal.Section>
            <Modal.Section subdued>
              <ButtonGroup>
                <Button
                  disabled={!dirty || !isValid || isSubmitting}
                  loading={isSubmitting}
                  onClick={submitForm}
                >
                  Create
                </Button>
                <Button disabled={isSubmitting} destructive onClick={resetForm}>
                  Reset
                </Button>
              </ButtonGroup>
            </Modal.Section>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}

export default CreateTodoModal;
