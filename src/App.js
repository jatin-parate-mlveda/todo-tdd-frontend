import React, { useEffect, useState } from 'react';
import { AppProvider, SkeletonBodyText, SkeletonPage } from '@shopify/polaris';
import shopifyEnTranslations from '@shopify/polaris/locales/en.json';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import '@shopify/polaris/dist/styles.css';
import './App.scss';

import Link from './components/Link';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateUser from './pages/UpdateUser';
import loadUserFromStorageThunkAction from './store/thunk/loadUserFromStorage';

axios.defaults.withCredentials = true;

const App = ({ isLoggedIn, user, loadUser, ...props }) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadUser()
      .then(result => {
        if (result) {
          history.push('/');
        }
      })
      .finally(() => setLoading(false));
  }, [loadUser]);

  return (
    <AppProvider
      theme={{
        logo: {
          width: 40,
          url: '/',
          topBarSource: '/favicon.ico',
          contextualSaveBarSource: '/favicon.ico',
        },
      }}
      linkComponent={Link}
      i18n={shopifyEnTranslations}
    >
      {loading ? (
        <SkeletonPage>
          <SkeletonBodyText lines={4} />
        </SkeletonPage>
      ) : (
        <Switch>
          <Route exact path='/'>
            {({ match: { path } }) =>
              isLoggedIn ? <Home path={path} /> : <Redirect to='/login' />
            }
          </Route>
          <Route path='/update-user'>
            {isLoggedIn ? <UpdateUser user={user} /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='*'>
            <Redirect to={isLoggedIn ? '/' : '/login'} />
          </Route>
        </Switch>
      )}
    </AppProvider>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.loggedIn,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  loadUser: loadUserFromStorageThunkAction,
})(App);
