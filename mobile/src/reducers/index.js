import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import UserReducer from './UserReducer';
import PipelineReducer from './PipelineReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  loggedUser: UserReducer,
  pipelines: PipelineReducer,
  select: SelectionReducer
});
