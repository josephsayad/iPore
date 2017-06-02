import { 
  SELECT_INSTANCE,
  LOGOUT_USER,
  DISPLAY_PORETOOLS_OUTPUT,
  DISPLAY_NANOOK_OUTPUT,
  DISPLAY_MAFTOOLS_OUTPUT
} from '../actions/types';

const INITIAL_STATE = {
  instanceId: '',
  tool: '', 
  output: {}
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SELECT_INSTANCE:
      if (state.instanceId === action.payload) { 
        return INITIAL_STATE; 
      } // Close pipelineInstance...
      return { ...state, ...INITIAL_STATE, instanceId: action.payload };
    case LOGOUT_USER: 
      return INITIAL_STATE;
    case DISPLAY_PORETOOLS_OUTPUT: 
      return { ...state, ...INITIAL_STATE, output: action.payload, tool: action.payload.name };
    case DISPLAY_NANOOK_OUTPUT: 
      return { ...state, ...INITIAL_STATE, output: action.payload, tool: action.payload.name };
    case DISPLAY_MAFTOOLS_OUTPUT: 
      return { ...state, ...INITIAL_STATE, output: action.payload, tool: action.payload.name };
    default: 
      return state; 
  }
};
