import { Actions } from 'react-native-router-flux';
import pipeline from './async/pipeline';
import { 
  NAME_CHANGED,
  // FAST5_PATH_CHANGED,
  REFERENCE_PATH_UPDATED,
  RUN_PIPELINE,
  RUN_PIPELINE_FAIL,
  RUN_PIPELINE_SUCCESS,
  CLEAR_PIPELINERUN_CREATE,
  FETCH_PIPELINES_SUCCESS,
  SELECT_INSTANCE,
  DISPLAY_PORETOOLS_OUTPUT,
  DISPLAY_MAFTOOLS_OUTPUT
} from './types';

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

// export const fast5PathChanged = (text) => {
//   return {
//     type: FAST5_PATH_CHANGED,
//     payload: text
//   };
// }; // Path is pre-defined...

export const referencePathUpdated = ({ prop, value }) => {
  return {
    type: REFERENCE_PATH_UPDATED,
    payload: { prop, value }
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

export const pipelinesFetch = ({ user }) => {
  return (dispatch) => {
    const { id } = user.loggedUser;
    
    pipeline.fetchPipelineInstances(id)
      .then((runs) => {
        dispatch({ type: FETCH_PIPELINES_SUCCESS, payload: runs.data.results.runs });
      })
      .catch((errorMessage) => console.log(errorMessage));
  };
};

export const selectInstance = (instanceId) => {
  return {
    type: SELECT_INSTANCE,
    payload: instanceId
  };
};

export const displayPoretoolsOutput = (poretools) => {
  Actions.toolOne();

  return {
    type: DISPLAY_PORETOOLS_OUTPUT, 
    payload: poretools
  };
};

export const displayNanookOutput = (nanook) => {
  Actions.toolTwo();

  return {
    type: DISPLAY_MAFTOOLS_OUTPUT,
    payload: nanook
  };
};

export const displayMaftoolsOutput = (maftools) => {
  Actions.toolThree();

  return {
    type: DISPLAY_MAFTOOLS_OUTPUT,
    payload: maftools
  };
};
