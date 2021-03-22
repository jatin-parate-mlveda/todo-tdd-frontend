import axios from 'axios';
import loginAction from '../actions/user/login';

const loginThunkAction = ({ email, password }) => async dispatch => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/login`,
    {
      email,
      password,
    },
  );

  const user = res.data.user;

  localStorage.setItem('user', JSON.stringify(user));

  dispatch(loginAction(user));
};

export default loginThunkAction;
