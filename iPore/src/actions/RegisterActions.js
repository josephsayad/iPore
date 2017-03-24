import auth from './auth';
import { 
  NEW_EMAIL_CHANGED, 
  NEW_PASSWORD_CHANGED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_REGISTER_FORM
} from './types';

export const newEmailChanged = (text) => {
  return {
    type: NEW_EMAIL_CHANGED,
    payload: text
  };
};

export const newPasswordChanged = (text) => {
  return {
    type: NEW_PASSWORD_CHANGED,
    payload: text
  };
};

export const registerUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });

    auth.createUserWithEmailAndPassword(email, password)
      .then(user => registerUserSuccess(dispatch, user))
      .catch((errorMessage) => registerUserFail(dispatch, errorMessage));
  };
}; /* Async with Redux Thunk */

export const registerUserFail = (dispatch, errorMessage) => {
  dispatch({ 
    type: REGISTER_USER_FAIL,  
    payload: errorMessage
  });
};

export const registerUserSuccess = (dispatch, user) => {
  dispatch({ 
    type: REGISTER_USER_SUCCESS, 
    payload: user 
  });
};

export const clearRegisterForm = () => {
  return {
    type: CLEAR_REGISTER_FORM
  };
};
