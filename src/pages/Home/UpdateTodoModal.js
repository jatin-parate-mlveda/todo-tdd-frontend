import {
  Button,
  ButtonGroup,
  FormLayout,
  Modal,
  TextStyle,
} from '@shopify/polaris';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { CalendarMajor, TextMajor } from '@shopify/polaris-icons';
import axios from 'axios';

import FormField from '../../components/FormField';

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  dueDate: yup.string().required(),
});

function UpdateTodoModal({ open, onClose, todo, update }) {
  const [error, setError] = useState('');

  if (!todo) {
    return null;
  }

  const { title, dueDate, _id } = todo;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title,
        dueDate: new Date(dueDate).toISOString().slice(0, 16),
      }}
      validationSchema={validationSchema}
      onSubmit={({ title, dueDate }, { setSubmitting }) => {
        setSubmitting(true);
        axios
          .put(`${process.env.REACT_APP_API_ENDPOINT}/todo/${_id}`, {
            title,
            dueDate,
          })
          .then(res => {
            update(res.data.todo);
            onClose();
          })
          .catch(err => {
            setError(
              err.response
                ? err.response.data.error.message
                : 'Internal Server Error',
            );
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, dirty, isValid, submitForm, resetForm, errors }) => (
        <Modal
          loading={isSubmitting}
          open={open}
          onClose={onClose}
          title='Edit Task'
        >
          <Form>
            <Modal.Section>
              <FormLayout>
                <FormField
                  error={error}
                  icon={TextMajor}
                  name='title'
                  type='text'
                  label='Title'
                  placeholder='Task title'
                />
                <FormField
                  error={error}
                  icon={CalendarMajor}
                  name='dueDate'
                  type='datetime-local'
                  label='Due Date'
                  min={new Date().toISOString().slice(0, 16)}
                />
                {!error.includes('title') && !error.includes('dueDate') && (
                  <TextStyle variation='negative'>{error}</TextStyle>
                )}
              </FormLayout>
            </Modal.Section>
            <Modal.Section>
              <ButtonGroup>
                <Button
                  disabled={!dirty || !isValid || isSubmitting}
                  onClick={submitForm}
                  primary
                >
                  Update
                </Button>
                <Button disabled={isSubmitting || !dirty} onClick={resetForm}>
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

export default UpdateTodoModal;
