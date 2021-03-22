import { USER_UPDATE } from './types';

const updateUserAction = payload => ({
  type: USER_UPDATE,
  payload,
});

export default updateUserAction;
