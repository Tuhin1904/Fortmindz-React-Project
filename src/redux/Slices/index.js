import { combineReducers } from 'redux';
import employeeSlice from './EmployeeHeader';

const rootReducer = combineReducers({
    empHead: employeeSlice,
  });
  
  export default rootReducer;