import { REGISTER } from './types';

const registerAction = payload => ({
  payload,
  type: REGISTER,
});

export default registerAction;
