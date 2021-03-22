import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  DisplayText,
  FormLayout,
  TextStyle,
} from '@shopify/polaris';
import axios from 'axios';
import { S as ProfileMajor } from '@shopify/polaris-icons/dist/icons/ProfileMajor.svg';
import { S as LockMajor } from '@shopify/polaris-icons/dist/icons/LockMajor.svg';
import { S as EmailMajor } from '@shopify/polaris-icons/dist/icons/EmailMajor.svg';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import FormField from '../components/FormField';
import registerAction from '../store/actions/user/register';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be of min length 6'),
});

function Register({ history, register }) {
  const [error, setError] = useState('');

  return (
    <div className='centeredDivOnPage'>
      <div className='login__container'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={({ password, email, name }, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post(`${process.env.REACT_APP_API_ENDPOINT}/user/register`, {
                name,
                email,
                password,
              })
              .then(res => {
                register(res.data.user);
                history.push('/login');
              })
              .catch(err => {
                if (err.response) {
                  setError(err.response.data.error.message);
                } else {
                  setError('Internal Server Error');
                }
                setSubmitting(false);
              });
          }}
        >
          {({ submitForm, resetForm, isSubmitting, isValid, dirty }) => {
            return (
              <Form>
                <Card>
                  <Card.Header
                    title={
                      <DisplayText size='large'>
                        <TextStyle variation='strong'>Register</TextStyle>
                      </DisplayText>
                    }
                  />
                  <Card.Section>
                    <FormLayout>
                      <FormField
                        name='name'
                        error={error}
                        icon={ProfileMajor}
                        label='Name'
                        placeholder='Full Name'
                        type='text'
                      />
                      <FormField
                        error={error}
                        icon={EmailMajor}
                        name='email'
                        label='Email Id'
                        placeholder='Email'
                        type='email'
                      />
                      <FormField
                        error={error}
                        icon={LockMajor}
                        name='password'
                        label='Password'
                        placeholder='Password'
                        type='password'
                        minLength={6}
                      />
                      {!error.toLowerCase().includes('password') &&
                        !error.toLowerCase().includes('name') &&
                        !error.toLowerCase().includes('email') && (
                          <TextStyle variation='negative'>{error}</TextStyle>
                        )}
                      <TextStyle variation='subdued'>
                        Already have an account?{' '}
                        <Button plain url='/login'>
                          Login
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
                      >
                        Submit
                      </Button>
                      <Button
                        destructive
                        disabled={isSubmitting}
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

export default connect(null, { register: registerAction })(Register);
