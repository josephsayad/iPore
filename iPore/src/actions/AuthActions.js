import { Actions } from 'react-native-router-flux';
import auth from './auth';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GO_TO_REGISTER_FORM
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const goToRegisterForm = () => {
  Actions.register();
  
  return {
    type: GO_TO_REGISTER_FORM
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    
    auth.signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
}; /* Async with Redux Thunk */

export const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({ 
    type: LOGIN_USER_SUCCESS, 
    payload: user 
  });

  Actions.main();
};
