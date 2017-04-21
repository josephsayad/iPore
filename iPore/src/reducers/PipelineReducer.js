import {
  FETCH_PIPELINES_SUCCESS,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  pipelineArray: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PIPELINES_SUCCESS: 
      return { ...state, pipelineArray: action.payload };
    case LOGOUT_USER: 
      return INITIAL_STATE;
    default: 
      return state; 
  }
};
