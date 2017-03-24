import { 
  NEW_EMAIL_CHANGED, 
  NEW_PASSWORD_CHANGED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_REGISTER_FORM
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case NEW_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case REGISTER_USER_FAIL: 
      return { ...state, error: action.payload, password: '', loading: false };
    case CLEAR_REGISTER_FORM: 
      return INITIAL_STATE;
    default:
      return state;
  }
};
