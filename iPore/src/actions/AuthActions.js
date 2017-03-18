import auth from './auth';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  START_LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
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

/* ReduxThunk for Async requests */

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: START_LOGIN_USER });

    auth.signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((errorMessage) => {
        auth.createUserWithEmailAndPassword(email, password, errorMessage)
          .then(user => loginUserSuccess(dispatch, user)) // Create new account.
          .catch(() => loginUserFail(dispatch)); // Invalid password or Server issue.
      });
  };
};

export const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({ 
    type: LOGIN_USER_SUCCESS, 
    payload: user 
  });
};
