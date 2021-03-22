import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Frame,
  Page,
  TextStyle,
  TopBar,
} from '@shopify/polaris';
import {
  AddImageMajor,
  LogOutMinor,
  ProfileMajor,
} from '@shopify/polaris-icons';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';

import FormField from '../components/FormField';
import deleteAllTodosAction from '../store/actions/todo/deleteAllTodos';
import logoutAction from '../store/actions/user/logout';
import updateUserAction from '../store/actions/user/update';

const validationSchema = yup.object().shape({
  avatar: yup.string().required().url(),
  name: yup.string().required(),
});

function UpdateUser({ user, logout, deleteAllTodos, updateUser }) {
  const [error, setError] = useState('');
  const [, , removeCookie] = useCookies(['token']);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  return (
    <Frame
      topBar={
        <TopBar
          userMenu={
            <TopBar.UserMenu
              avatar={user.avatar}
              open={userMenuOpen}
              detail='user'
              initials={user.name
                .trim()
                .split(' ')
                .map(item => item[0])
                .join('')
                .toUpperCase()}
              name={user.name}
              onToggle={() => setUserMenuOpen(!userMenuOpen)}
              actions={[
                {
                  items: [
                    {
                      content: 'Log Out',
                      id: 'logout',
                      onAction: () => {
                        deleteAllTodos();
                        removeCookie('token', { path: '/' });
                        logout();
                      },
                      icon: LogOutMinor,
                    },
                  ],
                },
              ]}
            />
          }
        />
      }
    >
      <Page title='Update User' breadcrumbs={[{ content: 'Home', url: '/' }]}>
        <Card sectioned>
          <Formik
            enableReinitialize
            initialValues={{
              name: user.name,
              avatar: user.avatar,
            }}
            validationSchema={validationSchema}
            onSubmit={({ name, avatar }, { setSubmitting }) => {
              setSubmitting(true);
              axios
                .put(`${process.env.REACT_APP_API_ENDPOINT}/user`, {
                  name,
                  avatar,
                })
                .then(res => {
                  updateUser(res.data.user);
                })
                .catch(err => {
                  setError(
                    err.response
                      ? err.response.data.error.message
                      : 'Internal Server Error!',
                  );
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting, dirty, isValid, submitForm, resetForm }) => {
              return (
                <Form>
                  <FormLayout>
                    <FormField
                      name='name'
                      error={error}
                      icon={ProfileMajor}
                      type='text'
                      label='Name'
                      placeholder='Name of user'
                    />
                    <FormField
                      name='avatar'
                      error={error}
                      icon={AddImageMajor}
                      type='text'
                      label='Avatar url'
                      placeholder='Url of avatar'
                      helpText='To upload new image, login to gravatar.com, link your email and update your profile photo.'
                    />
                    {!error.includes('name') && !error.includes('avatar') && (
                      <TextStyle variation='negative'>{error}</TextStyle>
                    )}
                    <ButtonGroup>
                      <Button
                        loading={isSubmitting}
                        disabled={!dirty || !isValid || isSubmitting}
                        onClick={submitForm}
                        primary
                      >
                        Update
                      </Button>
                      <Button
                        disabled={!dirty || isSubmitting}
                        onClick={resetForm}
                        destructive
                      >
                        Reset
                      </Button>
                    </ButtonGroup>
                  </FormLayout>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Page>
    </Frame>
  );
}

export default connect(null, {
  logout: logoutAction,
  deleteAllTodos: deleteAllTodosAction,
  updateUser: updateUserAction,
})(UpdateUser);
