import { Actions } from 'react-native-router-flux';
import pipeline from './async/pipeline';
import { 
  NAME_CHANGED,
  FAST5_PATH_CHANGED,
  REFERENCE_PATH_CHANGED,
  RUN_PIPELINE,
  RUN_PIPELINE_FAIL,
  RUN_PIPELINE_SUCCESS,
  CLEAR_PIPELINERUN_CREATE
} from './types';

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const fast5PathChanged = (text) => {
  return {
    type: FAST5_PATH_CHANGED,
    payload: text
  };
};

export const referencePathChanged = (text) => {
  return {
    type: REFERENCE_PATH_CHANGED,
    payload: text
  };
};

export const runPipeline = ({ pipelineName, fast5Path, referencePath, user }) => {
  return (dispatch) => {
    dispatch({ type: RUN_PIPELINE });

    const { id } = user.loggedUser;

    pipeline.createAndRunPipelineInstance(pipelineName, fast5Path, referencePath, id)
      .then((run) => {
        runPipelineSuccess(dispatch, run);
        Actions.dashboard({ type: 'reset' });
      })
      .catch((errorMessage) => runPipelineFail(dispatch, errorMessage));
  };
}; /* Async with Redux Thunk */

export const runPipelineFail = (dispatch, errorMessage) => {
  dispatch({ 
    type: RUN_PIPELINE_FAIL,  
    payload: errorMessage
  });
};

export const runPipelineSuccess = (dispatch, newRun) => {
  dispatch({ 
    type: RUN_PIPELINE_SUCCESS, 
    payload: newRun
  });
};

export const clearPipelineRunCreate = () => {
  return { type: CLEAR_PIPELINERUN_CREATE };
};
