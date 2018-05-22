import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import departmentReducer from './departmentReducer';
import userReducer from './userReducer';
import fileManagementReducer from './fileManagementReducer';
import messageHandlingReducer from './messageHandlingReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  departmentReducer,
  userReducer,
  fileManagementReducer,
  messageHandlingReducer
});

export default rootReducer