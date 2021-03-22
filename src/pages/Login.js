import React, { useState, useCallback } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  DisplayText,
  FormLayout,
  TextStyle,
} from '@shopify/polaris';
import { S as LockMajor } from '@shopify/polaris-icons/dist/icons/LockMajor.svg';
import { S as EmailMajor } from '@shopify/polaris-icons/dist/icons/EmailMajor.svg';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import FormField from '../components/FormField';
import loginThunkAction from '../store/thunk/login';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be of min length 6'),
});

function Login({ userData, login, history }) {
  const [error, setError] = useState('');

  const handleFormikSubmit = useCallback(
    async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await login(values);
        history.push('/');
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error.message);
        } else {
          console.error(err);
          setError('Internal Server Error');
        }
        setSubmitting(false);
      }
    },
    [history, login],
  );

  return (
    <div className='centeredDivOnPage'>
      <div className='login__container'>
        <Formik
          initialValues={{
            email: userData ? userData.email : '',
            password: userData ? userData.password : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormikSubmit}
        >
          {({ submitForm, resetForm, isValid, dirty, isSubmitting }) => {
            return (
              <Form>
                <Card>
                  <Card.Header
                    title={
                      <DisplayText size='large'>
                        <TextStyle variation='strong'>Login</TextStyle>
                      </DisplayText>
                    }
                  />
                  <Card.Section>
                    <FormLayout>
                      <FormField
                        name='email'
                        icon={EmailMajor}
                        error={error}
                        type='email'
                        label='Email'
                        placeholder='Email Id'
                      />
                      <FormField
                        name='password'
                        type='password'
                        error={error}
                        icon={LockMajor}
                        label='Password'
                        placeholder='Password'
                        minLength={6}
                      />
                      {!error.toLowerCase().includes('password') &&
                        !error.toLowerCase().includes('email') && (
                          <TextStyle variation='negative'>{error}</TextStyle>
                        )}
                      <TextStyle variation='subdued'>
                        Not registered yet?{' '}
                        <Button plain url='/register'>
                          Register
                        </Button>
                      </TextStyle>
                    </FormLayout>
                  </Card.Section>
                  <Card.Section>
                    <ButtonGroup spacing='loose'>
                      <Button
                        disabled={(dirty && !isValid) || isSubmitting}
                        loading={isSubmitting}
                        onClick={submitForm}
                        primary
                      >
                        Submit
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        destructive
                        onClick={resetForm}
                      >
                        Reset
                      </Button>
                    </ButtonGroup>
                  </Card.Section>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userData: state.user && state.user.user,
});

export default connect(mapStateToProps, {
  login: loginThunkAction,
})(Login);
