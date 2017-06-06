import { 
  NAME_CHANGED,
  // FAST5_PATH_CHANGED,
  REFERENCE_PATH_UPDATED,
  RUN_PIPELINE,
  RUN_PIPELINE_SUCCESS,
  RUN_PIPELINE_FAIL,
  CLEAR_PIPELINERUN_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  pipelineName: '',
  fast5Path: '`pwd`/FAST5',
  referencePath: '`pwd`/References/ecoli_dh10b_cs.fasta',
  newRun: null,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, pipelineName: action.payload };
    // case FAST5_PATH_CHANGED:
    //   return { ...state, fast5Path: action.payload };
    case REFERENCE_PATH_UPDATED:
      return { ...state, [action.payload.prop]: action.payload.value };
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
