import { 
  NAME_CHANGED,
  FAST5_PATH_CHANGED,
  REFERENCE_PATH_CHANGED,
  RUN_PIPELINE,
  RUN_PIPELINE_SUCCESS,
  RUN_PIPELINE_FAIL,
  CLEAR_PIPELINERUN_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  pipelineName: '',
  fast5Path: '',
  referencePath: '',
  newRun: null,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, pipelineName: action.payload };
    case FAST5_PATH_CHANGED:
      return { ...state, fast5Path: action.payload };
    case REFERENCE_PATH_CHANGED:
      return { ...state, referencePath: action.payload };
    case RUN_PIPELINE:
      return INITIAL_STATE;
    case RUN_PIPELINE_SUCCESS:
      return { ...state, ...INITIAL_STATE, newRun: action.payload };
    case RUN_PIPELINE_FAIL:
      return { ...state, error: action.payload, pipelineName: '' };
    case CLEAR_PIPELINERUN_CREATE: 
      return INITIAL_STATE;
    default:
      return state;
  }
};
