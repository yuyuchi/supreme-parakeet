import { INPUT } from './actionTypes';

function editReducer(state, action) {
  switch (action.type) {
    case INPUT.RESET:
      return {
        editID: '',
        editValue: '',
      };
    case INPUT.ADD:
      return {
        editID: action.editID,
        editValue: action.editValue,
      };
    case INPUT.CHANGE:
      return {
        editID: state.editID,
        editValue: action.editValue,
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

export { editReducer };
